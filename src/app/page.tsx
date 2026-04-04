"use client";

import { useFinanceStore } from '@/store/useFinanceStore';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart';
import { SpendingBreakdownChart } from '@/components/dashboard/SpendingBreakdownChart';
import { AddTransactionModal } from '@/components/transactions/AddTransactionModal';
import Link from 'next/link';
import { useState } from 'react';
import { Download, ShoppingBag, Banknote, Coffee, Briefcase, Car } from 'lucide-react';

export default function Home() {
  const { role, transactions } = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
    return type === 'INCOME' ? `+${formatted}` : `-${formatted}`;
  };

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
      case 'electronics': return <ShoppingBag size={18} className="text-orange-700" />;
      case 'investments': return <Banknote size={18} className="text-blue-700" />;
      case 'professional': return <Briefcase size={18} className="text-amber-700" />;
      case 'lifestyle':
      case 'food':
      case 'dining': return <Coffee size={18} className="text-red-700" />;
      case 'transportation': return <Car size={18} className="text-gray-700" />;
      default: return <Briefcase size={18} className="text-blue-700" />;
    }
  };

  const getIconBg = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
      case 'electronics': return 'bg-orange-50';
      case 'investments': return 'bg-blue-50';
      case 'professional': return 'bg-amber-50';
      case 'lifestyle':
      case 'food':
      case 'dining': return 'bg-red-50';
      case 'transportation': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Wealth Overview</h2>
            {role === 'VIEWER' && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold tracking-wider rounded uppercase flex-shrink-0">
                Read Only
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-500">
            {role === 'ADMIN' ? 'Administrator access active. Your portfolio is up 2.4% this month.' : 'Welcome back. Your portfolio is up 2.4% this month.'}
          </p>
        </div>
        {role === 'ADMIN' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-[#0a3296] hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold shadow-sm transition-colors flex items-center justify-center text-sm"
          >
            <span className="mr-2 text-lg leading-none">+</span> Add Transaction
          </button>
        )}
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="h-full">
          <SpendingBreakdownChart />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Link href="/transactions" className="flex-1 md:flex-none text-center text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors">
              View All Activity
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex flex-row flex-wrap sm:flex-nowrap justify-between items-start sm:items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full flex items-center justify-center ${getIconBg(tx.category)}`}>
                  {getIconForCategory(tx.category)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{tx.description}</h4>
                  <p className="text-xs text-gray-500 font-medium capitalize flex items-center mt-0.5 truncate">
                    <span>{tx.category.toLowerCase()}</span>
                    <span className="mx-1.5 inline-block w-1 h-1 rounded-full bg-gray-300 flex-shrink-0"></span>
                    <span className="flex-shrink-0">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end w-full sm:w-auto">
                <p className={`font-bold pb-0.5 ${tx.type === 'INCOME' ? 'text-blue-600' : 'text-red-700'}`}>
                  {formatCurrency(tx.amount, tx.type)}
                </p>
                {tx.type === 'INCOME' ? (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Cleared</p>
                ) : (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Processed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
