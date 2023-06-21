import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import TokenManager from "../security/TokenManager";
import SearchByCommit from "../components/SearchComponents/SearchByCommit";
import SearchByErrorId from "../components/SearchComponents/SearchByErrorId";
import SearchByVersion from "../components/SearchComponents/SearchByVersion";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  background: "#000",
  borderBottom: "1px solid #fff",
  color: "#fff",
  display: "flex",
  justifyContent: "flex-start",
  fontFamily: "Roboto",
  "& .MuiTabs-indicator": {
    backgroundColor: "#ce93d8", // Set the color for the tab underline here
  },
  
}));


const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: "unset",
  padding: "12px",
  fontSize: "14px",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "#fff",
  "&.Mui-selected": {
    color: "#ce93d8 ",
    
  },
}));

function SearchPage() {
  const [tabValue, setTabValue] = useState(0);
  const isLoggedIn = TokenManager.getAccessToken() !== null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
        <Box>
          <StyledTabs value={tabValue} onChange={handleTabChange}>
            <StyledTab label="Search by Error Id" />
            <StyledTab label="Search by Commit" />
            <StyledTab label="Search by Version" />
          </StyledTabs>
    
          <Box>
            {tabValue === 0 && (
              <div>
                <SearchByErrorId />
              </div>
            )}
            {tabValue === 1 && (
              <div>
                <SearchByCommit />
              </div>
            )}
            {tabValue === 2 && (
              <div>
                <SearchByVersion />
              </div>
            )}
          </Box>
        </Box>
      );
} 

export default SearchPage;
