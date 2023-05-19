import axios from "axios";

const GET_ALL_SUBTESTS = "http://localhost:8080/SubTests";

const TestApi = {
    getByID: (credentials) => axios.get(GET_ALL_SUBTESTS, credentials),
    getAllByID: (credentials) => axios.get(GET_ALL_SUBTESTS,credentials)
};

export default TestApi;