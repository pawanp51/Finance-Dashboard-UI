"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { mockTransactions } from '@/mocks/data';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const BalanceTrendChart = () => {
  const { transactions } = useFinanceStore();

  const chartData = useMemo(() => {
    // 1. Filter mock transactions to only those BEFORE April 2026
    const historicalMockData = mockTransactions.filter(tx => new Date(tx.date) < new Date('2026-04-01'));
    
    // 2. Separate user's pre-April data and April data
    const preAprilTransactions = transactions.filter(tx => new Date(tx.date) < new Date('2026-04-01'));
    const aprilTransactions = transactions.filter(tx => new Date(tx.date) >= new Date('2026-04-01'));

    // 3. Calculate "Seed Offset" so that mock history ends exactly where user's April begins
    const userPreAprilBalance = preAprilTransactions.reduce((acc, tx) => tx.type === 'INCOME' ? acc + tx.amount : acc - tx.amount, 0);
    const mockFinalBalance = historicalMockData.reduce((acc, tx) => tx.type === 'INCOME' ? acc + tx.amount : acc - tx.amount, 0);
    const offset = userPreAprilBalance - mockFinalBalance;

    // 4. Combine and transform
    const monthlyData: Record<string, number> = {};
    
    // Process Mock Data with Offset
    let cumulativeMockBalance = 0;
    const sortedMock = [...historicalMockData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    sortedMock.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + date.getFullYear().toString().slice(-2);
      if (tx.type === 'INCOME') cumulativeMockBalance += tx.amount;
      else cumulativeMockBalance -= tx.amount;
      monthlyData[monthYear] = cumulativeMockBalance + offset;
    });

    // Process User April Data (Force Dynamic)
    let cumulativeDynamicBalance = userPreAprilBalance;
    const sortedApril = [...aprilTransactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    sortedApril.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = date.toLocaleString('en-US', { month: 'short' }).toUpperCase() + " " + date.getFullYear().toString().slice(-2);
      if (tx.type === 'INCOME') cumulativeDynamicBalance += tx.amount;
      else cumulativeDynamicBalance -= tx.amount;
      monthlyData[monthYear] = cumulativeDynamicBalance;
    });

    // Handle case where user adds nothing in April yet (still show the point from Mar)
    if (aprilTransactions.length === 0) {
      monthlyData['APR 26'] = userPreAprilBalance;
    }

    // 5. Convert to Recharts array format
    return Object.entries(monthlyData).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Balance Trend</h3>
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mt-1">
            {chartData.length} Month Performance
          </p>
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
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} dy={10} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#111827' }}
              itemStyle={{ color: '#2563eb', fontWeight: 600 }}
              formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Balance']}
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
