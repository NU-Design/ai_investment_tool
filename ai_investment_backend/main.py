from glob import escape
from flask import Flask
from company_outlook import get_company_outlook
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
    return get_company_outlook()


@app.route("/hello/")
def hello():
    return "Hello, World"
