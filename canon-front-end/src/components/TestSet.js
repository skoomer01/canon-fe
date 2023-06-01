import React, { useState, useEffect } from 'react';
import './TestSet.css';
import { Card, CardBody, CardTitle} from 'reactstrap';
import RegrTestApi from '../apis/regrTestApi';
import andrei from '../apis/andrei';
function TestSet(props) {
const [tests, setTests] = useState([]);
const [testsPerTestSet, setTestsPerTestSet] = useState([[]]);

const fetchTestsByTestSetId = () => {
  const updatedTestDatas = {};
  console.log(props.testSets);
  // props.testSets.forEach((testSet) => {
  //   console.log(testSet.id);
  //   andrei.testStuff(testSet.id)
  //         .then((response) => {
  //             console.log("response");
  //             console.log(response);
  //             const latestTestsData = response.data.latestTests;
  //             console.log("LATEST TESTS DATA");
  //             console.log(latestTestsData);
  //             updatedTestDatas[testSet.id] = latestTestsData;
  //             setTests(updatedTestDatas);
  //         })
  //         .catch((error) => console.log(error));
  // });
  props.testSets.forEach(testSet => {
    andrei.getAllTestsByTestSetId(testSet.id)
      .then((response) =>{
        console.log("response");
        console.log(response);
        setTestsPerTestSet(response.data.latestTests);
        tests[testSet.id]=testsPerTestSet;
      })
      .catch((error) => console.log(error));
  });
};

  useEffect(() => {
    console.log("USE EFFECT");
    fetchTestsByTestSetId();
  }, [props.testSets]);

  return (
    <div className="testset-page">
      {props.testSets && props.testSets.map(testSet => (
        <div className="testset-column" key={testSet.id}>
          <h2>{testSet.name}&nbsp;</h2>
          {/* {testSet && tests && tests[testSet.id].map((test) =>(
              <Card>
                <CardBody>
                  <CardTitle>{test.testResult}</CardTitle>
                </CardBody>
              </Card>
          ))} */}
        </div>
      ))}
    </div>
  );
}

export default TestSet;