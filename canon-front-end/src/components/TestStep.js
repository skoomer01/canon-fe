import React, { useState, useEffect } from 'react';
import TestStepApi from '../apis/TestStepApi';
import { useParams } from 'react-router-dom';

const TestStep = ({ id }) => {
  const [testStep, setTestStep] = useState(null);
  const { id : testStepId } = useParams();

  useEffect(() => {
    const fetchTestStepById = async () => {
      try {
        const response = await TestStepApi.getTestStepById(testStepId);
        setTestStep(response);
      } catch (error) {
        console.error('Error fetching test step:', error);
      }
    };

    fetchTestStepById();
  }, [testStepId]);

  return (
    <div>
      <h1>Test Step Id: {testStepId}</h1>
      {testStep ? (
        <TestStepComponent testStep={testStep} />
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default TestStep;
