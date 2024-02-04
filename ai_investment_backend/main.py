from glob import escape
from flask import Flask
from company_outlook import get_company_outlook
import os
from dotenv import load_dotenv


app = Flask(__name__)

@app.post('/company/<company_symbol>')
def update_company(company_symbol):
    return f'Updating the company data for {escape(company_symbol)}'

@app.get('/company_report/<company_symbol>')
def retrieve_company_report(company_symbol):
    return f'Retrieving the company report of {escape(company_symbol)}'

@app.post('/company_info/<company_symbol>')
def request_company_info(company_symbol):
    return f'Requsting the company info for {escape(company_symbol)}'

@app.route('/')
def index():
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    company_symbol = "APPL"
    return get_company_outlook(company_symbol, FMP_API_KEY)

@app.route('/hello/<word>')
def hello(word):
    return f'Company: {escape(word)}'
