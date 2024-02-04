from earnings_call import get_earnings_call_data
from company_outlook import get_company_outlook


def merge_earnings_and_outlook(symbols, api_key):
    merged_data = []
    for symbol in symbols:
        earnings_data = get_earnings_call_data(symbol, api_key)
        outlook_data = get_company_outlook(symbol, api_key)

        # 根据需要合并数据
        merged_entry = {
            "symbol": symbol,
            "earnings": earnings_data,
            "outlook": outlook_data,
        }

        merged_data.append(merged_entry)

    return merged_data
