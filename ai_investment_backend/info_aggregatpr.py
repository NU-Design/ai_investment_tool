from company_outlook import get_company_outlook
from company_social_sentiment import get_social_sentiment_data
from company_info import get_company_info_data
from company_news import get_company_news_data
from target_price_api import get_price_target
from analyst_estimate_api import get_analyst_estimate

from datetime import datetime 
from earnings_call import get_earnings_call_data
import json
import uuid


def generate_all_company_data(company_symbol, api_key):
    company_data_dict = {}

    news = get_company_news_data(company_symbol)
    outlook = get_company_outlook(company_symbol, api_key)
    info = get_company_info_data(company_symbol)
    social_sentiment_data =  get_social_sentiment_data(company_symbol, api_key)
    price_target = get_price_target(company_symbol, api_key)
    earnings = get_earnings_call_data(company_symbol, api_key)
    analyst_estimate = get_analyst_estimate(company_symbol, api_key)

    company_name_tag = "company_name"
    if info and company_name_tag in info:
        company_data_dict[company_name_tag] = info[company_name_tag]

    company_data_dict["news"] = news
    company_data_dict["outlook"] = outlook
    company_data_dict["info"] = info
    company_data_dict["social_sentiment_data"] = social_sentiment_data
    company_data_dict["price_target"] = price_target
    company_data_dict["earnings"] = earnings
    company_data_dict["analyst_estimate"] = analyst_estimate

    return _generate_file(company_symbol, company_data_dict)

def _generate_file(company_symbol, company_data):
    # generate file name
    date_str = datetime.now().strftime("%Y-%m-%d")
    unique_id = uuid.uuid4().hex
    filename = f"./data/{date_str}_{unique_id}_{company_symbol}.json"

    # save to json file
    with open(filename, "w") as f:
        json.dump(company_data, f)

    return filename