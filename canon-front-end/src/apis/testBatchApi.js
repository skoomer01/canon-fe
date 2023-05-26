import axios from "axios";

const BATCH_BASE_URL = "http://localhost:8080/TestBatches";

const BatchAPI = {
  
  getAllTestSetsFromABatch: (id) => axios.get(`${BATCH_BASE_URL}/${id}`), 
};

export default BatchAPI;