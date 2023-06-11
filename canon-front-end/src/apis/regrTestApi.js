import axios from "axios";

const regrTestApi = {
     getTest: (testDetails) => {
         return axios.get(`http://localhost:8080/Tests/${testDetails}`)
     },
     getLatestRegrTestsByTestSetId: (id) => {axios.get(`http://localhost:8080/Tests/latest/${id}`, id)}

 };

 export default regrTestApi;