// src/components/StatCard.jsx
import React from 'react';

function StatCard({ label, value, className = '' }){
  return (
    <div className={`stat-card ${className}`}>
      <span className="stat-label">{label}</span>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
};

export default StatCard;