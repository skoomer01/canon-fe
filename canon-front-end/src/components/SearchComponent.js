import React, { useState, useEffect } from 'react';
import { searchApiService } from '../API/searchApiService';
import './SearchComponent.css';

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
            <li key={result.id}>{result.branchName}</li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
}

export default SearchComponent;
