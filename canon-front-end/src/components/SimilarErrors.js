import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorsAPI from "../apis/ErrorsAPI";

const SimilarErrors = ({ id }) => {
    const { id : errorid } = useParams();
    const [testSteps, setTestSteps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await ErrorsAPI.getSimilarErrors(errorid);
              setTestSteps(response.data.testSteps);
              console.log(errorid);
              console.log(response.data.testSteps);
          } catch (error) {
            console.log("Failed to fetch test steps:", error);
          }
        };
        fetchData();
      }, []);

return (
    <div>
        <h3>All test steps with the error id: {errorid}</h3>
        <br></br>
        <table>
          <thead>
           <tr>
             <th>ID</th>
             <th>Test Step Name</th>
             <th>Sub Test ID</th>
             <th>Description</th>
           </tr>
          </thead>
          <tbody>
            {testSteps.map((testStep) => (
                <tr>
            <td>{testStep.id}</td>
            <td>{testStep.testStepName}</td>
            <td>{testStep.subTestId}</td>
            <td>{testStep.description}</td>
            <Link key={testStep.id} to={`/SubTestPage/${testStep.id}`}>Go to the subtest with id: {testStep.subTestId}</Link>
            </tr>
            ))}
            </tbody>
          </table>
          </div>
)
}
export default SimilarErrors;
