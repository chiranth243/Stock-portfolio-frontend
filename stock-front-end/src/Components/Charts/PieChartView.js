import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#AF19FF', '#FF4560', '#26A69A', '#FFA726',
  '#AB47BC', '#66BB6A', '#D4E157', '#FF7043'
];

// Custom label to show asset name and percentage
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#222"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={13}
      fontWeight="bold"
      style={{ textShadow: '0 1px 2px #fff' }}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

function PieChartView({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#888', fontSize: 18 }}>No data to display</span>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: 400,
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      padding: 16,
      marginBottom: 30
    }}>
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#888" floodOpacity="0.15" />
            </filter>
          </defs>
          <Pie
            data={data}
            dataKey="value"
            nameKey="assetName"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={60}
            labelLine={false}
            label={props =>
              renderCustomizedLabel({ ...props, name: data[props.index].assetName })
            }
            filter="url(#shadow)"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, boxShadow: '0 2px 8px #eee' }}
            formatter={(value, name, props) => [`₹ ${value}`, 'Value']}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              fontSize: 14,
              fontWeight: 500,
              marginTop: 12
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartView;