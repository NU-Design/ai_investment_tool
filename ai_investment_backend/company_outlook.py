import requests


def get_company_outlook(symbol, api_key):
    url = f"https://financialmodelingprep.com/api/v4/company-outlook?symbol={symbol}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to retrieve data: {response.status_code}"}
