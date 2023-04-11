import React from 'react';

const RowsOfColumns = () => {
  const createColumns = () => {
    let columns = [];
    for (let i = 1; i <= 4; i++) {
      columns.push(
        <div className="col-md-3" key={`column-${i}`}>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title"> </h5>
              <p className="card-text">{i}</p>
              <a href="./testdetailspage" className="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      );
    }
    return columns;
  };

  const createRows = () => {
    let rows = [];
    for (let i = 1; i <= 6; i++) {
      rows.push(
        <div className="row mb-4" key={`row-${i}`}>
          {createColumns()}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="container">
      {createRows()}
    </div>
  );
};

export default RowsOfColumns;
