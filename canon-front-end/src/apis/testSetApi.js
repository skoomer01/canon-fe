import axios from "axios";

const TEST_BASE_URL = "http://localhost:8080/TestSets";

const TestAPI = {
    getLatestTestSets: () => axios.get("http://localhost:8080/TestSets/latest")
};

export default TestAPI;