import axios from "axios";

const TESTBATCH_BASE_URL = "http://localhost:8080/Branches";

const BranchAPI = {
    getAll: () => axios.get(BRANCH_BASE_URL),
    getAllTestBatchesFromABranch: (id) => axios.get(BRANCH_BASE_URL, id)
};

export default BranchAPI;

