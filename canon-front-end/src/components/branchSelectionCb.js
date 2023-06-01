    import React, { useState, useEffect } from 'react';
    import BranchAPI from "../apis/BranchApi";
    import "./branchSelectionCb.css";
    function BranchCombobox({ onSelectBranch }) {
        const [branches, setBranches] = useState([]);
        useEffect(() => {
            
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
            
        },[]);
        const handleSelectBranch = (event) => {
            const branchId = event.target.value;
            onSelectBranch(branchId);
        };
        return(
            <select onChange={handleSelectBranch}>
        <option value="0">Select a branch</option>
        {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
            {branch.branchName}
            </option>
        ))}
        </select>
        );
    }

    export default BranchCombobox;