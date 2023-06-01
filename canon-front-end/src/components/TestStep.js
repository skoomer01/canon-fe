import React, { useState, useEffect } from 'react';
import TestStepApi from '../apis/testStepApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestStep = ({ id }) => {
  const [testStep, setTestStep] = useState(null);
  const { id: testStepId } = useParams();

  useEffect(() => {
    const fetchTestStepById = async () => {
      try {
        const response = await TestStepApi.getTestStepById(testStepId);
        setTestStep(response.data);
      } catch (error) {
        console.error('Error fetching test step:', error);
      }
    };

    fetchTestStepById();
  }, [testStepId, testStep]);

  const getTestResultStyle = () => {
    if (testStep && !testStep.testResult) {
      return { backgroundColor: 'red' };
    } else if (testStep && testStep.testResult) {
      return { backgroundColor: 'green' };
    }
    return {};
  };

  return (
    <div>
      {testStep ? (
        <table>
          <thead>
            <tr>
              <th>Test Step Name</th>
              {/* <th>Sub Test ID</th> */}
              <th>Test Result</th>
              <th>Description</th>
              <th>Error ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{testStep.testStepName}</td>
              {/* <td>{testStep.subTestId}</td> */}
              <td style={getTestResultStyle()}>
                {testStep.testResult ? 'Passed' : 'Failed'}
              </td>
              <td>{testStep.description}</td>
              <td>{testStep.errorid}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default TestStep;
