import React, {useEffect, useState} from "react";
import subTestApi from "../apis/subTestApi";
import testStepApi from "../apis/testStepApi";
import {Link} from "react-router-dom";

function SubTestForm({subTestDetails}) {

    const [testSteps, setTestSteps] = useState([]);
    const [subTest, setSubTest] = useState(null);
    const [error, setError] = useState(null);




    useEffect(() => {
        subTestApi.getSubTest(subTestDetails)
            .then(response => {
                console.log(response.data);
                setSubTest(response.data);

            })
            .catch(error => {
                console.log(error);
                setError(error);

            })

        testStepApi.getTestStepBySubTestID(subTestDetails)
            .then(testStepResponse => {
                console.log(testStepResponse.data.testSteps);
                setTestSteps(testStepResponse.data.testSteps);
            })
            .catch(error => {
                console.log(error);
                setError(error);


            })

    }, []);





    return (
        <div>
            {subTest == null ? (
                <div>Nothing</div>
            ):(
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
                            <td><Link key={teststep.id} to={`/TestStep/${teststep.id}`} testStepDetails={teststep.id} style={{ textDecoration: "none" }}>{teststep.testStepName}</Link></td>
                            <td>{teststep.testResult ? "Passed" : "Failed"}</td>
                            <td>{teststep.description}</td>

                        </tr>


                    )
                )}



                </tbody>
            </table>
        </div>


    );


}

export default SubTestForm;