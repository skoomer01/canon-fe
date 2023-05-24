import axios from "axios";



const subTestApi = {
    getSubTestByTestID: (test) =>{
        return axios.get(`http://localhost:8080/SubTests/${test}`)
    }
};

export default subTestApi;