import React, { useState, useEffect } from 'react';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('errorid');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`api`);
      const data = await response.json();
      const testSetNames = data.testbatch.testsets.map((testset) => testset.name);
      setResults(testSetNames);
    }

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

  return (
    <div>
      <label htmlFor="filter">Filter by:</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="errorid">Error Id</option>
        <option value="version">Version</option>
        <option value="commitSHAL">Commit SHAL</option>
      </select>
      <br />
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" value={searchTerm} onChange={handleSearchTermChange} />
      <br />
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchComponent;
