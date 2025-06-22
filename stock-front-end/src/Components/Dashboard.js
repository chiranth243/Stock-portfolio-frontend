import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import baseURL from '../http';
import PieChartView from './Charts/PieChartView';
import { getCurrentUser } from './utils/auth';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const user = getCurrentUser();

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${baseURL}portfolio/${user?.id}`);
      setPortfolio(res.data);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  };

  useEffect(() => {
    fetchPortfolio();

    // Listen for portfolio updates
    socket.on('portfolioUpdate', () => {
      console.log('[socket] portfolio updated!');
      fetchPortfolio();
    });

    return () => {
      socket.off('portfolioUpdate'); // cleanup on unmount
    };
  }, [user?.id]);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>My Asset Portfolio</h2>

      {portfolio ? (
        <>
          <div className={styles.summary}>
            <h3>Total Portfolio Value</h3>
            <p className={styles.totalValue}>₹ {portfolio.totalValue}</p>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((item, i) => (
                <tr key={i}>
                  <td data-label="Asset">{item.assetName}</td>
                  <td data-label="Type">{item.assetType}</td>
                  <td data-label="Quantity">{item.quantity}</td>
                  <td data-label="Price">₹ {item.price}</td>
                  <td data-label="Value">₹ {item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.chartSection}>
            <h3 style={{ textAlign: 'center', margin: '40px 0 20px' }}>
              Portfolio Allocation
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