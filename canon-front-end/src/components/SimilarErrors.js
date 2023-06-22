import {useParams, Link, useNavigate} from 'react-router-dom';
import React, {useState, useEffect, useMemo} from 'react';
import ErrorsAPI from "../apis/ErrorsAPI";
import {Box, Breadcrumbs, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";
import './breadcrumb.css';


const SimilarErrors = ({ id }) => {
    const { id : errorid } = useParams();
    const [testSteps, setTestSteps] = useState([]);
    const navigate = useNavigate();

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'testStepName', headerName: 'Name', width: 200 },
        { field: 'subTestId', headerName: 'SubtestID', width: 200  },
        { field: 'description', headerName: 'Description', width: 400  },
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

        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                onClick={() => navigate(-1)}
                className="breadcrumb-link"
            >
                Back
            </Link>
        </Breadcrumbs>



        <Box
            sx={{
                height: '70vh',
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
                {errorid == null ? (
                    <div>Nothing</div>
                ) : (
                    <div>All test steps with the error id: {errorid}</div>
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
)
}
export default SimilarErrors;
