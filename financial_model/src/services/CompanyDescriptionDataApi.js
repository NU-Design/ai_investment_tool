import axios from 'axios';

const companyDescriptionDataApi = async (symbol) => {
    const apiUrl = `https://backend.ymyc.ai/api/companies/company_infos/${symbol}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data for symbol:', symbol, error);
        return null;
    }
};

export default companyDescriptionDataApi;
