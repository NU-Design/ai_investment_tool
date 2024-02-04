import axios from 'axios';
import symbols from '../symbol.json';

const fetchCompanyInfo = async (symbol) => {
    const apiUrl = `https://backend.ymyc.ai/api/companies/company_and_peer_quote/${symbol}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data for symbol:', symbol, error);
        return null;
    }
};

const fetchAllCompaniesInfo = async () => {
    try {
        const companiesPromises = symbols.map(symbol => fetchCompanyInfo(symbol));
        const companies = await Promise.all(companiesPromises);
        return companies;
    } catch (error) {
        console.error('Error fetching data for all symbols:', error);
        return [];
    }
};

export default fetchAllCompaniesInfo;
