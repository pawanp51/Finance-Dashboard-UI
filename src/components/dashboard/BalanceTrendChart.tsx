"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'JAN', value: 18000 },
  { name: 'FEB', value: 19500 },
  { name: 'MAR', value: 19000 },
  { name: 'APR', value: 21000 },
  { name: 'MAY', value: 23000 },
  { name: 'JUN', value: 24500 },
];

export const BalanceTrendChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Balance Trend</h3>
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mt-1">6-Month Performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
            Total Assets
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} dy={10} />
            <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#111827' }}
              itemStyle={{ color: '#2563eb', fontWeight: 600 }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
