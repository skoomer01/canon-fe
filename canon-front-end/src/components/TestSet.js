import React, { useState, useEffect } from 'react';
import './TestSet.css';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import RegrTestApi from '../apis/regrTestApi';
import andrei from '../apis/andrei';

function TestSet(props) {
  const [tests, setTests] = useState([]);
  const [testsPerTestSet, setTestsPerTestSet] = useState([[]]);

  useEffect(() => {
    fetchTestsByTestSetId();
  }, [props.testSets]);

  const fetchTestsByTestSetId = async () => {
    const updatedTestDatas = {};

    for (const testSet of props.testSets) {
      try {
        const response1 = await andrei.testStuff(testSet.id);
        const latestTestsData = response1.data.latestTests;
        updatedTestDatas[testSet.id] = latestTestsData;

        const response2 = await andrei.getAllTestsByTestSetId(testSet.id);
        const testsPerTestSet = response2.data.latestTests;
        setTestsPerTestSet(testsPerTestSet);
        tests[testSet.id] = testsPerTestSet;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      setTests(updatedTestDatas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="testset-page">
      {props.testSets &&
        props.testSets.map((testSet) => (
          <div className="testset-column" key={testSet.id}>
            <h2>{testSet.name}&nbsp;</h2>
            {testSet &&
              tests &&
              tests[testSet.id] &&
              tests[testSet.id].map((test) => (
                <Card
                  key={test.id}
                  className={test.testResult.toString() === 'true' ? 'bg-success' : 'bg-danger'}
                >
                  <CardBody>
                    <CardTitle>
                      {test.testResult.toString() === 'true' ? 'Passed' : 'Failed'}
                    </CardTitle>
                  </CardBody>
                </Card>
              ))}
          </div>
        ))}
    </Container>
  );
}

export default TestSet;
