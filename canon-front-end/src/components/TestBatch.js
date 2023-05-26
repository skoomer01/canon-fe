import React, { useState, useEffect } from 'react';
import './TestBatch.css';
import mockData from '../mockdata/mock-data2.json';
import BranchAPI from "../apis/BranchApi";
import TestBatchAPI from "../apis/testBatchApi"
import TestSetAPI from "../apis/TestSetApi"
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function TestBatchPage({selectedBranchId}){
    const[testBatches, setTestBatchs] = useState([]);
    const[testSets, setTestSets] = useState([]);
    const [testData, setTestData] = useState([]);
    useEffect(() => {
      if (selectedBranchId != 0) {
        BranchAPI.getAllTestBatchesFromABranch(selectedBranchId)
          .then((response) => {
            setTestBatchs(response.data.testBatchList);
            
          })
          .catch(function (error) {
            console.log("failed");
          });
      } else {
        setTestBatchs([]); // Reset test batches when no branch is selected
      }
    }, [selectedBranchId]);

    useEffect(() => {
      console.log(testBatches);
    }, [testBatches]);


    // useEffect(() => {
    //   const fetchTestSets = async () => {
    //     const testSetsPromises = testBatches.map((testBatch) =>
    //       TestBatchAPI.getAllTestSetsFromABatch(testBatch.id)
    //     );
    
    //     try {
    //       const testSetsResponses = await Promise.all(testSetsPromises);
    //       const testSetsData = testSetsResponses.map((response) => response.data.testSetList);
    //       setTestSets(testSetsData);
    //     } catch (error) {
    //       console.error('Error fetching test sets:', error);
    //     }
    //   };
    
    //   fetchTestSets();
    // }, [testBatches]);


    useEffect(() => {
      const fetchTestSets = async () => {
        const testSetsPromises = testBatches.map((testBatch) =>
          TestBatchAPI.getAllTestSetsFromABatch(testBatch.id)
        );
      
        try {
          const testSetsResponses = await Promise.all(testSetsPromises);
          const testSetsData = testSetsResponses.map((response) => response.data.testSetList);
          console.log('Test Sets Data:', testSetsData);
          setTestSets(testSetsData);
      
          const testsPromises = testSetsData.flat().map(async (testSet) => {
            const response = await TestSetAPI.getAllTestsByTestSetId(testSet.id);
            return response.data.regressionTests;
          });
      
          const testsResponses = await Promise.all(testsPromises);
          const testsData = testsResponses.flat();
          console.log('Tests Data:', testsData);
          setTestData(testsData);
        } catch (error) {
          console.error('Error fetching test sets and tests:', error);
        }
      
      };
  
      fetchTestSets();
    }, [testBatches]);

    if (testBatches.length === 0) {
      return <div>Loading...</div>;
    }




  

    return (
      <div className="test-batch">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Build Time</th>
              <th>Version</th>
              <th>Commit SHA</th>
              <th>Date Time</th>
              {testSets.map((_, index) => (
                <th key={index}>Test Set {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testBatches.map((testBatch) => {
              const testBatchIndex = testBatches.indexOf(testBatch);
              console.log("Test Set Data:", testSets);
              console.log("Tests Data:", testData);
    
              return (
                <tr key={testBatch.id}>
                  <td>{testBatch.id}</td>
                  <td>{testBatch.buildTime}</td>
                  <td>{testBatch.version}</td>
                  <td>{testBatch.commitSHA}</td>
                  <td>{testBatch.dateTime}</td>
                  {testSets.map((testSet, setIndex) => (
                    <td key={setIndex}>
                      {testSet[testBatchIndex].length > 0 ? (
                        <div className="test-container">
                          {testSet[testBatchIndex].map((test) => (
                            <div
                              key={test.id}
                              className={`test-rectangle${test.testResult ? "" : "-fail"}`}
                            >
                              {test.id}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No tests"
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}
export default TestBatchPage;