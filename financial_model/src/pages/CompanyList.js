import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchAllCompaniesInfo from "../services/fetchAllCompaniesInfo";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCompaniesInfo();
      setCompanies(data);
    };
    fetchData();
  }, []);

  return (
    <div className="companyList">
      <h1 style={{ margin: '1em' }}>Company List</h1>
      <table className="table table-hover">
        <thead className="thead table-dark">
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">TAGS</th>
            <th scope="col">ANALYSIS</th>
          </tr>
        </thead>
        <tbody  className="thead">
          {companies.map((company, index) => (
            <tr key={index}>
              <td>{company.company_name}</td>
              <td>
                {
                  company.tags
                  .slice(0, 4)
                  .map((tag) => tag.tag_en)
                  .join(", ")}
              </td>
              <td>
                <Link to={`/${company.company_symbol}`} className="btn btn-dark">
                  {company.company_name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
