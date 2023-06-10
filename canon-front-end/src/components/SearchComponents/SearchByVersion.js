import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import SearchApi from "../../apis/SearchApi";
import Pagination from "@mui/material/Pagination";
import "./SearchByErrorId.css"; // Import the CSS file

const RESULTS_PER_PAGE = 3;

function SearchByVersion() {
  const [version, setVersion] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    if (version.trim() === "") {
      setNoResults(true);
      return;
    }
    await handleCountPages();
    await handleSearch();
  };

  const handleSearch = async () => {
    try {
      const response = await SearchApi.getByVersionFromPublic(
        version,
        RESULTS_PER_PAGE,
        currentPage
      );
      setSearchResults(response);
      setNoResults(response.length === 0);
    } catch (error) {
      console.error("Error occurred while searching by error ID:", error);
      // Handle error state or show error message
    }
  };

  const handleCountPages = async () => {
    try {
      const response = await SearchApi.countPagesForVersionFromPublic(
        version,
        RESULTS_PER_PAGE
      );
      setTotalPages(response);
    } catch (error) {
      console.error("Error occurred while counting pages:", error);
      // Handle error state or show error message
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchClick = () => {
    setCurrentPage(1); // Reset current page to 1 when search is clicked
    fetchData();
  };

  return (
    <div className="search-container"> {/* Apply container styles */}
      <div className="search-header"> {/* Apply header styles */}
        <TextField
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        //   label="Error ID"
        //   variant="outlined"
        />
        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Search
        </Button>
      </div>

      <div className="search-results"> {/* Apply results container styles */}
        {noResults ? (
          <p>No search results found.</p>
        ) : (
          <>
            <p>Search Results:</p>
            <div className="results-grid"> {/* Apply grid styles */}
              {searchResults.map((result) => (
                <Card key={result.id} variant="outlined">
                  <CardContent>
                    <p>Branch: {result.branch?.branchName || "{no value}"}</p>
                    <p>Version: {result.testBatch?.version || "{no value}"}</p>
                    {/* <p>Commit: {result.testBatch?.commitShal || "{no value}"}</p> */}
                    <p>Build Time: {result.testBatch?.buildTime || "{no value}"}</p>
                    <p>Date: {result.testBatch?.dateTime ? new Date(result.testBatch.dateTime).toLocaleString() : "{no value}"}</p>
                    {/* <p>Date: {result.testBatch?.dateTime || "{no value}"}</p> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {!noResults && (
          <div className="pagination-container"> {/* Apply pagination container styles */}
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
  );
}

export default SearchByVersion;