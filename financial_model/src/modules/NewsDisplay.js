import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCompanyNews } from "../services/NewsData";

const CompanyNewsHeadline = ({ news }) => {
  // Ensure console.log does not interfere with the functionality
  console.log("new url:", news.url);
  return (
    <li>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white" }}
      >
        {news.title}
      </a>
    </li>
  );
};

const CompanyNewsHeadlineList = ({ company_symbol }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const data = await getCompanyNews(company_symbol);
      setNewsData(data);
    };
    fetchNewsData();
  }, [company_symbol]);

  return (
    <div style={{ width: "70vw" }}>
      <ul>
        {newsData.map((newsItem, index) => (
          <CompanyNewsHeadline key={index} news={newsItem} />
        ))}
      </ul>
    </div>
  );
};

export default CompanyNewsHeadlineList;
