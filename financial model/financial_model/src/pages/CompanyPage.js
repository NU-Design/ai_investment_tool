import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyChart from '../modules/CompanyChart';
import CompanyDescription from '../modules/CompanyDescription';
import { getOneCompanyQuotes } from '../services/CompanyDataApi';

const CompanyPage = () => {
    const { symbol } = useParams();
    const [companyData, setCompanyData] = useState(null);
    
    useEffect(() => {
        const fetchCompanyData = async() => {
            setCompanyData = await getOneCompanyQuotes(symbol);
        }
        fetchCompanyData();
    }, [symbol]);

    return (
        <div>
            <h1>{companyData.companyInfo.company_name}</h1>
            <CompanyChart />
            <div>
                <h1>Company Analysis</h1>
                <CompanyDescription />
            </div>
        </div>
    )
}

export default CompanyPage;