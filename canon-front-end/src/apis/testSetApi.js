import axios from "axios";

const TEST_BASE_URL = "http://localhost:8080/TestSets";
const TESTSET_BASE_URL = "http://localhost:8080/TestSets";
const TESTSET_FAILEDCOUNTER = "http://localhost:8080/TestSets/failedCounter";

const TestAPI = {
    getLatestTestSets: () => axios.get("http://localhost:8080/TestSets/latest"),
    getAllTestsByTestSetId: (id) => axios.get(`${TESTSET_BASE_URL}/${id}`),
    getFailedCounter: (id) => axios.get(`${TESTSET_FAILEDCOUNTER}/${id}`)
};

export default TestAPI;