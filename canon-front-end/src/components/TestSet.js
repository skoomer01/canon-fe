import React, { useState, useEffect } from 'react';
import './TestSet.css';
import testSetApi from "../apis/testSetApi";
import testSetData from '../mockdata/mock-data.json';

import { Card, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';

function TestSetPage() {
  const [testSets, setTestSets] = useState([]);

  const getLatestSets = () => {
    testSetApi.getLatestTestSets()
        .then((response) => setTestSets(response.data.latestTestSets))
        .catch((error) => console.log(error))
};

  useEffect(() => {
    getLatestSets();
  }, []);

  const getTestSetStatus = (testSet) => {
    const statuses = testSet.tests.map(test => test.status);
    if (statuses.includes("Failed")) {
      return "Failed";
    } else if (statuses.includes("Passed")) {
      return "Passed";
    } else {
      return "Not Run";
    }
  };

  const getCardColor = (status) => {
    if (status === "Passed") {
      return "bg-success";
    } else if (status === "Failed") {
      return "bg-danger";
    } else {
      return "";
    }
  };

  return (
    <div className="testset-page">
      {testSets.map(testSet => (
        <div className="testset-column" key={testSet.id}>
          <h2>
            Test set {testSet.name}&nbsp;
            {/* <span className={getTestSetStatus(testSet) === "Passed" ? "text-success" : "text-danger"}>
              ({testSet.tests.length} tests)
            </span> */}
          </h2>
          {/* {testSet.tests.map(test => (
            <Link key={test.id} to="/testdetailspage" style={{ textDecoration: "none" }}>
              <Card className={`mb-3 ${getCardColor(test.status)}`}>
                <CardBody>
                  <CardTitle>{test.name}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          ))} */}
        </div>
      ))}
    </div>
  );
}

export default TestSetPage;
