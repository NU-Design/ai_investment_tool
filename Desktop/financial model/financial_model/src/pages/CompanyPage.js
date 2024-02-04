import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyChart from "../modules/CompanyChart";
import ChatBot from "../modules/ChatBot";
import { getOneCompanyQuotes } from "../services/CompanyDataApi";
import Chatbot from "../modules/ChatBot";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
  // console.log(" bbbb", companyData);
  const companyName = symbolToCompanyName[symbol] || symbol;

  return (
    <div>
      <h1>{companyName}</h1>

      <CompanyChart companySymbol={symbol} />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
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
    </div>
  );
};

export default CompanyPage;
