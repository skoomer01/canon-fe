import React, {useState, useEffect} from "react"
import TestBatch from "../components/TestBatch";
import BranchCombobox from "../components/branchSelectionCb";
function OverViewPage(){
    const [selectedBranchId, setSelectedBranchId] = useState(null);

    useEffect(() => {
        <TestBatch selectedBranchId={selectedBranchId}/>
      }, [selectedBranchId]);
    const handleBranchSelect = (branchId) => {
        setSelectedBranchId(branchId);
      };

    return (
        <div>  
            <BranchCombobox onSelectBranch={handleBranchSelect} />
            <TestBatch selectedBranchId={selectedBranchId}/>
        </div>
    );
}
export default OverViewPage;    