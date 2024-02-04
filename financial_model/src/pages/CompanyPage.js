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
      try {
        const data = await getOneCompanyQuotes(symbol);
        setCompanyData(data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
        setCompanyData([]); // Set to empty array or any error state you prefer
      }
    };
    fetchCompanyData();
  }, [symbol]);
  if (!companyData) {
    return <div>Loading...</div>; // Or any other loading state
  }

  console.log("dataaa", companyData);
  const companyName = symbolToCompanyName[symbol] || symbol;
  const lastData = companyData[companyData.length - 1];
  const changeColor = lastData.change > 0 ? "#008000" : "red";
  const containerStyle = {
    alignItems: "center", // Align items vertically in the center
    justifyContent: "center", // Center items horizontally
  };

  const dataContainerStyle = {
    display: "flex",
    // flexDirection: "column", // Stack the paragraphs vertically
  };

  const headerStyle = {
    flex: 1, // Make the header flexible to center it
    textAlign: "center", // Ensure text is centered if it wraps
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {/* Left 2/3 content */}
      <div
        style={{
          flex: 3,
          overflowY: "auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <ChatbotComponent companySymbol={symbol} />
        <div style={containerStyle}>
          <h1 style={headerStyle}>{companyName}</h1>
          <div style={dataContainerStyle}>
            <p style={{ color: changeColor, marginLeft: 20 }}>
              {" "}
              High: {lastData.high}
            </p>
            <p style={{ color: changeColor, marginLeft: 20 }}>
              {" "}
              Low: {lastData.low}
            </p>
            <p style={{ color: changeColor, marginLeft: 20 }}>
              {" "}
              Change: {lastData.change}
            </p>
            <p style={{ marginLeft: 20 }}>
              {" "}
              Change Percent: {lastData.changePercent}
            </p>
            <p style={{ marginLeft: 20 }}> Adj Close: {lastData.adj_close}</p>
            <p style={{ marginLeft: 20 }}> Volume: {lastData.volume}</p>
          </div>
        </div>
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
        {symbol && <ChatbotComponent companySymbol={symbol} />}
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
