import React, { useState, useEffect } from 'react';
import TestSetApi from '../apis/TestSetApi';
import TestSet from '../components/TestSet';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';

function HomePage() {
    const [testSets, setTestSets] = useState([]);

    const getLatestSets = () => {
        TestSetApi.getLatestTestSets()
            .then((response) => setTestSets(response.data.latestTestSets))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getLatestSets();
    }, []);

    return (
        <div>
            <h1>Here are your latest test sets</h1>
            <TestSet testSets={testSets} />
        </div>
    );
}
export default HomePage;