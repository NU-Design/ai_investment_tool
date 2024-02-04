from glob import escape
from flask import Flask
from merge_json import merge_and_save_data
from earnings_call import get_earnings_call_data
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


@app.post("/company/<company_name>")
def update_company(company_name):
    return f"Updating company: {escape(company_name)}"


@app.get("/company/<company_name>")
def display_company(company_name):
    return f"Company: {escape(company_name)}"


@app.route("/")
def index():
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    company_symbol = "MSFT"
    return merge_and_save_data(company_symbol, FMP_API_KEY)
    # return get_earnings_call_data(company_symbol, FMP_API_KEY)


@app.route("/hello/")
def hello():
    return "Hello, World"
