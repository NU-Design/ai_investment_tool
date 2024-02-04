from datetime import datetime  # 这里导入的是正确的
from earnings_call import get_earnings_call_data
from company_outlook import get_company_outlook
import json
import uuid


def merge_and_save_data(symbol, api_key):
    # 获取数据
    earnings_data = get_earnings_call_data(symbol, api_key)
    company_outlook_data = get_company_outlook(symbol, api_key)

    # 合并数据
    merged_data = {"earnings": earnings_data, "company_outlook": company_outlook_data}

    # 生成文件名
    date_str = datetime.now().strftime("%Y-%m-%d")
    unique_id = uuid.uuid4().hex
    filename = f"./data/{date_str}_{unique_id}_{symbol}.json"

    # 保存为 JSON 文件
    with open(filename, "w") as f:
        json.dump(merged_data, f)

    return filename  # 返回文件名以供参考
