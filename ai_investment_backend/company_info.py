import requests


def get_company_info_data(info_symbol):
    url = f"https://backend.ymyc.ai/api/companies/company_infos/{info_symbol}"
    response = requests.get(url)
    data = {}
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Failed to retrieve data, response: {response.json()}")
    return data
