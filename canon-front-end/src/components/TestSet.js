import React, { useState, useEffect } from 'react';
import './TestSet.css';
// import mockData from '../mockdata/mock-data2.json';
// import BranchAPI from "../apis/BranchApi";
// import TestBatchAPI from "../apis/testBatchApi"
import TestSetAPI from "../apis/TestSetApi"
// import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function TestSet(props) {
  // const [testBatches, setTestBatches] = useState([]);
  // const [testSets, setTestSets] = useState([]);
  const [testData, setTestData] = useState([]);
  const [updatedTestSets, setUpdatedTestSets] = useState([]);
  // const [updatedTestBatches, setUpdatedTestBatches] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (selectedBranchId !== 0) {
  //         const response = await BranchAPI.getAllTestBatchesFromABranch(selectedBranchId);
  //         setTestBatches(response.data.testBatchList);
  //       } else {
  //         setTestBatches([]); // Reset test batches when no branch is selected
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch test batches:", error);
  //     }
  //   };
  //   fetchData();
  // }, [selectedBranchId]);

  // useEffect(() => {
  //   const fetchTestSets = async () => {
  //     const testSetsPromises = testBatches.map((testBatch) =>
  //       TestBatchAPI.getAllTestSetsFromABatch(testBatch.id)
  //     );

  //     try {
  //       const testSetsResponses = await Promise.all(testSetsPromises);
  //       const testSetsData = testSetsResponses.map((response) => response.data.testSetList);
  //       setTestSets(testSetsData.flat());
  //     } catch (error) {
  //       console.error('Error fetching test sets:', error);
  //     }
  //   };

  //   fetchTestSets();
  // }, [testBatches]);

  useEffect(() => {
    const fetchTests = async () => {
      const testSetIds = props.testSets.map((testSet) => testSet.id);
      const testsPromises = testSetIds.map(async (testSetId) => {
        const response = await TestSetAPI.getAllTestsByTestSetId(testSetId);
        return response.data.regressionTests;
      });

      try {
        const testsResponses = await Promise.all(testsPromises);
        const testsData = testsResponses.flat();
        setTestData(testsData);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [props.testSets]);

  const updateTestSetsWithTestsAndFailedCount = async () => {
    const updatedTestSets = props.testSets.map((testSet) => ({
      ...testSet,
      regressionTests: [],
    }));

    for (let i = 0; i < testData.length; i++) {
      const test = testData[i];
      const testSetIndex = updatedTestSets.findIndex((testSet) => testSet.id === test.testSetId);
      if (testSetIndex !== -1) {
        const failedCount = await fetchFailedTestStepCount(test.id);
        updatedTestSets[testSetIndex].regressionTests.push({
          ...test,
          failedCount: failedCount,
        });
      }
    }

    setUpdatedTestSets(updatedTestSets);
  };

  useEffect(() => {
    if (testData.length > 0) {
      updateTestSetsWithTestsAndFailedCount();
    }
  }, [testData]);

  // useEffect(() => {
  //   console.log("kkk" + JSON.stringify(updatedTestSets));
  // }, [updatedTestSets])

  // const updateTestBatchesWithTestSets = () => {
  //   const updatedTestBatches = testBatches.map((testBatch) => ({
  //     ...testBatch,
  //     testSets: [],
  //   }));

  //   updatedTestSets.forEach((testSet) => {
  //     const testBatchIndex = updatedTestBatches.findIndex(
  //       (testBatch) => testBatch.id === testSet.testBatchId
  //     );
  //     if (testBatchIndex !== -1) {
  //       updatedTestBatches[testBatchIndex].testSets.push(testSet);
  //     }
  //   });

  //   setUpdatedTestBatches(updatedTestBatches);
  // };

  // useEffect(() => {
  //   if (updatedTestSets.length > 0) {
  //     updateTestBatchesWithTestSets();
  //   }
  // }, [updatedTestSets, testBatches]);

  // useEffect(() => {
  //   console.log(JSON.stringify(updatedTestBatches));
  // }, [updatedTestBatches]);

  const fetchFailedTestStepCount = async (testId) => {
    try {
      const response = await TestSetAPI.getFailedCounter(testId); // Use TestSetAPI.getFailedCounter method
      return response.data.failedCounter;
    } catch (error) {
      console.error('Error fetching failed test step count:', error);
      return 1;
    }
  };

  // if (testBatches.length === 0) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="test-batch">
      <table>
        <thead>
          <tr>
            {updatedTestSets.map((ts) => (
              <th key={ts.id}>Test set name: {ts.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            <tr key={updatedTestSets.id}>
              {updatedTestSets.map((testSet) => (
                <td key={testSet.id}>
                  <div className="test-cont">
                    {testSet.regressionTests.map((test) => (
                      <Link
                        key={test.id}
                        to={`/testdetailspage/${test.id}`}
                        testDetails={test.id}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          key={test.id}
                          className={
                            test.failedCount > 0
                              ? 'test-fail'
                              : 'test-pass'
                          }
                        >
                          {test.failedCount > 0 && (
                            <div className="failed-step-count">
                              {test.failedCount}
                            </div>
                          )}
                          {test.failedCount === 0 && (
                            <div className="checkmark">&#x2713;</div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default TestSet;