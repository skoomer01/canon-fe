import React, {useEffect, useMemo, useState} from "react";
import subTestApi from "../apis/subTestApi";
import testStepApi from "../apis/testStepApi";
import { useNavigate } from "react-router-dom";
import './SubTest.css';
import testSetApi from "../apis/TestSetApi";
import testBatchApi from "../apis/testBatchApi";
import branchApi from "../apis/BranchApi";
import testApi from "../apis/testApi";
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";

function SubTestForm({ subTestDetails }) {
    const [testSteps, setTestSteps] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [subTest, setSubTest] = useState(null);
    const [test, setTest] = useState(null);
    const [testSet, setTestSet] = useState(null);
    const [testBatch, setTestBatch] = useState(null);
    const [branch, setBranch] = useState(null);

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'testStepName', headerName: 'Name', width: 200 },
        {
            field: 'errorid',
            headerName: 'Test Stance',
            width: 200,
            cellClassName: (params) => (params.value > 0 ? 'failed' : 'passed'),
            renderCell: (params) => (params.value > 0 ? 'Failed' : 'Passed'),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            bgcolor:'blue',
            cellClassName: 'actions',
            renderCell: (params) => {
                const handleButtonClick = () => {
                    const id = params.row.id; // Access the 'id' field value directly from params.row
                    navigate(`/TestStep/${id}`); // Navigate to SubTestPage with the corresponding id
                };

                return (
                    <div className="button-container">
                        <button
                            onClick={handleButtonClick}
                            className="custom-button"
                        >
                            Go to TestStepPage
                        </button>
                    </div>
                );
            },
        },
    ], []);



    useEffect(() => {
        subTestApi.getSubTest(subTestDetails)
            .then(response => {
                console.log(response.data);
                setSubTest(response.data);
                return response.data.testId;
            })
            .then((testId) => {
                return testApi.getTestById(testId);
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
            .then(() => {
                return testStepApi.getTestStepBySubTestID(subTestDetails);
            })
            .then(testStepResponse => {
                console.log(testStepResponse.data.testSteps);
                const reversedTestSteps = testStepResponse.data.testSteps.reverse();
                setTestSteps(reversedTestSteps);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, []);






    const handleButtonClick = (testStepId) => {
        navigate(`/TestStep/${testStepId}`);
    };

    return (
        <div>
            {branch == null ? (
                <div>Nothing</div>
            ) : (
                <div>Branch: {branch.branchName}</div>
            )}
            {testBatch == null ? (
                <div>Nothing</div>
            ) : (
                <div>Version: {testBatch.version}</div>
            )}
            {testSet == null ? (
                <div>Nothing</div>
            ) : (
                <div>testSet: {testSet.name}</div>
            )}
            {test == null ? (
                <div>Nothing</div>
            ) : (
                <div>Test: {test.testName}</div>
            )}
            {subTest == null ? (
                <div>Nothing</div>
            ) : (
                <div>Subtest: {subTest.subtestName}</div>
            )}
            <Box
                sx={{
                    height: '60vh',
                    width: '60vh',
                    boxShadow: 1,
                    borderRadius: 2,
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
                    rows={testSteps}
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
                            height: '100%',
                            width: '100%',
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

export default SubTestForm;
