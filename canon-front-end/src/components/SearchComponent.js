import React, { useState, useEffect } from 'react';
import { searchApiService } from '../API/searchApiService';
import './SearchComponent.css';
import {Card} from 'reactstrap';
import { Link } from 'react-router-dom';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('errorid');
  const [results, setResults] = useState([]);

  async function fetchData() {
    if (searchTerm !== '') {
      let data = [];
      if (filter === 'errorid') {
        data = await searchApiService.getBranchesWithErrorId(searchTerm);
      } else if (filter === 'version') {
        data = await searchApiService.getBranchesByVersion(searchTerm);
      } else if (filter === 'commitSHAL') {
        data = await searchApiService.getBranchesByCommit(searchTerm);
      }

      setResults(data);
    } else {
      setResults([]);
    }
  }

  useEffect(() => {
    if (searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm, filter]);

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleSearchButtonClick() {
    fetchData();
  }

  return (
    <div className="container">
      <div className="search-container">
        <select id="filter" value={filter} onChange={handleFilterChange} className="select">
          <option value="errorid">Error Id</option>
          <option value="version">Version</option>
          <option value="commitSHAL">Commit SHAL</option>
        </select>
        <div className="search-box">
          <input type="text" id="search" value={searchTerm} onChange={handleSearchTermChange} className="input" />
          <button onClick={handleSearchButtonClick} className="button">Search</button>
        </div>
      </div>
      {results.length > 0 ? (
        <ul className="results-list">
          {results.map((result) => (
            <div key={result.id}>
              {result.testBatches.map((testBatch) => (
                <Link to={`/testBatchDetail/${testBatch.id}`} style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'inherit' }}>
                  <Card className={`Card ${testBatch.testResult.toLowerCase()}`}>
                    <p>Branch: {result.branchName.charAt(0).toUpperCase() + result.branchName.slice(1).toLowerCase()}</p>
                    <p>Visibility: {result.visibility.charAt(0).toUpperCase() + result.visibility.slice(1).toLowerCase()}</p>
                    <p>Version: {testBatch.version.charAt(0).toUpperCase() + testBatch.version.slice(1).toLowerCase()}</p>
                    <p>Commit SHAL: {testBatch.commitShal.charAt(0).toUpperCase() + testBatch.commitShal.slice(1).toLowerCase()}</p>
                    <p>Build Time: {testBatch.buildTime.charAt(0).toUpperCase() + testBatch.buildTime.slice(1).toLowerCase()}</p>
                  </Card>
                </Link>
              ))}
            </div>
          ))}
        </ul>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div>
  ); 
}
export default SearchComponent;
