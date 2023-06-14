import axios from "axios";



const TestApi = {
    getTest: (testDetails) => {
        return axios.get(`http://localhost:8080/Tests/${testDetails}`)
    },
    getTestById: (testDetails) => {
        return axios.get(`http://localhost:8080/Tests/${testDetails}`)
    },
};

export default TestApi;