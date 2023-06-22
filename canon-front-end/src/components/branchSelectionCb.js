import React, { useState, useEffect } from 'react';
import BranchAPI from "../apis/BranchApi";
import "./branchSelectionCb.css";
function BranchCombobox({ onSelectBranch }) {
    const [branches, setBranches] = useState([]);
    const token = sessionStorage.getItem("token");
    console.log(token); 
    useEffect(() => {
        if(token === null)
        {
            BranchAPI.getAll()
            .then((response) => {
                const branchList = response.data.branchList;
                setBranches(branchList);
                console.log(response.data);
                console.log("Successfully");
            })
            .catch(function (error){
                console.log("failed");
                alert("failed");
            })
        }
        else{
            BranchAPI.getAllPrivate()
            .then((response) => {
                const branchList = response.data.branchList;
                setBranches(branchList);
                console.log(response.data);
                console.log("Successfully");
            })
            .catch(function (error){
                console.log("failed");
                alert("failed");
            })
        }
            
        
    },[]);
    const handleSelectBranch = (event) => {
        const branchId = event.target.value;
        onSelectBranch(branchId);
    };
    return (
      
        <div className='select-container'>
          <select onChange={handleSelectBranch}>
            <option value="0">Select a branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
      );
}

export default BranchCombobox;