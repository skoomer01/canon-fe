import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import SearchApi from "../../apis/SearchApi";
import Pagination from "@mui/material/Pagination";
import "./SearchByErrorId.css";
import SearchByErrorIdPrivate from "./SearchByErrorIdPrivate";
import TokenManager from "../../security/TokenManager";
import SearchByCommitPrivate from "./SearchByCommitPrivate";

const RESULTS_PER_PAGE = 3;

function SearchByCommit() {
  const [loggedIn, setLoggedIn] = useState(!!TokenManager.getAccessToken());
  const [commit, setCommit] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, commit]);

  const fetchData = async () => {
    if (commit.trim() === "") {
      setNoResults(true);
      return;
    }
    await handleCountPages();
    await handleSearch();
  };

  const handleSearch = async () => {
    try {
      const response = await SearchApi.getByCommitFromPublic(
        commit,
        RESULTS_PER_PAGE,
        currentPage
      );
      setSearchResults(response);
      setNoResults(response.length === 0);
    } catch (error) {
      console.error("Error occurred while searching by error ID:", error);
    }
  };

  const handleCountPages = async () => {
    try {
      const response = await SearchApi.countPagesForCommitFromPublic(
        commit,
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

  const handleSearchClick = () => {
    setCurrentPage(1); 
    fetchData();
  };

  if(loggedIn === true){
    return (
      <div>
        <div className="search-container">
  
        <div className="search-header"> 
          <TextField
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
            label="Error ID"
            variant="outlined"
            color = "secondary"
            focused = "true"
            style={{ marginRight: '10px', height: '40px' }}
          />
          <Button onClick={handleSearchClick} variant="contained" color="secondary" style={{ height: '55px' }}>
            Search
          </Button>
        </div>
        <div className="search-results"> 
          {noResults ? (
            <div className="no-result"> 
                <div><SearchByCommitPrivate commit = {commit}  /></div>
              <p>No search results found from main branch.</p>
            </div>
          ) : (
            <>
              <div><SearchByCommitPrivate commit = {commit}  /></div>
              <div className="public-branch-header">
                <h5>Results From Main Branch:</h5>
              </div>
              <div className="results-grid"> 
                {searchResults.map((result) => (
                  <Card key={result.id} variant="outlined">
                    <CardContent className="card-content-from-bootstrap">
                      <p>Version: {result.testBatch?.version || "{no value}"}</p>
                      <p>Commit: {result.testBatch?.commitShal || "{no value}"}</p>
                      <p>Build Time: {result.testBatch?.buildTime || "{no value}"}</p>
                      <p>Date: {result.testBatch?.dateTime ? new Date(result.testBatch.dateTime).toLocaleString() : "{no value}"}</p>
                      <Button fullWidth variant="contained" color="secondary">
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
      </div>
      </div>
    );
  }
  else{
    return (
      <div>
        <div className="search-container"> 
  
        <div className="search-header"> 
          <TextField
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
            label="Error ID"
            variant="outlined"
            color = "secondary"
            focused = "true"
            style={{ marginRight: '10px', height: '40px' }}
          />
          <Button onClick={handleSearchClick} variant="contained" color="secondary" style={{ height: '55px' }}>
            Search
          </Button>
        </div>
        <div className="search-results">
          {noResults ? (
            <div className="no-result"> 
              <p>No search results found from main branch.</p>
            </div>
          ) : (
            <>
              <div className="public-branch-header">
                <h5>Results From Main Branch:</h5>
              </div>
              <div className="results-grid"> 
                {searchResults.map((result) => (
                  <Card key={result.id} variant="outlined">
                    <CardContent className="card-content-from-bootstrap">
                      <p>Version: {result.testBatch?.version || "{no value}"}</p>
                      <p>Commit: {result.testBatch?.commitShal || "{no value}"}</p>
                      <p>Build Time: {result.testBatch?.buildTime || "{no value}"}</p>
                      <p>Date: {result.testBatch?.dateTime ? new Date(result.testBatch.dateTime).toLocaleString() : "{no value}"}</p>
                      <Button fullWidth variant="contained" color="secondary">
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
      </div>
      </div>
    );
  }
}
export default SearchByCommit;