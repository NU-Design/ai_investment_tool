from glob import escape
from flask import Flask


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
    return 'Index Page'

@app.route('/hello/<word>')
def hello(word):
    return f'Company: {escape(word)}'
