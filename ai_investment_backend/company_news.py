import requests

def get_company_news_data(company_symbol):

    url = f"https://backend.ymyc.ai/api/news/company/{company_symbol}"
    response = requests.get(url)
    data = {}
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Failed to retrieve data, response: {response.response.json()}")

    return data

