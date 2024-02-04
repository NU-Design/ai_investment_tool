import requests


def get_social_sentiment_data(symbol, api_key):
    data = {}
    url = f"https://financialmodelingprep.com/api/v4/historical/social-sentiment?symbol={symbol}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Failed to retrieve data, response: {response.status_code}")
    return data
