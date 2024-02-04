import React, { useEffect, useState } from 'react';
import companyDescriptionDataApi from '../services/CompanyDescriptionDataApi';

const CompanyDescription = ({ symbol }) => {
    const [companyInfo, setCompanyInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await companyDescriptionDataApi(symbol);
            setCompanyInfo(data);
        };
        fetchData();
    }, [symbol]);

    const { company_information: companyDescription, industry_position: companyPosition } = companyInfo;

    return (
        <div style={{
            width: "75%", 
            margin: "3em"
        }}>
            <h3>Company Description</h3>
            <p>{companyDescription}</p>
            <h3>Company Position</h3>
            <p>{companyPosition}</p>
        </div>
    );
};

export default CompanyDescription;
