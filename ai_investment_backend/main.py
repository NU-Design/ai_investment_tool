from glob import escape
from flask import Flask, request, jsonify
from ai_pipline import store_data_in_db, query_data_in_db
from company_outlook import get_company_outlook
from company_social_sentiment import get_social_sentiment_data
from company_info import get_company_info_data
from company_news import get_company_news_data
from target_price_api import get_price_target
from analyst_estimate_api import get_analyst_estimate
import os
from dotenv import load_dotenv
from info_aggregatpr import generate_all_company_data


app = Flask(__name__)


@app.post("/company/<company_symbol>")
def update_company(company_symbol):
    store_data_in_db(company_symbol)
    return f"Updating the company data for {escape(company_symbol)}"


@app.post("/company_report")
def retrieve_company_report():
    data = request.get_json()
    company_symbol = data.get('company_symbol')
    query_data = data.get('query')
    #in quarter 4, year 2023, Earnings Conference Call how MSFT helping customer use the breadth and depth of Microsoft Cloud. 
    #"-in quarter 4, year 2023, how LinkedIn's revenue and detail --give everything about linkedin  ----do not give me the name of people just talk about the event --- give some number to supoort answer"
    report = query_data_in_db(query_data)

    #query_data_in_db("-in quarter 4, year 2023, Earnings Conference Call how MSFT helping customer use the breadth and depth of Microsoft Cloud. ----do not give me the name of people just talk about the event --- give some number to supoort answer")
    return jsonify({"message": f"Retrieving the company report for {company_symbol}", "report": report})



@app.post("/request_info")
def request_info():
    return f"Requsting the info."


@app.route("/")
def index():
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    company_symbol = "AAPL"
    # Good functinos
    # return get_company_news_data(company_symbol)
    # return get_company_outlook(company_symbol, FMP_API_KEY)
    # return get_company_info_data(company_symbol)
    # return get_social_sentiment_data(company_symbol, FMP_API_KEY)
    # return get_price_target(company_symbol, FMP_API_KEY)
    # return get_analyst_estimate(company_symbol, FMP_API_KEY)
   
    return generate_all_company_data(company_symbol, FMP_API_KEY)

@app.route("/hello/<word>")
def hello(word):
    return f"Company: {escape(word)}"
