import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyChart from "../modules/CompanyChart";
import { getOneCompanyQuotes } from "../services/CompanyDataApi";

import Box from "@mui/material/Box"; // Import Box from MUI

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
    <Box sx={{ padding: 2 }}>
      {" "}
      {/* Use Box to wrap your content with some padding */}
      <p> </p>
      <ChatbotComponent />
      <h1>{companyName}</h1>
      <Box sx={{ marginY: 2 }}>
        {" "}
        {/* Separate chart and news list with margin */}
        <CompanyChart companySymbol={symbol} />
      </Box>
      <Box sx={{ marginY: 2 }}>
        {" "}
        {/* Additional separation for clarity */}
        <CompanyNewsHeadlineList company_symbol={symbol} />
      </Box>
      <ChatbotComponent />
    </Box>
  );
};

export default CompanyPage;
