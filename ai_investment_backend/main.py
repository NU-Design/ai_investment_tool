from glob import escape
from flask import Flask
from company_outlook import get_company_outlook
from company_social_sentiment import get_social_sentiment_data
from company_info import get_company_info_data
from company_news import get_company_news_data
from target_price_api import get_price_target
from analyst_estimate_api import get_analyst_estimate
import os
from dotenv import load_dotenv


app = Flask(__name__)

@app.post('/company/<company_symbol>')
def update_company(company_symbol):
    return f'Updating the company data for {escape(company_symbol)}'

@app.get('/company_report/<company_symbol>')
def retrieve_company_report(company_symbol):
    return f'Retrieving the company report of {escape(company_symbol)}'

@app.post('/request_info')
def request_info():
    return f'Requsting the info.'

@app.route('/')
def index():
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    company_symbol = "AAPL"
    # Good functinos
    # return get_company_news_data(company_symbol)
    # return get_company_outlook(company_symbol, FMP_API_KEY)
    # return get_company_info_data(company_symbol)
    # return get_social_sentiment_data(company_symbol, FMP_API_KEY)
    # return get_price_target(company_symbol, FMP_API_KEY)

    return get_analyst_estimate(company_symbol, FMP_API_KEY)
   
@app.route('/hello/<word>')
def hello(word):
    return f'Company: {escape(word)}'
