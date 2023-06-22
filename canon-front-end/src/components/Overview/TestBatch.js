import React, { useState, useEffect } from 'react';
import './TestBatchCSS.css';
import mockData from '../../mockdata/mock-data2.json';
import BranchAPI from "../../apis/BranchApi";
import TestBatchAPI from "../../apis/testBatchApi"
import TestSetAPI from "../../apis/TestSetApi"
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function TestBatchPage({ selectedBranchId }) {
  const [testBatches, setTestBatches] = useState([]);
  const [testSets, setTestSets] = useState([]);
  const [testData, setTestData] = useState([]);
  const [updatedTestSets, setUpdatedTestSets] = useState([]);
  const [updatedTestBatches, setUpdatedTestBatches] = useState([]);
  const [isFrozen, setIsFrozen] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let timer = null;
    console.log(selectedBranchId);
    const fetchData = async () => {
      try {
        if (selectedBranchId !== 0 && !isFrozen) { // Fetch data only if not frozen
          const response = await BranchAPI.getAllTestBatchesFromABranch(selectedBranchId);
          console.log("load test batch");
          setTestBatches(response.data.testBatchList);
          console.log(selectedBranchId);

        } else {
          setTestBatches([]); // Reset test batches when no branch is selected or frozen
        }
      } catch (error) {
        console.log("Failed to fetch test batches:", error);
      }
    };
    if (!isFrozen) {
      timer = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    }
  
    return () => {
      clearInterval(timer); // Clear the interval on component unmount
    };
  }, [selectedBranchId, isFrozen]);
  const handleFreezeClick = () => {
    setIsFrozen((prevIsFrozen) => !prevIsFrozen); 
    console.log(isFrozen);
  };
  useEffect(() => {

  },[])
  useEffect(() => {
    const fetchTestSets = async () => {
      const testSetsPromises = testBatches.map((testBatch) =>
        TestBatchAPI.getAllTestSetsFromABatch(testBatch.id)
      );

      try {
        const testSetsResponses = await Promise.all(testSetsPromises);
        const testSetsData = testSetsResponses.map((response) => response.data.testSetList);
        setTestSets(testSetsData.flat());
      } catch (error) {
        console.error('Error fetching test sets:', error);
      }
    };

    fetchTestSets();
  }, [testBatches]);

  useEffect(() => {
    const fetchTests = async () => {
      const testSetIds = testSets.map((testSet) => testSet.id);
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
  }, [testSets]);

  const updateTestSetsWithTestsAndFailedCount = async () => {
    const updatedTestSets = testSets.map((testSet) => ({
      ...testSet,
      regressionTests: [],
      expanded: false, // Add 'expanded' property to track the expansion state
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

  const updateTestBatchesWithTestSets = () => {
    const updatedTestBatches = testBatches.map((testBatch) => ({
      ...testBatch,
      testSets: [],
    }));
  
    updatedTestSets.forEach((testSet) => {
      const testBatchIndex = updatedTestBatches.findIndex(
        (testBatch) => testBatch.id === testSet.testBatchId
      );
      if (testBatchIndex !== -1) {
        updatedTestBatches[testBatchIndex].testSets.push(testSet);
      }
    });
    setIsLoading(false);
    updatedTestBatches.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
  
    setUpdatedTestBatches(updatedTestBatches);
  };

  useEffect(() => {
    if (updatedTestSets.length > 0) {
      updateTestBatchesWithTestSets();
    }
  }, [updatedTestSets, testBatches]);

  const fetchFailedTestStepCount = async (testId) => {
    try {
      const response = await TestSetAPI.getFailedCounter(testId); // Use TestSetAPI.getFailedCounter method
      return response.data.failedCounter;
    } catch (error) {
      console.error('Error fetching failed test step count:', error);
      return 1;
    }
  };

  if (isLoading) {
    return <div class="loader"></div>
  }

  const handleTestSetClick = (testSetId) => {
    const updatedTestSetsCopy = [...updatedTestSets];
    const testSetIndex = updatedTestSetsCopy.findIndex((testSet) => testSet.id === testSetId);

    if (testSetIndex !== -1) {
      updatedTestSetsCopy[testSetIndex].expanded = !updatedTestSetsCopy[testSetIndex].expanded;
      setUpdatedTestSets(updatedTestSetsCopy);
    }
  };

  return (
    <div className="test-batch">
    <div class="freeze-container">
    <label class="freeze-label" for="freeze-checkbox">Freeze:</label>

  <label class="switch">
    <input type="checkbox" id="freeze-checkbox" checked={isFrozen} onChange={handleFreezeClick} />
    <span class="slider"></span>
  </label>
</div>
      <table className="styled-table">
        {updatedTestBatches.length > 0 && (
          <thead>
            <tr>
              <th>Build Time</th>
              <th>Version</th>
              <th>Commit SHA</th>
              <th>Date Time</th>
              {updatedTestBatches[0].testSets.map((testSet) => (
                <th key={testSet.id}>
                  <div
                    onClick={() => handleTestSetClick(testSet.id)}
                    className="test-set-header"
                  >
                    {testSet.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {updatedTestBatches.map((testBatch) => (
            <tr key={testBatch.id}>
              <td>{testBatch.buildTime}</td>
              <td>{testBatch.version}</td>
              <td>{testBatch.commitShal}</td>
              <td>{testBatch.dateTime}</td>
              {testBatch.testSets.map((testSet) => (
                <td key={testSet.id} onClick={() => handleTestSetClick(testSet.id)}className={testSet.regressionTests.some((test) => test.failedCount > 0) ? "red-cell" : "green-cell"}>
                  <div className="test-container" >
                    {testSet.expanded ? (
                      <>
                        {testSet.regressionTests.length > 0 ? (
                          testSet.regressionTests.map((test) => (
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
                                    ? 'test-rectangle-fail'
                                    : 'test-rectangle'
                                }
                              >
                                {test.failedCount > 0 && (
                                  <div className="failed-step-count">
                                    {test.failedCount}<br></br>
                                     {test.testName}
                                  </div>
                                )}
                                {test.failedCount === 0 && (
                                  <div className="checkmarkov">&#x2713;<br></br> {test.testName}</div>
                                )}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="no-data">No data</div>
                        )}
                      </>
                    ) : (
                      <div className="summary">
                        {testSet.regressionTests.length > 0 ? (
                          <>
                            {testSet.regressionTests.some(
                              (test) => test.failedCount > 0
                            ) ? (
                              <div className="failed-count-ov">
                                {testSet.regressionTests.filter(
                                  (test) => test.failedCount > 0
                                ).length}{' '}
                                Failed Tests
                              </div>
                            ) : (
                              <div className="all-passed-ov">All Passed</div>
                            )}
                          </>
                        ) : (
                          <div className="no-data-ov">No data</div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TestBatchPage;