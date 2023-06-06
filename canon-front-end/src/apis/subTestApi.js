import axios from "axios";



const subTestApi = {
    getSubTestByTestID: (test) =>{
        return axios.get(`http://localhost:8080/SubTests/TestID/${test}`)
    },
    getSubTest: (subtestDetails) => {
        return axios.get(`http://localhost:8080/SubTests/${subtestDetails}`)
    },
    getFailedCounter: (id) => {
        return axios.get(`http://localhost:8080/SubTests/failedCounter/${id}`)
    }

};

export default subTestApi;