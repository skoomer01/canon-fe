import axios from "axios";

const BASE_URL = "http://localhost:8080/TestSteps";

const TestStepApi = {
    getTestStepById: (testStepId) => axios.get(BASE_URL + "/" + testStepId)
};

export default TestStepApi;
