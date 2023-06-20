import axios from "axios";
import "../RequestInterceptor";
const ERROR_BASE_URL = "http://localhost:8080/errors";

const ErrorsAPI = {
  getAllErrors: () => axios.get(ERROR_BASE_URL),
  getSimilarErrors: (id) => axios.get(`${ERROR_BASE_URL}/similarErrors/${id}`)
};

export default ErrorsAPI;