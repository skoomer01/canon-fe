import React, { useState, useEffect } from "react";
import testApi from '../apis/testApi.js';
import subTestApi from "../apis/subTestApi.js";
import testStepApi from "../apis/testStepApi.js";
import { useNavigate } from "react-router-dom";

function TestDetailsForm({ testDetails }) {
    const [subTests, setSubTests] = useState([]);
    const [subTestFailed, setSubTestFailed] = useState({});
    const [testSteps, setTestSteps] = useState([]);
    const [test, setTest] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        testApi.getTest(testDetails)
            .then(response => {
                console.log(response.data);
                setTest(response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });

        subTestApi.getSubTestByTestID(testDetails)
            .then(subtestsResponse => {
                console.log(subtestsResponse.data.subTests);
                setSubTests(subtestsResponse.data.subTests);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });

        testStepApi.getTestStepBySubTestID()
            .then(testStepResponse => {
                console.log(testStepResponse.data.testSteps);
                setTestSteps(testStepResponse.data.testSteps);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [testDetails]);

    const getFailedTestBySubTest = (subTestId) => {
        subTestApi.getFailedCounter(subTestId)
            .then(response => {
                const failedCounter = response.data.failedCounter;
                setSubTestFailed(prevState => ({
                    ...prevState,
                    [subTestId]: failedCounter
                }));
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleButtonClick = (subTestId) => {
        navigate(`/SubTestPage/${subTestId}`);
    };

    useEffect(() => {
        subTests.forEach(subtest => {
            getFailedTestBySubTest(subtest.id);
        });
    }, [subTests]);

    return (
        <div>
            {test == null ? (
                <div>Nothing</div>
            ) : (
                <div>{test.testName}</div>
            )}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Failed Counter</th>
                </tr>
                </thead>
                <tbody>
                {subTests.map(subtest => (
                    <tr key={subtest.id}>
                        <td>{subtest.id}</td>
                        <td>{subtest.subtestName}</td>
                        <td>{subTestFailed[subtest.id]}</td>
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
