import axios from "axios";



const testStepApi = {
    getTestStepBySubTestID: () =>{
        return axios.get(`http://localhost:8080/TestSteps`)
    }
};

export default testStepApi;