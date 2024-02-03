from glob import escape
from flask import Flask

app = Flask(__name__)

@app.post('/company/<company_name>')
def update_company(company_name):
    return f'Updating company: {escape(company_name)}'

@app.get('/company/<company_name>')
def display_company(company_name):
    return f'Company: {escape(company_name)}'

@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello/')
def hello():
    return 'Hello, World'