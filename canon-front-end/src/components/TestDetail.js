import React, { useState, useEffect } from 'react';
import './TestDetail.css';
import mockData from '../mockdata/mock-data2.json';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TestDetailsPage(){
  const { testBatchId, testSetId, testId } = useParams();

  // Find the test
  const testBatch = mockData.find(batch => batch.id === parseInt(testBatchId));
  const testSet = testBatch?.testSets.find(set => set.id === parseInt(testSetId));
  const test = testSet?.tests.find(test => test.id === parseInt(testId));

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {test && (
            <tr>
              <td>{test.id}</td>
              <td>{test.name}</td>
              <td>{test.status}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default TestDetailsPage;