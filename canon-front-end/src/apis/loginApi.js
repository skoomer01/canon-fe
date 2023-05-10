import axios from "axios";

const LOGIN_BASE_URL = "http://localhost:8080/login";

const LoginAPI = {
    login: (credentials) => axios.post(LOGIN_BASE_URL, credentials)
};

export default LoginAPI;