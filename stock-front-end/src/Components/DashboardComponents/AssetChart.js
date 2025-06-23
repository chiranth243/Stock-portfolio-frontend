// src/components/AssetChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, // Important for the background fill
  Legend,
} from 'chart.js';
import { generateMockHistory } from './generateMockhistory';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AssetChart ({ selectedAsset }){
    const historicalData = selectedAsset
    ? generateMockHistory(Number(selectedAsset.price), new Date(selectedAsset.date))
    : [];

  const chartData = {
    labels: historicalData?.map(data => data.date),
    datasets: [
      {
        label: `${selectedAsset?.assetName} Price (USD)`,
        data: historicalData?.map(data => data.price),
        fill: true,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: '#3498db',
        tension: 0.4, // Makes the line smoother
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${selectedAsset?.assetName} Price Timeline`,
        font: { size: 16 }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AssetChart;