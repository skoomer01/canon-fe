import React, { useState, useEffect, useRef } from "react"
import testApi from '../apis/testApi.js'
import subTestApi from "../apis/subTestApi.js";
import testStepApi from "../apis/testStepApi.js";
import {Link} from "react-router-dom";


function TestDetailsForm({testDetails}) {

    const [subTests, setSubTests] = useState([]);
    const [testSteps, setTestSteps] = useState([]);
    const [test, setTest] = useState(null);
    const [error, setError] = useState(null);




    useEffect(() => {
        testApi.getTest(testDetails)
            .then(response => {
                console.log(response.data);
                setTest(response.data);

            })
            .catch(error => {
            console.log(error);
            setError(error);

        })

        subTestApi.getSubTestByTestID(testDetails)
            .then(subtestsResponse => {
                console.log(subtestsResponse.data.subTests);
                setSubTests(subtestsResponse.data.subTests);
            })
            .catch(error => {
                console.log(error);
                setError(error);


            })

        testStepApi.getTestStepBySubTestID()
            .then(testStepResponse => {
                console.log(testStepResponse.data.testSteps);
                setTestSteps(testStepResponse.data.testSteps);
            })
            .catch(error => {
                console.log(error);
                setError(error);


            });
            }, []);





        return (
            <div>
                {test == null ? (
                    <div>Nothing</div>
                ):(
                    <div>{test.testName}</div>
                )}
                <table>


                    <thead>
                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Test Result</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>


                    {subTests.map(subtest => (

                                <tr key={subtest.id}>
                                    <td>{subtest.id}</td>
                                    <td><Link key={subtest.id} to={`/SubTestPage/${subtest.id}`} subTestDetails={subtest.id} style={{ textDecoration: "none" }}>{subtest.subtestName}</Link></td>
                                    <td></td>
                                    <td></td>
                                </tr>


                            )
                    )}



                    </tbody>
                </table>
            </div>


);


}

export default TestDetailsForm;