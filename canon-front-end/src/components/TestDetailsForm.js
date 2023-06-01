import React, { useState, useEffect } from "react";
import testApi from '../apis/testApi.js';
import subTestApi from "../apis/subTestApi.js";
import testStepApi from "../apis/testStepApi.js";
import { useNavigate } from "react-router-dom";
import TestSetAPI from "../apis/TestSetApi";
import TestApi from "../apis/testApi.js";

function TestDetailsForm({ testDetails }) {
    const [subTests, setSubTests] = useState([]);
    const [testSteps, setTestSteps] = useState([]);
    const [regressionTest, setRegressionTest] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [updatedSubTests, setUpdatedSubTests] = useState([]);

    useEffect(() => {
        testApi.getTest(testDetails)
            .then(response => {
                console.log(response.data);
                setRegressionTest(response.data);
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


    useEffect(() => {
        if (subTests.length > 0) {
            updateTestsWithFailedCount();
        }
    }, []);


    const fetchFailedTestStepCount = async (subtestid) => {
        try {
            const response = await TestApi.getFailedCounter(subtestid); // Use TestSetAPI.getFailedCounter method
            return response.data.failedCounter;
        } catch (error) {
            console.error('Error fetching failed test step count:', error);
            return 1;
        }
    };

    const updateTestsWithFailedCount = async () => {
        const updatedSubTests = subTests.map((subtest) => ({
            ...subtest,
            testStep: [],
        }));

        for (let i = 0; i < subTests.length; i++) {
            const subtest = subTests[i];
            const testSetIndex = updatedSubTests.findIndex((subtest) => subtest.id === subtest.subtestid);
            if (testSetIndex !== -1) {
                const failedCount = await fetchFailedTestStepCount(subtest.id);
                updatedSubTests[testSetIndex].testStep.push({
                    ...subtest,
                    failedCount: failedCount,
                });
            }
        }

        setUpdatedSubTests(updatedSubTests);
    };



    const handleButtonClick = (subTestId) => {
        navigate(`/SubTestPage/${subTestId}`);
    };

    return (
        <div>
            {regressionTest == null ? (
                <div>Nothing</div>
            ) : (
                <div>{regressionTest.testName}</div>
            )}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Test Result</th>
                </tr>
                </thead>
                <tbody>
                {updatedSubTests.map(subtest => {

                    return (
                        <tr key={subtest.id}>
                            <td>{subtest.id}</td>
                            {subtest.testStep.map((test) => (

                                        <div className="failed-step-count">
                                            {test.failedCount}
                                        </div>

                            ))}
                            <td>{subtest.failedCount}</td>

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
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TestDetailsForm;