import React, { useState, useEffect } from 'react';
import './TestBatch.css';
import mockData from '../mockdata/mock-data2.json';

import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function TestBatchPage(){
    const[testBatches, setTestBatchs] = useState([]);
    // const testSetNames = Array.from(new Set(testBatches.flatMap(batch => batch.testSets.map(set => set.name))));
    
    useEffect(() => {
        setTestBatchs(mockData);
    },[]);
    const getTestSetStatus = (testSet) => {
        const statuses = testSet.tests.map(test => test.status);
        if (statuses.includes("Failed")) {
          return "Failed";
        } else if (statuses.includes("Passed")) {
          return "Passed";
        } else {
          return "Not Run";
        }
      };
      const getCardColor = (status) => {
        if (status === "Passed") {
          return "bg-success";
        } else if (status === "Failed") {
          return "bg-danger";
        } else {
          return "";
        }
      };

      if (testBatches.length === 0) {
        return <div>Loading...</div>;
      }
      
      return (
  <div className="test-batch">
    <table>
      <thead>
        <tr>
          <th>Build Time</th>
          <th>Test Version</th>
          <th>Commit SHA</th>
          {testBatches[0].testSets.map(testSet => (
            <th key={testSet.id}>{testSet.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {testBatches.map(testBatch => (
          <tr key={testBatch.id}>
            <td>{testBatch.buildTime}</td>
            <td>{testBatch.testVersion}</td>
            <td>{testBatch.commitSHA}</td>
            {testBatch.testSets.map(testSet => (
              <td key={testSet.id}>
                <div className="test-container">
                  {testSet.tests.map(test => (
                    <Link key={test.id} to="/testdetailspage" style={{ textDecoration: "none" }}>
                    <div
                      key={test.id}
                      className={
                        test.status === "Passed"
                          ? "test-rectangle"
                          : "test-rectangle-fail"
                      }
                    >
                      {test.id}
                    </div>
                    </Link>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default TestBatchPage;