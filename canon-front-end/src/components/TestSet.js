import React, { useState, useEffect } from 'react';
import './TestSet.css';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import TestSetApi from '../apis/TestSetApi';
import { Link } from 'react-router-dom';

function TestSet(props) {
  const [tests, setTests] = useState([]);
  const [testsPerTestSet, setTestsPerTestSet] = useState([[]]);
  const [failedTestCounts, setFailedTestCounts] = useState({});
  const [updatedTestSets, setUpdatedTestSets] = useState([]);

  useEffect(() => {
    fetchTestsByTestSetId();
  }, [props.testSets]);

  useEffect(() => {
    if (tests.length > 0) {
      updateTestSetsWithTestsAndFailedCount();
    }
  }, [tests]);

  useEffect(() => {
    console.log("kkk" + JSON.stringify(updatedTestSets));
  },[updatedTestSets])

  const updateTestSetsWithTestsAndFailedCount = async () => {
    const updatedTestSets = props.testSets.map((testSet) => ({
      ...testSet,
      regressionTests: [],
    }));

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
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

  const fetchTestsByTestSetId = async () => {
    const updatedTestDatas = {};
    const updatedFailedTestCounts = {};

    for (const testSet of props.testSets) {
      try {
        const response1 = await TestSetApi.getLatestTestsByTestSet(testSet.id);
        const latestTestsData = response1.data.latestTests;
        updatedTestDatas[testSet.id] = latestTestsData;

        const response2 = await TestSetApi.getAllTestsByTestSetId(testSet.id);
        const testsPerTestSet = response2.data.latestTests;
        setTestsPerTestSet(testsPerTestSet);
        tests[testSet.id] = testsPerTestSet;

        const failedCount = await fetchFailedTestStepCount(testSet.id);
        updatedFailedTestCounts[testSet.id] = failedCount;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      setTests(updatedTestDatas);
      setFailedTestCounts(updatedFailedTestCounts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFailedTestStepCount = async (testId) => {
    try {
      const response = await TestSetApi.getFailedCounter(testId); // Use TestSetAPI.getFailedCounter method
      return response.data.failedCounter;
    } catch (error) {
      console.error('Error fetching failed test step count:', error);
      return 1;
    }
  };

  return (
    <Container className="testset-page">
      {props.testSets &&
        props.testSets.map((testSet) => (
          <div className="testset-column" key={testSet.id}>
            <h2>{testSet.name}&nbsp;</h2>
            {testSet && tests && tests[testSet.id] && (
              <h5>Total Failed Tests: {failedTestCounts[testSet.id]}</h5>
            )}
            {testSet &&
              tests &&
              tests[testSet.id] &&
              tests[testSet.id].map((test) => (
                <Card key={test.id}>
                  <CardBody>
                    <Link key={test.id} to={`/testdetailspage/${test.id}`} testDetails={test.id} className='pageLink'>
                      <div key={test.id} className={test.failedCount > 0 ? 'bg-danger' : 'bg-success'}>
                        {test.failedCount > 0 && (
                          <div className="failed-step-count">
                            {test.failedCount}
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardTitle>{test.testName.toString()}</CardTitle>
                  </CardBody>
                </Card>
              ))}
          </div>
        ))}
    </Container>
  );
}
export default TestSet;
