import os
from flask import Flask, jsonify
import json
import ssl
from urllib.request import urlopen
import certifi
import pytest
from dotenv import load_dotenv

app = Flask(__name__)


# API客户端
def get_analyst_estimate(symbol, api_key):
    url = f"https://financialmodelingprep.com/api/v3/analyst-estimates/{symbol}?apikey={api_key}"
    context = ssl.create_default_context(cafile=certifi.where())
    response = urlopen(url, context=context)
    data = response.read().decode("utf-8")
    return json.loads(data)


# API_KEY='f616cbb6feaa67d70de3f40575e38f6f'
API_KEY = os.getenv("API_KEY")
print(API_KEY)


# Flask应用
@app.route('/analyst_estimates/<symbol>')
def analyst_estimate(symbol):
    # 从环境变量获取API Key\
    data = get_analyst_estimate(symbol, API_KEY)
    return jsonify(data)


# 测试用例
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_analyst_estimate(client):
    symbol = 'AAPL'
    response = client.get(f'/analyst_estimates/{symbol}')
    assert response.status_code == 200
    data = json.loads(response.data.decode('utf-8'))
    assert data[0]['symbol'] == symbol  # 基于返回数据结构可能需要调整

    print(response.data.decode('utf-8'))


# 测试运行器
if __name__ == '__main__':
    app.run(debug=True)
