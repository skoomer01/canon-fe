import React, { useEffect, useState } from "react";
import subTestApi from "../apis/subTestApi";
import testStepApi from "../apis/testStepApi";
import { useNavigate } from "react-router-dom";
import './SubTest.css';
import testSetApi from "../apis/TestSetApi";
import testBatchApi from "../apis/testBatchApi";
import branchApi from "../apis/BranchApi";

function SubTestForm({ subTestDetails }) {
    const [testSteps, setTestSteps] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [subTest, setSubTest] = useState(null);
    const [test, setTest] = useState(null);
    const [testSet, setTestSet] = useState(null);
    const [testBatch, setTestBatch] = useState(null);
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        subTestApi.getSubTest(subTestDetails)
            .then(response => {
                console.log(response.data);
                setSubTest(response.data);
                return response.data.testId;
            })
            .then((testId) => {
                return testSetApi.getTestSet(testId);
            })
            .then((response) => {
                console.log(response.data);
                setTestSet(response.data);
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
            .then(() => {
                return testStepApi.getTestStepBySubTestID(subTestDetails);
            })
            .then(testStepResponse => {
                console.log(testStepResponse.data.testSteps);
                setTestSteps(testStepResponse.data.testSteps);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, []);






    const handleButtonClick = (testStepId) => {
        navigate(`/TestStep/${testStepId}`);
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
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>TestStance</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {testSteps.map(teststep => (
                    <tr key={teststep.id}>
                        <td>{teststep.id}</td>
                        <td>{teststep.testStepName}</td>
                        <td className={teststep.testResult ? "passed" : "failed"}>{teststep.testResult ? "Passed" : "Failed"}</td>
                        <td>{teststep.description}</td>
                        <td>
                            <button
                                onClick={() => handleButtonClick(teststep.id)}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Button
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubTestForm;