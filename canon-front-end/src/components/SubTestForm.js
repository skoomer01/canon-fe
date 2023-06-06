import React, { useEffect, useState } from "react";
import subTestApi from "../apis/subTestApi";
import testStepApi from "../apis/testStepApi";
import { useNavigate } from "react-router-dom";
import './SubTest.css';

function SubTestForm({ subTestDetails }) {
    const [testSteps, setTestSteps] = useState([]);
    const [subTest, setSubTest] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        subTestApi.getSubTest(subTestDetails)
            .then(response => {
                console.log(response.data);
                setSubTest(response.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });

        testStepApi.getTestStepBySubTestID(subTestDetails)
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
            {subTest == null ? (
                <div>Nothing</div>
            ) : (
                <div>asd</div>
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
