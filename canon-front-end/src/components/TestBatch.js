import React, { useState, useEffect } from 'react';
import './TestBatch.css';
import mockData from '../mockdata/mock-data2.json';
import BranchAPI from "../apis/BranchApi";

import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function TestBatchPage({selectedBranchId}){
    const[testBatches, setTestBatchs] = useState([]);
    // const testSetNames = Array.from(new Set(testBatches.flatMap(batch => batch.testSets.map(set => set.name))));
    
    useEffect(() => {
      if (selectedBranchId != 0) {
        BranchAPI.getAllTestBatchesFromABranch(selectedBranchId)
          .then((response) => {
            setTestBatchs(response.data.testBatchList);
            
          })
          .catch(function (error) {
            console.log("failed");
            alert("failed");
          });
      } else {
        setTestBatchs([]); // Reset test batches when no branch is selected
      }
    }, [selectedBranchId]);

    useEffect(() => {
      console.log(testBatches);
    }, [testBatches]);

    if (testBatches.length === 0) {
      return <div>Loading...</div>;
    }

      return (
    <div className="test-batch">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Build Time</th>
            <th>Version</th>
            <th>Commit SHA</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {testBatches.map((testBatch) => (
            <tr key={testBatch.id}>
              <td>{testBatch.id}</td>
              <td>{testBatch.buildTime}</td>
              <td>{testBatch.version}</td>
              <td>{testBatch.commitShal}</td>
              <td>{testBatch.dateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TestBatchPage;