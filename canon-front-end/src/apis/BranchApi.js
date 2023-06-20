import axios from "axios";
import "../RequestInterceptor";
const BRANCH_BASE_URL = "http://localhost:8080/Branches";

const BranchAPI = {
  getAll: () => axios.get(BRANCH_BASE_URL),
  getAllTestBatchesFromABranch: (id) => axios.get(`${BRANCH_BASE_URL}/${id}`), 
  getAllPrivate: () => axios.get(`${BRANCH_BASE_URL}/private`),
  getBranchByID: (id) => axios.get(`${BRANCH_BASE_URL}/individual/${id}`)
};

export default BranchAPI;