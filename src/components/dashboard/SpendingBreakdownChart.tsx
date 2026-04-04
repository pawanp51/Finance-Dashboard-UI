"use client";

import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinanceStore } from '@/store/useFinanceStore';

const COLORS = ['#2563eb', '#9333ea', '#dc2626', '#16a34a', '#ca8a04', '#475569'];

export const SpendingBreakdownChart = () => {
  const { transactions } = useFinanceStore();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const categoryMap: Record<string, number> = {};
    let total = 0;

    expenses.forEach(tx => {
      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
      total += tx.amount;
    });

    return Object.entries(categoryMap)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(0) + '%'
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const totalSpent = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Spending Breakdown</h3>
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mt-1">Category Allocation</p>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : [{ name: 'Empty', value: 1, percentage: '100%' }]}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {(data.length > 0 ? data : [{ name: 'Empty', value: 1 }]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={data.length > 0 ? COLORS[index % COLORS.length] : '#f3f4f6'} />
              ))}
            </Pie>
            {data.length > 0 && <Tooltip
              formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Amount']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />}
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-gray-900">
            ${totalSpent >= 1000 ? (totalSpent / 1000).toFixed(1) + 'k' : totalSpent}
          </p>
          <p className="text-xs text-gray-500 font-medium uppercase mt-1">Spent</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {data.slice(0, 3).map((item, index) => (
          <div key={item.name} className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="font-medium text-gray-700 capitalize">{item.name.toLowerCase()}</span>
            </div>
            <span className="font-bold text-gray-900">{item.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
