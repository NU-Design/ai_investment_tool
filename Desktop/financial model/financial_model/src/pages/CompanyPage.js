import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyChart from "../modules/CompanyChart";
import CompanyDescription from "../modules/CompanyDescription";
import { getOneCompanyQuotes } from "../services/CompanyDataApi";

const CompanyPage = () => {
  const { symbol } = useParams();
  const symbolToCompanyName = {
    AAPL: "Apple",
    MSFT: "Microsoft",
    TSLA: "Tesla",
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
      <div>
        <h1>Company Analysis</h1>
        <CompanyDescription />
      </div>
    </div>
  );
};

export default CompanyPage;
