import React from "react"
import TestDetailsForm from "../components/TestDetailsForm";
import {useParams} from "react-router-dom";

const TestDetailsPage = () => {
    const { id } = useParams();


    return (

        <div className="App">
            <TestDetailsForm testDetails={id}/>
        </div>
    );
}
export default TestDetailsPage;