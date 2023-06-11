import axios from "axios";

const BRANCH_BASE_URL = "http://localhost:8080/Branches";
const BRANCH_GET_BY_ID = "http://localhost:8080/Branches/individual";

const BranchAPI = {
  getAll: () => axios.get(BRANCH_BASE_URL),
  getAllTestBatchesFromABranch: (id) => axios.get(`${BRANCH_BASE_URL}/${id}`),
  getBranchByID: (id) => axios.get(`${BRANCH_GET_BY_ID}/${id}`)
};

export default BranchAPI;