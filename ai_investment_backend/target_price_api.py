import os

from flask import Flask, jsonify
import json
from urllib.request import urlopen
import certifi
import pytest

# API客户端
def get_price_target(symbol, api_key):
    url = f"https://financialmodelingprep.com/api/v4/price-target?symbol={symbol}&apikey={api_key}"
    response = urlopen(url, cafile=certifi.where())
    data = response.read().decode("utf-8")
    return json.loads(data)

# Flask应用
app = Flask(__name__)

# API Key
API_KEY = os.getenv("API_KEY")

@app.route('/price-target/<symbol>')
def price_target(symbol):
    data = get_price_target(symbol, API_KEY)
    return jsonify(data)

# 测试用例
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_price_target(client):
    # 测试时使用硬编码的API密钥
    symbol = 'AAPL'
    response = client.get(f'/price-target/{symbol}')
    assert response.status_code == 200
    assert b'"symbol":"AAPL"' in response.data

    # 取出来的数据在response里
    print(response.data.decode('utf-8'))

# 测试运行器
if __name__ == '__main__':
    app.run(debug=True)
