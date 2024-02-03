import requests

def get_company_news_data(company_symbol):
    years = [2023, 2022]
    all_data = []

    for year in years:
        url = f"https://backend.ymyc.ai/api/news/company/{company_symbol}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            all_data.extend(data)
        else:
            print(f"Failed to retrieve data for year {year}: {response.status_code}")
    return all_data

