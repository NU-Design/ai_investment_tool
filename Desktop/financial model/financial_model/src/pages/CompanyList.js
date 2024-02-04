import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchAllCompaniesInfo from '../services/fetchAllCompaniesInfo'; 

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
      <table className="companyTable">
        <thead className="companyTableHead">
          <tr>
            <th>NAME</th>
            <th>TAGS</th>
            <th>ANALYSIS</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index} className="companyTableData">
              <td>{company.companyInfo.company_name}</td>
              <td>{company.companyInfo.tags.slice(0, 4).map(tag => tag.tag_en).join(", ")}</td>
              <td><Link to={`/${company.companyInfo.company_name}`}>{company.companyInfo.company_name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
