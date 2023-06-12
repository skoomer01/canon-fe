import React, { useState, useEffect } from "react";
import testApi from '../apis/testApi.js';
import subTestApi from "../apis/subTestApi.js";
import testStepApi from "../apis/testStepApi.js";
import { useNavigate } from "react-router-dom";
import testSetApi from "../apis/TestSetApi";
import testBatchApi from "../apis/testBatchApi";
import branchApi from "../apis/BranchApi";

function TestDetailsForm({ testDetails }) {
    const [subTests, setSubTests] = useState([]);
    const [subTestFailed, setSubTestFailed] = useState({});
    const [allTestSteps, setAllTestSteps] = useState({});
    const [test, setTest] = useState(null);
    const [testSet, setTestSet] = useState(null);
    const [testBatch, setTestBatch] = useState(null);
    const [branch, setBranch] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        testApi
            .getTest(testDetails)
            .then((response) => {
                console.log(response.data);
                setTest(response.data);
                return response.data.testSetId;
            })
            .then((testSetId) => {
                testSetApi
                    .getTestSet(testSetId)
                    .then((response) => {
                        console.log(response.data);
                        setTestSet(response.data);
                        return response.data.testBatchId;
                    })
                    .then((testBatchId) => {
                        testBatchApi
                            .getByID(testBatchId)
                            .then((response) => {
                                console.log(response.data);
                                setTestBatch(response.data);
                                return response.data.branchId;
                            })
                            .then((branchId) => {
                                branchApi
                                    .getBranchByID(branchId)
                                    .then((response) => {
                                        setBranch(response.data);
                                        console.log(response.data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setError(error);
                                    });
                            }) // <-- Added closing parenthesis here
                            .catch((error) => {
                                console.log(error);
                                setError(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });

        subTestApi
            .getSubTestByTestID(testDetails)
            .then((subtestsResponse) => {
                console.log(subtestsResponse.data.subTests);
                setSubTests(subtestsResponse.data.subTests);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }, [testDetails]);


    const getFailedTestBySubTest = (subTestId) => {
        subTestApi
            .getFailedCounter(subTestId)
            .then((response) => {
                const failedCounter = response.data.failedCounter;
                setSubTestFailed((prevState) => ({
                    ...prevState,
                    [subTestId]: failedCounter,
                }));
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
        subTestApi
            .getTotalTestSteps(subTestId)
            .then((response) => {
                const totalTestSteps = response.data.failedCounter;
                setAllTestSteps((prevState) => ({
                    ...prevState,
                    [subTestId]: totalTestSteps,
                }));
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    };

    const handleButtonClick = (subTestId) => {
        navigate(`/SubTestPage/${subTestId}`);
    };

    useEffect(() => {
        subTests.forEach((subtest) => {
            getFailedTestBySubTest(subtest.id);
        });
    }, [subTests]);

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
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Failed / Total Tests</th>
                </tr>
                </thead>
                <tbody>
                {subTests.map((subtest) => (
                    <tr key={subtest.id}>
                        <td>{subtest.id}</td>
                        <td>{subtest.subtestName}</td>
                        <td className={subTestFailed[subtest.id] > 0 ? "failed" : "passed"}>
                            {subTestFailed[subtest.id]}/{allTestSteps[subtest.id]}
                        </td>
                        <td>
                            <button
                                onClick={() => handleButtonClick(subtest.id)}
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

export default TestDetailsForm;