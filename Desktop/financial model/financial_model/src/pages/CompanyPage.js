import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyChart from "../modules/CompanyChart";
import ChatBot from "../modules/ChatBot"; // Ensure this is imported correctly once
import { getOneCompanyQuotes } from "../services/CompanyDataApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box"; // Import Box from MUI

import CompanyNewsHeadlineList from "../modules/NewsDisplay";

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
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          position: "fixed", // Changed from 'absolute' to 'fixed' to ensure visibility
          top: 80,
          right: 80,
          margin: "10px",
          backgroundColor: "white",
        }}
      >
        ASK ME
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <ChatBot />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Finish</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyPage;
