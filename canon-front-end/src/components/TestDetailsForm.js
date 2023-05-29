import React, { useState, useEffect, useRef } from "react"
import TestApi from '../apis/testApi.js'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import testApi from "../apis/testApi.js";
import TestSetAPI from "../apis/TestSetApi"

function TestDetailsForm() {


    // const [test, setTest] =useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = testApi.getByID(4);
    //             setTest(response.data); // Store the fetched data in the component's state
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);



    //     return (
    //         <div>
    //             {/* Use the fetched entity within your component */}
    //             {test && (
    //                 <div>
    //                     <h2>{test.id}</h2>
    //                     <p>{test.name}</p>
    //                 </div>
    //             )}
    //         </div>
    //     )

    const id = 4; // Replace with the desired ID value

TestSetAPI.getFailedCounter(id)
  .then((response) => {
    console.log(response.data.failedCounter);
  })
  .catch(function (error) {
    console.log(error);
    alert("lmao");
  });
}

export default TestDetailsForm;