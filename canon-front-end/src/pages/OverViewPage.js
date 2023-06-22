import React, { useState, useEffect } from "react";
import TestBatch from "../components/Overview/TestBatch";
import BranchCombobox from "../components/branchSelectionCb";
import { Prev } from "react-bootstrap/esm/PageItem";

function OverViewPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(null);

 

  const handleBranchSelect = (branchId) => {
    setSelectedBranchId(branchId);
    console.log(branchId);
  };


  return (
    <div>
      <BranchCombobox onSelectBranch={handleBranchSelect} />
      <TestBatch selectedBranchId={selectedBranchId} />
    </div>
  );
}

export default OverViewPage;

