// src/components/MainContent.jsx
import React, { useMemo } from 'react';
import StatCard from './StatCard';
import AssetChart from './AssetChart';

function MainContent ({ selectedAsset, portfolio }){
  // Calculate percentage change based on our mock historical data
  const percentageChange = useMemo(() => {
    if (!selectedAsset || !selectedAsset.historicalData || selectedAsset.historicalData.length < 2) {
      return 0;
    }
    const initialPrice = selectedAsset.historicalData[0].price;
    const currentPrice = selectedAsset.price;
    return ((currentPrice - initialPrice) / initialPrice) * 100;
  }, [selectedAsset]);

  if (!selectedAsset) {
    return <div className="main-content">Please select an asset from the list.</div>;
  }
  
  const isPositive = percentageChange >= 0;

  console.log(selectedAsset)

  return (
    <main className="main-content">
      <div className="stats-container">
        <StatCard 
          label="Total Portfolio Value" 
          value={`$${parseFloat(portfolio?.totalValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
        />
        {/* These are example stats. You can replace them with real data. */}
        <StatCard label="Day's Gain" value="+$152.40" className="positive-stat" />
        <StatCard label="Overall Return" value="+8.21%" className="positive-stat" />
      </div>

      <h1 className="asset-title">Details for {selectedAsset.assetName}</h1>

      <div className="details-grid">
        <div className="chart-panel">
          <AssetChart 
            selectedAsset={selectedAsset}
          />
        </div>
        <div className="metrics-panel">
          <div className="metric-item">
            <span className="metric-label">Holding Value</span>
            <span className="metric-value">
              ${parseFloat(selectedAsset.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Current Price</span>
            <span className="metric-value">${parseFloat(selectedAsset.price).toFixed(2)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Quantity</span>
            <span className="metric-value">{parseFloat(selectedAsset.quantity)}</span>
          </div>
           <div className="metric-item">
            <span className="metric-label">Change (Timeline)</span>
            <span className={`metric-value ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '▲' : '▼'} {percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;