import axios from "axios";

const GET_ALL_TESTS = "http://localhost:8080/Tests";

const TestApi = {
    getByID: (credentials) => axios.get(GET_ALL_TESTS, credentials),
    getAll: () => axios.get(GET_ALL_TESTS)
};

export default TestApi;