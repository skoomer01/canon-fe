import React, { useState, useEffect } from 'react';
import './SearchComponent.css'; 

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('errorid');
  const [results, setResults] = useState([]);

  async function fetchData() {
    const response = await fetch(`api`);
    const data = await response.json();
    const testSetNames = data.testbatch.testsets.map((testset) => testset.name);
    setResults(testSetNames);
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
    // call fetch data or any other search function here
    // using the current values of searchTerm and filter
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
        <li key={result}>{result}</li>
      ))}
    </ul>
  ) : (
    <p className="no-results">No results found.</p>
  )}
</div>
  );
      
} 

export default SearchComponent;

