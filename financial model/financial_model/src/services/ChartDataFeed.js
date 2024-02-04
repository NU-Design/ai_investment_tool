import {
  Datafeed,
  DatafeedSubscribeCallback,
  Period,
  SymbolInfo,
} from '@klinecharts/pro';
import { KLineData } from 'klinecharts';
import { getOneCompanyQuotes, getSearchCompanyReq } from './CompanyDataApi';
import { GetSearchCompanyResponseModel } from '../models/CompanyModel';

export default class ChartDatafeed {
  constructor(params, navigate) {
    this.params = params;
    this.navigate = navigate;
  }

  async searchSymbols(search) {
    const matchedCompanies = await getSearchCompanyReq({ keyword: search || '' });

    return matchedCompanies.map((matchedCompanyInfo) => {
      return {
        exchange: 'US',
        ticker: matchedCompanyInfo.company_symbol,
      };
    });
  }

  async getHistoryKLineData(symbolInfo, period, from, to) {
    const { stockSymbol: currentPageSymbol } = this.params;
    if (symbolInfo.ticker !== currentPageSymbol) {
      this.navigate(`/stock/${symbolInfo.ticker}`);
      return [];
    }

    const data = await getOneCompanyQuotes({ symbol: symbolInfo.ticker });

    return data.map((item) => ({
      close: item.close,
      high: item.high,
      low: item.low,
      open: item.open,
      timestamp: new Date(item.record_time).getTime(),
      volume: parseInt(item.volume, 10),
    }));
  }
    
  subscribe(symbol, period, callback) {
  
  }

  unsubscribe(symbol, period) {
        
  }
}
