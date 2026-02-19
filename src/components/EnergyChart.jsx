import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ 
        background: 'rgba(26, 34, 53, 0.9)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        p: 1.5, 
        borderRadius: 2 
      }}>
        <Typography variant="body2" color="white">{`Time: ${label}`}</Typography>
        {payload.map((p, i) => (
            <Typography key={i} variant="body2" sx={{ color: p.color }}>
                {`${p.name}: ${p.value.toFixed(2)} kW`}
            </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const EnergyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.8rem' }} />
        <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.8rem' }} />
        <Tooltip content={<CustomTooltip />} />
        <Area 
            type="monotone" 
            dataKey="solar" 
            stroke="#22C55E" 
            fillOpacity={1} 
            fill="url(#colorSolar)" 
            name="Solar Generation"
        />
        <Area 
            type="monotone" 
            dataKey="consumption" 
            stroke="#EF4444" 
            fillOpacity={1} 
            fill="url(#colorCons)" 
            name="Consumption"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EnergyChart;
