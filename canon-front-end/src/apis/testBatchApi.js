import axios from "axios";

const BATCH_BASE_URL = "http://localhost:8080/TestBatches";
const BATCH_GET_BY_ID = "http://localhost:8080/TestBatches/individual";

const BatchAPI = {
  
  getAllTestSetsFromABatch: (id) => axios.get(`${BATCH_BASE_URL}/${id}`),
  getByID: (id) => axios.get(`${BATCH_GET_BY_ID}/${id}`)
};

export default BatchAPI;