import React, { useEffect, useRef } from 'react';
import '@klinecharts/pro/dist/klinecharts-pro.css';
import ChartDataFeed from '../services/ChartDataFeed';
import { KLineChartPro } from '@klinecharts/pro';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const ProKLineChart = ({ companySymbol }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const datafeed = new ChartDataFeed(params, navigate);
    if (containerRef.current) {
      const symbolInfo = {
        exchange: 'US',
        ticker: companySymbol,
      };
      const period_day = { multiplier: 1, timespan: 'Day', text: 'D' };
      new KLineChartPro({
        container: containerRef.current,
        symbol: symbolInfo,
        period: period_day,
        periods: [period_day],
        locale: 'en-US',
        theme: 'dark',
        watermark: '',
        datafeed: datafeed,
      });

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }
  }, [companySymbol, params, navigate]);

  return (
    <div
      ref={containerRef}
      id="container"
          style={{ width: '70vw', height: '70vh' }}
    ></div>
  );
};

export default ProKLineChart;
