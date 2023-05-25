import React, { useState, useEffect } from 'react';
import TestStepApi from '../apis/TestStepApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestStep = ({ id }) => {
  const [testStep, setTestStep] = useState(null);
  const { id : testStepId } = useParams();

  useEffect(() => {
    const fetchTestStepById = async () => {
      try {
        const response =  await axios.get(`http://localhost:8080/TestSteps/${testStepId}`)
        // const response = await TestStepApi.getTestStepById(testStepId);
        setTestStep(response.data);
      } catch (error) {
        console.error('Error fetching test step:', error);
      }
    };

    fetchTestStepById();
  }, [testStepId, testStep]);

  return (
    <div>
      <h1>Test Step Id: {testStepId}</h1>
      {testStep ? (
        <><p>{testStep.description}</p>
        <p>{testStep.testResult}</p>
        <p>{testStep.id}</p></>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default TestStep;
