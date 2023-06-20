import React, { useState, useEffect } from 'react';
import TestStepApi from '../apis/testStepApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import subTestApi from "../apis/subTestApi";
import testSetApi from "../apis/TestSetApi";
import testBatchApi from "../apis/testBatchApi";
import branchApi from "../apis/BranchApi";
import testStepApi from "../apis/testStepApi";
import testApi from "../apis/testApi";

const TestStep = ({ id }) => {
  const [testStep, setTestStep] = useState(null);
  const { id : testStepId } = useParams();
  const [subTest, setSubTest] = useState(null);
  const [test, setTest] = useState(null);
  const [testSet, setTestSet] = useState(null);
  const [testBatch, setTestBatch] = useState(null);
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    testStepApi.getTestStepById(testStepId)
        .then(response => {
          console.log(response.data);
          setTestStep(response.data);
          return response.data.subTestId;
        })
        .then((subTestId) => {
          return subTestApi.getSubTest(subTestId);
        })
        .then(response => {
          console.log(response.data);
          setSubTest(response.data);
          return response.data.testId;
        })
        .then((testId) => {
          return testApi.getTest(testId);
        })
        .then((response) => {
          console.log(response.data);
          setTest(response.data);
          return response.data.testSetId;
        })
        .then((testSetId) => {
          return testSetApi.getTestSet(testSetId);
        })
        .then((response) => {
          console.log(response.data);
          setTestSet(response.data);
          return response.data.testBatchId;
        })
        .then((testBatchId) => {
          return testBatchApi.getByID(testBatchId);
        })
        .then((response) => {
          console.log(response.data);
          setTestBatch(response.data);
          return response.data.branchId;
        })
        .then((branchId) => {
          return branchApi.getBranchByID(branchId);
        })
        .then((response) => {
          setBranch(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });   
  }, []);




  useEffect(() => {
    const fetchTestStepById = async () => {
      try {
        // const response =  await axios.get(`http://localhost:8080/TestSteps/${testStepId}`)
        const response = await TestStepApi.getTestStepById(testStepId);
        setTestStep(response.data);
      } catch (error) {
        console.error('Error fetching test step:', error);
      }
    };

    fetchTestStepById();
  }, [testStepId, testStep]);

  const handleButtonClick = (errorid) => {
    navigate(`/SimilarErrorsPage/${errorid}`);
  };

  return (
    <div>
      {branch == null ? (
          <div>Nothing</div>
      ) : (
          <div>Branch: {branch.branchName}</div>
      )}
      {testBatch == null ? (
          <div>Nothing</div>
      ) : (
          <div>Version: {testBatch.version}</div>
      )}
      {testSet == null ? (
          <div>Nothing</div>
      ) : (
          <div>testSet: {testSet.name}</div>
      )}
      {test == null ? (
          <div>Nothing</div>
      ) : (
          <div>Test: {test.testName}</div>
      )}
      {subTest == null ? (
          <div>Nothing</div>
      ) : (
          <div>Subtest: {subTest.subtestName}</div>
      )}
      {subTest == null ? (
          <div>Nothing</div>
      ) : (
          <div>TestStep: {testStep.testStepName}</div>
      )}




      {testStep ? (
        <div>
        <table>
          <thead>
           <tr>
             <th>ID</th>
             <th>Test Step Name</th>
             <th>Sub Test ID</th>
             <th>Test Result</th>
             <th>Description</th>
             <th>Error ID</th>
           </tr>
          </thead>
          <tbody>
          <tr>
            <td>{testStep.id}</td>
            <td>{testStep.testStepName}</td>
            <td>{testStep.subTestId}</td>
            <td>{testStep.testResult ? "Passed" : "Failed"}</td>
            <td>{testStep.description}</td>
            <td>{testStep.errorid}</td>
          </tr>
          </tbody>
          </table>
            {subTest != null ? (
              <div>
                <br></br>
                <button type="button" onClick={() => handleButtonClick(testStep.errorid)}>Show all by error</button>
              </div>
              ):<div></div>}
          </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default TestStep;
