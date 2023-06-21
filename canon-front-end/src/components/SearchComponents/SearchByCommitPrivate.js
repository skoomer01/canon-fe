import React, { useState, useEffect } from "react";
import { Card, CardContent, Button } from "@mui/material";
import SearchApi from "../../apis/SearchApi";
import Pagination from "@mui/material/Pagination";
import "./SearchByErrorId.css";
import TokenManager from "../../security/TokenManager";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RESULTS_PER_PAGE = 3;

function SearchByCommitPrivate(props) {


  const userId = TokenManager.getClaims()?.userId;
  console.error("User ID: " + userId);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, props.commit]);

  const fetchData = async () => {
    if (props.commit.trim() === "") {
      setNoResults(true);
      return;
    }
    await handleCountPages();
    await handleSearch();
  };

  const handleSearch = async () => {
    try {
      const response = await SearchApi.getByCommitFromPrivate(
        props.commit,
        userId,
        RESULTS_PER_PAGE,
        currentPage
      );

      console.log(response);
      setSearchResults(response);
      setNoResults(response.length === 0);
    } catch (error) {
      console.error("Error occurred while searching by error ID:", error);
    }
  };

  const handleCountPages = async () => {
    try {
      const response = await SearchApi.countPagesForCommitFromPrivate(
        props.commit,
        userId,
        RESULTS_PER_PAGE
      );
      setTotalPages(response);
    } catch (error) {
      console.error("Error occurred while counting pages:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNavigateToDetails = () =>{
    navigate(`/OverViewPage`);
  }

  return (
    <div className="search-results">
      {noResults ? (
        <div className="no-result">
            <p>No search results found from private branches.</p>
        </div>
      ) : (
        <>
          <h5>Results From Private Branch:</h5>
          <div className="results-grid">
            {searchResults.map((result) => (
              <Card key={result.id} variant="outlined">
                <CardContent className="card-content-from-bootstrap">
                  <p>Branch: {result.branch?.branchName || "{no value}"}</p>
                  <p>Version: {result.testBatch?.version || "{no value}"}</p>
                  <p>Commit: {result.testBatch?.commitShal || "{no value}"}</p>
                  <p>Build Time: {result.testBatch?.buildTime || "{no value}"}</p>
                  <p>Date: {result.testBatch?.dateTime ? new Date(result.testBatch.dateTime).toLocaleString() : "{no value}"}</p>
                  <Button onClick={handleNavigateToDetails} fullWidth variant="contained" color="secondary">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!noResults && (
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
}

export default SearchByCommitPrivate;