import React, { useEffect, useState } from "react";
import companyDescriptionDataApi from "../services/CompanyDescriptionDataApi";

const CompanyDescription = ({ symbol }) => {
  const [companyInfo, setCompanyInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await companyDescriptionDataApi(symbol);
      setCompanyInfo(data);
    };
    fetchData();
  }, [symbol]);

  const {
    company_information: companyDescription,
    industry_position: companyPosition,
  } = companyInfo;

  return (
    <div
      style={{
        width: "70vw",
        margin: "0 auto",
        justifyContent: "center",
      }}>
      <p></p>
      <h3>AI Company Description </h3>
      <p>{companyDescription}</p>
      <h3>Industry Position</h3>
      <p>{companyPosition}</p>
    </div>
  );
};

export default CompanyDescription;
