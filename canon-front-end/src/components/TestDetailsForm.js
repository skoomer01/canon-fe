import React, { useState, useEffect, useMemo } from "react";
import testApi from '../apis/testApi.js';
import subTestApi from "../apis/subTestApi.js";
import testStepApi from "../apis/testStepApi.js";
import {Link, useNavigate} from "react-router-dom";
import testSetApi from "../apis/TestSetApi";
import testBatchApi from "../apis/testBatchApi";
import branchApi from "../apis/BranchApi";
import {Box, Breadcrumbs, Typography} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {createTheme, gridClasses} from "@mui/system";
import {grey} from "@mui/material/colors";
import { palette } from '@mui/system';
import './TestDetails.css';
import './breadcrumb.css';

function TestDetailsForm({ testDetails }) {
    const [subTests, setSubTests] = useState([]);
    const [subTestFailed, setSubTestFailed] = useState({});
    const [allTestSteps, setAllTestSteps] = useState({});
    const [test, setTest] = useState(null);
    const [testSet, setTestSet] = useState(null);
    const [testBatch, setTestBatch] = useState(null);
    const [branch, setBranch] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [rowId,setRowId] = useState(null);

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }





    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'subtestName', headerName: 'Name', width: 400 },
        {
            field: 'failedCounter',
            headerName: 'Test Result',
            width: 200,
            cellClassName: (params) => (params.value > 0 ? 'failed' : 'passed'),
            renderCell: (params) => (params.value === 0 ? '\u2713' : params.value),
        },
        { field: 'totalTestSteps', headerName: 'Total TestSteps', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            bgcolor:'blue',
            cellClassName: 'actions',
            renderCell: (params) => {
                const handleButtonClick = () => {
                    const id = params.row.id; // Access the 'id' field value directly from params.row
                    navigate(`/SubTestPage/${id}`); // Navigate to SubTestPage with the corresponding id
                };

                return (
                    <div className="button-container">
                        <button
                            onClick={handleButtonClick}
                            className="custom-button"
                        >
                            Go to SubTestPage
                        </button>
                    </div>
                );
            },
        },
    ], []);




    useEffect(() => {
        testApi
            .getTest(testDetails)
            .then((response) => {
                setTest(response.data);
                return response.data.testSetId;
            })
            .then((testSetId) => {
                testSetApi
                    .getTestSet(testSetId)
                    .then((response) => {
                        setTestSet(response.data);
                        return response.data.testBatchId;
                    })
                    .then((testBatchId) => {
                        testBatchApi
                            .getByID(testBatchId)
                            .then((response) => {
                                setTestBatch(response.data);
                                return response.data.branchId;
                            })
                            .then((branchId) => {
                                branchApi
                                    .getBranchByID(branchId)
                                    .then((response) => {
                                        setBranch(response.data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setError(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                                setError(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });

        subTestApi
            .getSubTestByTestID(testDetails)
            .then((subtestsResponse) => {
                const reversedSubTests = subtestsResponse.data.subTests.map((subtest) => ({
                    ...subtest,
                    failedCounter: subTestFailed[subtest.id] || 0,
                    totalTestSteps: allTestSteps[subtest.id] || 0,
                })).reverse();
                setSubTests(reversedSubTests);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }, [testDetails]);

    const getFailedTestBySubTest = (subTestId) => {
        subTestApi
            .getFailedCounter(subTestId)
            .then((response) => {
                const failedCounter = response.data.failedCounter;
                setSubTestFailed((prevState) => ({
                    ...prevState,
                    [subTestId]: failedCounter,
                }));
                setSubTests((prevState) => prevState.map((subtest) => {
                    if (subtest.id === subTestId) {
                        return {
                            ...subtest,
                            failedCounter: failedCounter,
                        };
                    }
                    return subtest;
                }));
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });

        subTestApi
            .getTotalTestSteps(subTestId)
            .then((response) => {
                const totalTestSteps = response.data.failedCounter;

                setAllTestSteps((prevState) => ({
                    ...prevState,
                    [subTestId]: totalTestSteps,
                }));
                setSubTests((prevState) => prevState.map((subtest) => {
                    if (subtest.id === subTestId) {
                        return {
                            ...subtest,
                            totalTestSteps: totalTestSteps,
                        };
                    }
                    return subtest;
                }));
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    };



    useEffect(() => {
        subTests.forEach((subtest) => {
            getFailedTestBySubTest(subtest.id);
        });
    }, [subTests.length]);




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
                        <Typography color="text.primary">
                            {test.testName}
                        </Typography>
                    )}
                </Breadcrumbs>
            </div>




            <Box
                sx={{
                    height: '65vh',
                    width: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '50%',
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
                    {test == null ? (
                        <div>Nothing</div>
                    ) : (
                        <div>{test.testName}</div>
                    )}
                </Typography>
                <DataGrid
                    columns={columns}
                    rows={subTests}
                    getRowId={(row) => row.id}
                    className="subtest-grid"
                    initialState={{
                        ...columns.initialState,
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    getRowSpacing={params => ({
                            top: params.isFirstVisible ? 0:5,
                            bottom: params.isLastVisible ? 0 :5
                        })}
                    sx={{
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MuiDataGrid-cell': {
                            bgcolor: grey[300],
                        },
                        '& .passed': {
                            bgcolor: `#8bc34a`,
                        },
                        '& .failed': {
                            bgcolor: `#b2102f`,
                        },
                        '& .actions': {
                            textColor: `#b2102f`,
                        },
                        '& .button-container': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',

                        },
                        '& .custom-button': {
                            backgroundColor: 'grey',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            height: '100%',
                        },
                        '& .custom-button:hover': {
                            backgroundColor: 'darkgrey',
                        },

                    }}
                />
            </Box>

        </div>
    );
}

export default TestDetailsForm;