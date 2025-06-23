// src/components/Sidebar.jsx
import React from 'react';

function Sidebar ({ portfolio, selectedAssetId, onSelectAsset }){
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">My Assets</h2>
      <div className="asset-list">
        {portfolio?.holdings?.map(asset => (
          <div
            key={asset.id}
            className={`asset-item ${asset.id === selectedAssetId ? 'active' : ''}`}
            onClick={() => onSelectAsset(asset.id)}
          >
            <span className="asset-name">{asset.assetName}</span>
            <span className="asset-value">
              ${parseFloat(asset.value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;