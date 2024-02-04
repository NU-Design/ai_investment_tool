import requests


def get_earnings_call_data(symbol, api_key):
    years = [2023, 2022]
    all_data = []

    for year in years:
        url = f"https://financialmodelingprep.com/api/v4/batch_earning_call_transcript/{symbol}?year={year}&apikey={api_key}"
        print(url)
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            all_data.extend(data)
        else:
            print(f"Failed to retrieve data for year {year}: {response.status_code}")
    return all_data
