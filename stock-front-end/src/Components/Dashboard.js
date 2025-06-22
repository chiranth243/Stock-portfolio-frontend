import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import baseURL from '../http';
import PieChartView from './Charts/PieChartView';
import { getCurrentUser } from './utils/auth';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const socket = io('http://localhost:5000');

function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState('');
  const user = getCurrentUser();

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${baseURL}portfolio/${user?.id}`);
      setPortfolio(res.data);
      if (!selectedAsset && res.data?.holdings?.length > 0) {
        setSelectedAsset(res.data.holdings[0].assetName);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    socket.on('portfolioUpdate', () => {
      console.log('[socket] portfolio updated!');
      fetchPortfolio();
    });
    return () => socket.off('portfolioUpdate');
  }, [user?.id]);

  const selectedData = portfolio?.holdings.filter(h => h.assetName === selectedAsset);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>📊 My Asset Portfolio</h2>

      {portfolio ? (
        <>
          <div className={styles.assetSelectBox}>
            <label>Select Asset: </label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}>
              {portfolio.holdings.map((h, i) => (
                <option key={i} value={h.assetName}>{h.assetName}</option>
              ))}
            </select>
          </div>

          <div className={styles.chartWrapper}>
            <h3 style={{ textAlign: 'center', margin: '30px 0' }}>📈 Performance Overview</h3>
            {selectedData && selectedData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[...Array(10).keys()].map(i => ({
                  time: `${i + 1}m ago`,
                  value: selectedData[0].value * (1 + (Math.random() - 0.5) / 10) // mock trend
                }))}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className={styles.chartSection}>
            <h3 style={{ textAlign: 'center', margin: '40px 0 20px' }}>
              🧁 Portfolio Allocation
            </h3>
            <PieChartView
              data={portfolio.holdings.map(item => ({
                ...item,
                value: Number(item.value)
              }))}
            />
          </div>
        </>
      ) : (
        <p>Loading portfolio...</p>
      )}
    </div>
  );
};

export default Dashboard;
