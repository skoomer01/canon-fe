import React, { useState, useEffect } from 'react';
import TestStepApi from '../apis/testStepApi';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import subTestApi from '../apis/subTestApi';
import testSetApi from '../apis/TestSetApi';
import testBatchApi from '../apis/testBatchApi';
import branchApi from '../apis/BranchApi';
import testStepApi from '../apis/testStepApi';
import './breadcrumb.css';
import testApi from '../apis/testApi';
import {Box, Breadcrumbs, Button, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import { Table } from 'reactstrap';
import {DataGrid} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";

const TestStep = ({ id }) => {
    const [testStep, setTestStep] = useState(null);
    const { id: testStepId } = useParams();
    const [subTest, setSubTest] = useState(null);
    const [test, setTest] = useState(null);
    const [testSet, setTestSet] = useState(null);
    const [testBatch, setTestBatch] = useState(null);
    const [branch, setBranch] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        testStepApi
            .getTestStepById(testStepId)
            .then((response) => {
                console.log(response.data);
                setTestStep(response.data);
                return response.data.subTestId;
            })
            .then((subTestId) => {
                return subTestApi.getSubTest(subTestId);
            })
            .then((response) => {
                console.log(response.data);
                setSubTest(response.data);
                return response.data.testId;
            })
            .then((testId) => {
                return testApi.getTest(testId);
            })
            .then((response) => {
                console.log(response.data);
                setTest(response.data);
                return response.data.testSetId;
            })
            .then((testSetId) => {
                return testSetApi.getTestSet(testSetId);
            })
            .then((response) => {
                console.log(response.data);
                setTestSet(response.data);
                return response.data.testBatchId;
            })
            .then((testBatchId) => {
                return testBatchApi.getByID(testBatchId);
            })
            .then((response) => {
                console.log(response.data);
                setTestBatch(response.data);
                return response.data.branchId;
            })
            .then((branchId) => {
                return branchApi.getBranchByID(branchId);
            })
            .then((response) => {
                setBranch(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }, []);

    useEffect(() => {
        const fetchTestStepById = async () => {
            try {
                const response = await TestStepApi.getTestStepById(testStepId);
                setTestStep(response.data);
            } catch (error) {
                console.error('Error fetching test step:', error);
            }
        };

        fetchTestStepById();
    }, [testStepId, testStep]);

    const handleButtonClick = (errorid) => {
        navigate(`/SimilarErrorsPage/${errorid}`);
    };

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <div>
            <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        to={`/OverViewPage`}
                        className="breadcrumb-link"
                    >
                        Overview
                    </Link>
                    {test == null ? (
                        <div>Nothing</div>
                    ) : (
                        <Link
                            underline="hover"
                            to={`/testdetailspage/${test.id}`}
                            className="breadcrumb-link"
                        >
                            <Typography >{test.testName}</Typography>
                        </Link>
                    )}
                    {subTest == null ? (
                        <div>Nothing</div>
                    ) : (
                        <Link
                            underline="hover"
                            to={`/SubTestPage/${subTest.id}`}
                            className="breadcrumb-link"
                        >
                            <Typography >{subTest.subtestName}</Typography>
                        </Link>
                    )}
                    {testStep == null ? (
                        <div>Nothing</div>
                    ) : (
                        <Typography  color="text.primary">
                            {testStep.testStepName}
                        </Typography>
                    )}
                </Breadcrumbs>
            </div>


            <Box
                sx={{
                    height: '60vh',
                    width: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90vw',  // Add this line to set the maximum width of the box
                    maxHeight: '90vh',  // Add this line to set the maximum height of the box
                }}
            >
                <Typography
                    variant="h3"
                    component="h3"
                    sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                >
                    {testStep == null ? (
                        <div>Nothing</div>
                    ) : (
                        <div>{testStep.testStepName}</div>
                    )}
                </Typography>
                {testStep ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Test Step Name</TableCell>
                                <TableCell>Sub Test ID</TableCell>
                                <TableCell>Test Result</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Error ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{testStep.id}</TableCell>
                                <TableCell>{testStep.testStepName}</TableCell>
                                <TableCell>{testStep.subTestId}</TableCell>
                                <TableCell>{testStep.testResult ? 'Passed' : 'Failed'}</TableCell>
                                <TableCell>{testStep.description}</TableCell>
                                <TableCell>{testStep.errorid}</TableCell>
                                {testStep.errorid != null && (
                                    <TableCell>
                                        <Button
                                            style = {{
                                            backgroundColor: 'grey',
                                            color: 'white',
                                            padding: '8px 16px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleButtonClick(testStep.errorid)}
                                        >
                                            Show all by error
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
            </Box>





        </div>
    );
};

export default TestStep;

