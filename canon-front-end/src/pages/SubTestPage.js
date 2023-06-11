import React from "react"
import {useParams} from "react-router-dom";
import SubTestForm from "../components/SubTestForm";

const SubTestPage = () => {
    const { id } = useParams();


    return (

        <div className="App">
            <SubTestForm subTestDetails={id}/>
        </div>
    );
}
export default SubTestPage;