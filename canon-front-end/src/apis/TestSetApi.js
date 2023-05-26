import axios from "axios";

const TESTSET_BASE_URL = "http://localhost:8080/TestSets";

const TestSetAPI = {
  
  getAllTestsByTestSetId: (id) => axios.get(`${TESTSET_BASE_URL}/${id}`), 
};

export default TestSetAPI;