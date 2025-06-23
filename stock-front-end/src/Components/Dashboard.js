import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import baseURL from '../http';
import PieChartView from './Charts/PieChartView';
import { getCurrentUser } from './utils/auth';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from './DashboardComponents/Sidebar';
import MainContent from './DashboardComponents/MainContent';
import { generateMockHistory } from './DashboardComponents/generateMockhistory';
import InvestModal from './Invest/InvestModal';

const socket = io('http://localhost:5000');

function Dashboard({isInvestModalOpen = false, onClose}) {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  

  const user = getCurrentUser();
  const token = localStorage.getItem("token");

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${baseURL}portfolio/${user?.id}`, {headers: {Authorization: `Bearer ${token}`}});
      setPortfolio(res.data);
      if (!selectedAssetId && res.data?.holdings?.length > 0) {
        setSelectedAssetId(res.data.holdings[0].id);
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

  const handleSelectAsset = (assetId) => {
    setSelectedAssetId(assetId);
  };

  // useMemo ensures this isn't recalculated on every render unless the dependencies change
  const selectedAsset = useMemo(() => {
    return portfolio?.holdings.find(asset => asset.id === selectedAssetId);
  }, [portfolio?.holdings, selectedAssetId]);

  return (
    <div className="dashboard-layout">
      <Sidebar
        portfolio={portfolio}
        selectedAssetId={selectedAssetId}
        onSelectAsset={handleSelectAsset}
      />
      <MainContent
        selectedAsset={selectedAsset}
        portfolio={(portfolio)}
      />
      <InvestModal
        isOpen={isInvestModalOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default Dashboard;
