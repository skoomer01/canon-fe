import React, { useState, useEffect } from 'react';
import TestSet from "../components/TestSet";
import testSetApi from "../apis/testSetApi";


function HomePage(){
    const [testSets, setTestSets] = useState([]);

    const getLatestSets = () => {
        testSetApi.getLatestTestSets()
            .then((response) => setTestSets(response.data.latestTestSets))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        getLatestSets();
    }, []);
    

    return (
        <div>
            <h1>Here are your latest 6 test sets</h1>
            <TestSet testSets={testSets}/>
        </div>
    );
}
export default HomePage;