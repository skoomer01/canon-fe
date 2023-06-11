import axios from "axios";

const BASE_URL = "http://localhost:8080/TestSteps";

const testStepApi = {
    getTestStepById: (testStepId) => axios.get(BASE_URL + "/" + testStepId),
    getTestStepBySubTestID: (subtestid) =>{
        return axios.get(`http://localhost:8080/TestSteps/SubtestID/${subtestid}`)
    }

};

export default testStepApi;
