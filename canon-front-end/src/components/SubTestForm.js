import React, { useEffect, useState } from "react";
import subTestApi from "../apis/subTestApi";
import testStepApi from "../apis/testStepApi";
import { Link } from "react-router-dom";

function SubTestForm({ subTestDetails }) {
  const [testSteps, setTestSteps] = useState([]);
  const [subTest, setSubTest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    subTestApi
      .getSubTest(1)
      .then(response => {
        console.log(response.data);
        setSubTest(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });

    testStepApi
      .getTestStepBySubTestID(subTestDetails)
      .then(testStepResponse => {
        console.log(testStepResponse.data.testSteps);
        setTestSteps(testStepResponse.data.testSteps);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, []);

  const getTestResultStyle = testResult => {
    if (testResult) {
      return { backgroundColor: "green" };
    }
    return { backgroundColor: "red" };
  };

  return (
    <div>
      {subTest == null ? (
        <div>Nothing</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Test Result</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {testSteps.map(teststep => (
              <tr key={teststep.id}>
                <td>
                  <Link
                    key={teststep.id}
                    to={`/TestStep/${teststep.id}`}
                    testStepDetails={teststep.id}
                    style={{ textDecoration: "none" }}
                  >
                    {teststep.testStepName}
                  </Link>
                </td>
                <td style={getTestResultStyle(teststep.testResult)}>
                  {teststep.testResult ? "Passed" : "Failed"}
                </td>
                <td>{teststep.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubTestForm;
