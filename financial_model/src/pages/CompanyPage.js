import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyChart from "../modules/CompanyChart";
import { getOneCompanyQuotes } from "../services/CompanyDataApi";
import CompanyDescription from "../modules/CompanyDescription";

import Box from "@mui/material/Box"; // Import Box from MUI
import { Grid } from "@mui/material";

import CompanyNewsHeadlineList from "../modules/NewsDisplay";
import ChatbotComponent from "../Component/ChatBox";

const CompanyPage = () => {
  const { symbol } = useParams();
  const symbolToCompanyName = {
    AAPL: "Apple",
    MSFT: "Microsoft",
    TSLA: "Tesla",
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [companyData, setCompanyData] = useState(null);
  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await getOneCompanyQuotes(symbol);
      setCompanyData(data);
    };
    fetchCompanyData();
  }, [symbol]);

  const companyName = symbolToCompanyName[symbol] || symbol;

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left 2/3 content */}
      <div style={{ flex: 3, overflowY: "auto", padding: "20px" }}>
        <ChatbotComponent companySymbol={symbol} />
        <h1>{companyName}</h1>
        <Box>
          {" "}
          {/* Separate chart and news list with margin */}
          <CompanyChart companySymbol={symbol} />
        </Box>
        <Box>
          {" "}
          {/* Separate chart and news list with margin */}
          <CompanyDescription symbol={symbol} />
        </Box>
        <ChatbotComponent />
      </div>

      {/* Right 1/3 news section */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "20px",
        }}
      >
        <h3>Recent News</h3>
        <CompanyNewsHeadlineList company_symbol={symbol} />
      </div>
    </div>
  );
};

export default CompanyPage;
