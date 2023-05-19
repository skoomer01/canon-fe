import React, { useState, useEffect, useRef } from "react"
import TestApi from '../apis/testApi.js'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import testApi from "../apis/testApi.js";


function TestDetailsForm() {


    const [test, setTest] =useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = testApi.getByID(4);
                setTest(response.data); // Store the fetched data in the component's state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



        return (
            <div>
                {/* Use the fetched entity within your component */}
                {test && (
                    <div>
                        <h2>{test.id}</h2>
                        <p>{test.name}</p>
                    </div>
                )}
            </div>
        )


}

export default TestDetailsForm;