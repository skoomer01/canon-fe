import axios from "axios";



const TestApi = {
    getTest: (testDetails) => {
        return axios.get(`http://localhost:8080/Tests/${testDetails}`)
    },
    getFailedCounter: (id) =>{
        return axios.get(`http://localhost:8080/Tests/failedCounter/${id}`)
    }
};

export default TestApi;