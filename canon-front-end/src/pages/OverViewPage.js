import React, { useState, useEffect } from "react";
import TestBatch from "../components/TestBatch";
import BranchCombobox from "../components/branchSelectionCb";

function OverViewPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Your logic to handle the interval here
      // For example, fetch new data or update some state that doesn't affect selectedBranchId
      // For this example, there is no automatic change to selectedBranchId
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleBranchSelect = (branchId) => {
    setSelectedBranchId(branchId);
  };

  return (
    <div>
      <BranchCombobox onSelectBranch={handleBranchSelect} />
      <TestBatch selectedBranchId={selectedBranchId} />
    </div>
  );
}

export default OverViewPage;



// import React, { useState, useEffect } from "react";
// import TestBatch from "../components/TestBatch";
// import BranchCombobox from "../components/branchSelectionCb";

// function OverViewPage() {
//   const [selectedBranchId, setSelectedBranchId] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleBranchSelect(selectedBranchId);
//     }, 1000);

//     return () => {
//       clearInterval(interval); // Clear the interval when the component unmounts
//     };
//   }, [selectedBranchId]);

//   const handleBranchSelect = (branchId) => {
//     setSelectedBranchId(branchId);
//   };

//   return (
//     <div>
//       <BranchCombobox onSelectBranch={handleBranchSelect} />
//       <TestBatch selectedBranchId={selectedBranchId} />
//     </div>
//   );
// }

// export default OverViewPage;


// import React, {useState, useEffect} from "react"
// import TestBatch from "../components/TestBatch";
// import BranchCombobox from "../components/branchSelectionCb";
// function OverViewPage(){
//     const [selectedBranchId, setSelectedBranchId] = useState(null);
    

//     useEffect(() => {
//         <TestBatch selectedBranchId={selectedBranchId}/>
//       }, [selectedBranchId]);
//     const handleBranchSelect = (branchId) => {
//         setSelectedBranchId(branchId);
//       };

//     return (
//         <div>  
//             <BranchCombobox onSelectBranch={handleBranchSelect} />
//             <TestBatch selectedBranchId={selectedBranchId}/>
//         </div>
//     );
// }
// export default OverViewPage;    