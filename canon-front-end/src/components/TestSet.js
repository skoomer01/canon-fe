import React, { useState, useEffect } from 'react';
import './TestSet.css';
import TestSetAPI from "../apis/TestSetApi"
import { Link } from 'react-router-dom';

function TestSet(props) {
  const [testData, setTestData] = useState([]);
  const [updatedTestSets, setUpdatedTestSets] = useState([]);

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

  const fetchFailedTestStepCount = async (testId) => {
    try {
      const response = await TestSetAPI.getFailedCounter(testId);
      return response.data.failedCounter;
    } catch (error) {
      console.error('Error fetching failed test step count:', error);
      return 1;
    }
  };

  return (
    <div className="batch">
      <table className='table-design'>
        <thead className='tableHeader'>
          <tr>
            {updatedTestSets.map((ts) => (
              <th key={ts.id}>{ts.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            <tr key={updatedTestSets.id}>
              {updatedTestSets.map((testSet) => (
                <td className='tableData' key={testSet.id}>
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
                            <div>
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