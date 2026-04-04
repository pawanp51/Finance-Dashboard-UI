"use client";

import React, { useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { mockTransactions } from '@/mocks/data';
import { ArrowUpRight, ArrowDownRight, Edit2, Wallet } from 'lucide-react';

export const SummaryCards = () => {
  const { transactions } = useFinanceStore();

  const { income, expense, balance } = useMemo(() => {
    // 1. Calculate Mock Baseline (Before April 2026)
    const mockBaseline = mockTransactions
      .filter(tx => new Date(tx.date) < new Date('2026-04-01'))
      .reduce((acc, tx) => tx.type === 'INCOME' ? acc + tx.amount : acc - tx.amount, 0);

    // 2. Reduce store transactions
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === 'INCOME') {
          acc.income += tx.amount;
          acc.balance += tx.amount;
        } else {
          acc.expense += tx.amount;
          acc.balance -= tx.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: mockBaseline }
    );
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Balance</h3>
          <div className="flex space-x-2 text-gray-400">
            <Edit2 size={16} className="cursor-pointer hover:text-gray-600" />
            <Wallet size={16} className="cursor-pointer hover:text-blue-600 text-blue-500" />
          </div>
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(balance)}</p>
          <p className="text-sm text-emerald-600 flex items-center font-medium">
            <ArrowUpRight size={16} className="mr-1" />
            12.5% increase
          </p>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Monthly Income</h3>
          <ArrowDownRight size={18} className="text-blue-500" />
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(income)}</p>
          <p className="text-sm text-gray-500 font-medium">
            Expected: {formatCurrency(income * 0.96)}
          </p>
        </div>
      </div>

      {/* Monthly Expenses Card */}
      <div className="bg-red-50/30 rounded-2xl p-6 shadow-sm border border-red-100 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-red-400"></div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Monthly Expenses</h3>
          <ArrowUpRight size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-900 mb-2">{formatCurrency(expense)}</p>
          <p className="text-sm text-red-600 font-medium flex items-center">
            <span className="text-red-500 mr-2 text-lg leading-none">⚠</span>
            8% of budget remaining
          </p>
        </div>
      </div>
    </div>
  );
};
