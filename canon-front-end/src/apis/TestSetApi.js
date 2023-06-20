import axios from "axios";

const TESTSET_BASE_URL = "http://localhost:8080/TestSets";
const TESTSET_FAILEDCOUNTER = "http://localhost:8080/TestSets/failedCounter";
const TESTSET_TOTALSUBTESTS = "http://localhost:8080/TestSteps/totalCounter";
const TESTSET_GETINDIVIDUAL = "http://localhost:8080/TestSets/individual";
const TestSetAPI = {
  getLatestTestsByTestSet: (id) => axios.get(`http://localhost:8080/Tests/latest/${id}`, id),
  getLatestTestSets: () => axios.get("http://localhost:8080/TestSets/latest"),
  getAllTestsByTestSetId: (id) => axios.get(`${TESTSET_BASE_URL}/${id}`), 
  getFailedCounter: (id) => axios.get(`${TESTSET_FAILEDCOUNTER}/${id}`),
  getTotalSubtests: (id) => axios.get(`${TESTSET_TOTALSUBTESTS}/${id}`),
  getTestSet: (id) => axios.get(`${TESTSET_GETINDIVIDUAL}/${id}`)

};

export default TestSetAPI;