"use client";

import React, { useMemo, useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { 
  TrendingUp, 
  ArrowRight,
  Lightbulb,
  CreditCard,
  Flag,
  Edit2,
  Check,
  Percent
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export const InsightCards = () => {
  const { transactions, goals, updateGoal } = useFinanceStore();
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [interestRate, setInterestRate] = useState(5.2);

  // --- Dynamic Analysis Logic ---

  const insightsData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const incomeSize = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
    const expenseSize = expenses.reduce((s, t) => s + t.amount, 0);

    // Peak Expenditure
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    const sortedCategories = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name: name.charAt(0) + name.slice(1).toLowerCase(), value }))
      .sort((a, b) => b.value - a.value);
    
    const peakCategory = sortedCategories[0] || { name: 'N/A', value: 0 };

    // Subscription Audit (Detection Heuristic: similar description in different months)
    // For simplicity here, we'll look for transactions occurring > 1 time for the same description
    const descCount: Record<string, { count: number; total: number; latest: string }> = {};
    transactions.forEach(t => {
      if (!descCount[t.description]) descCount[t.description] = { count: 0, total: 0, latest: t.date };
      descCount[t.description].count++;
      descCount[t.description].total += t.amount;
    });

    const recurring = Object.entries(descCount)
      .filter(([_, data]) => data.count >= 2)
      .map(([desc, data]) => ({
        name: desc,
        amount: data.total / data.count,
        initials: desc.substring(0, 2).toUpperCase(),
        period: 'Monthly' // Assume monthly for this demo
      }))
      .slice(0, 5);

    // Savings Delta (Simple comparison of this month vs last month if we had more history)
    // Mocking the "Last Month" comparison based on current data for interaction
    const monthlySavings = incomeSize - expenseSize;
    const mockLastMonthSavings = (incomeSize * 0.9) - (expenseSize * 1.1); // Mocked for UI delta
    const savingsDelta = ((monthlySavings - mockLastMonthSavings) / Math.abs(mockLastMonthSavings)) * 100;

    return {
      peakCategory,
      categoryStats: sortedCategories.slice(0, 4),
      recurring,
      savingsDelta: savingsDelta.toFixed(0),
      isSavingsBetter: savingsDelta > 0
    };
  }, [transactions]);

  // --- Handlers ---

  const handleUpdateGoal = (name: string) => {
    const val = parseFloat(newGoalTarget);
    if (!isNaN(val) && val > 0) {
      updateGoal(name, val);
      setEditingGoal(null);
    }
  };

  const calculateDebtSavings = () => {
    // Basic calculation showing monthly interest savings
    // assuming a hypothetical $100k debt moved from ~15% to user-defined rate
    const currentRate = 15;
    const loanAmount = 100000;
    const currentInterest = (loanAmount * (currentRate / 100)) / 12;
    const newInterest = (loanAmount * (interestRate / 100)) / 12;
    return Math.round(currentInterest - newInterest);
  };

  const vacationGoal = goals?.vacation || { target: 10000, current: 7500 };
  const goalProgress = (vacationGoal.current / vacationGoal.target) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 1. Dynamic Peak Expenditure */}
      <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[400px]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <TrendingUp size={18} />
             </div>
             <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">PEAK EXPENDITURE</h3>
          </div>
          <div className="px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center">
            <TrendingUp size={16} className={`${insightsData.isSavingsBetter ? 'text-emerald-500 rotate-0' : 'text-red-500'}`} />
            <span className={`font-bold mr-2 ${insightsData.isSavingsBetter ? 'text-emerald-500' : 'text-red-500'}`}>10%</span>
            <span className="text-xs text-gray-500 font-medium">vs Last Month</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{insightsData.peakCategory.name}</h2>
        <div className="flex items-baseline mb-8">
          <p className="text-5xl font-extrabold text-blue-700 tracking-tight">
            ${insightsData.peakCategory.value.toLocaleString()}
          </p>
          <span className="ml-2 text-gray-500 font-medium">this period</span>
        </div>
        
        {/* Dynamic Recharts Bar Chart */}
        <div className="h-40 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insightsData.categoryStats}>
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 text-white px-3 py-1.5 rounded shadow text-[10px] font-bold">
                        ${payload[0].value?.toLocaleString()}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                {insightsData.categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#0a3296' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          Spending in <span className="font-bold text-blue-900">{insightsData.peakCategory.name}</span> is your highest outlier. 
          {insightsData.peakCategory.value > 1000 ? " Consider reviewing large capital expenses in this category." : " Your spending levels are currently well-balanced across categories."}
        </p>
      </div>

      {/* 2. Dynamic Savings Delta */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Percent size={18} />
           </div>
           <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">SAVINGS DELTA</h3>
        </div>
        
        <p className="text-2xl text-gray-900 leading-snug mb-8">
          You saved <span className={`font-semibold ${insightsData.isSavingsBetter ? 'text-emerald-600' : 'text-blue-700'}`}>
            {Math.abs(Number(insightsData.savingsDelta))}% {insightsData.isSavingsBetter ? 'more' : 'less'}
          </span> in this period relative to our projections.
        </p>

        <div className="mt-auto">
          <div className="flex space-x-1 mb-2">
            <div className={`h-2 transition-all duration-500 bg-gray-400 rounded-full ${insightsData.isSavingsBetter ? 'w-1/3' : 'w-1/2'}`}></div>
            <div className={`h-2 transition-all duration-500 bg-blue-700 rounded-full ${insightsData.isSavingsBetter ? 'w-2/3' : 'w-1/2'}`}></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>Projection</span>
            <span>Actual</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Family Vacation Fund */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[300px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">FAMILY VACATION FUND</h3>
          <Flag size={16} className="text-gray-400" />
        </div>
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-3xl font-bold text-gray-900">${vacationGoal.current.toLocaleString()}</p>
            <div className="flex items-center space-x-2 mt-1">
              {editingGoal === 'vacation' ? (
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400">of $</span>
                  <input 
                    type="number" 
                    className="w-20 px-1 text-xs border border-blue-200 rounded outline-none focus:ring-1 focus:ring-blue-300"
                    autoFocus
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateGoal('vacation')}
                  />
                  <button onClick={() => handleUpdateGoal('vacation')} className="text-emerald-500 hover:text-emerald-600">
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-xs font-medium text-gray-500 flex items-center">
                  of ${vacationGoal.target.toLocaleString()} goal
                  <button 
                    onClick={() => { setEditingGoal('vacation'); setNewGoalTarget(vacationGoal.target.toString()); }}
                    className="ml-2 text-gray-300 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 size={10} />
                  </button>
                </p>
              )}
            </div>
          </div>
          <span className="text-2xl font-semibold text-blue-700">{goalProgress.toFixed(0)}%</span>
        </div>

        <div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-6 overflow-hidden flex">
             <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: `${goalProgress}%` }}></div>
          </div>
          <p className="text-xs font-medium text-gray-500 flex items-center">
            <span className="mr-2">✨</span> {goalProgress >= 100 ? "Goal Reached!" : `On track to reach goal by ${new Date(Date.now() + 60*60*24*1000*90).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}`}
          </p>
        </div>
      </div>

      {/* 4. Automated Subscription Audit */}
      <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex items-center space-x-3 mb-6">
           <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <CreditCard size={18} />
           </div>
           <div>
             <h3 className="font-bold text-gray-900">Subscription Audit</h3>
             <p className="text-xs text-gray-500 font-medium mt-0.5">Found {insightsData.recurring.length} potential recurring charges</p>
           </div>
        </div>
        
        <div className="space-y-4">
          {insightsData.recurring.length > 0 ? insightsData.recurring.map((sub, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 rounded-xl transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">{sub.initials}</div>
                <span className="text-sm font-bold text-gray-900 w-40 truncate">{sub.name}</span>
                <span className="text-xs font-medium text-blue-500 w-16 md:w-24">{sub.period}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">${sub.amount.toLocaleString()}</span>
            </div>
          )) : (
            <div className="py-8 text-center text-gray-400 text-sm italic">
              No recurring patterns detected yet.
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors inline-flex items-center">
            Review all activity <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* 5. Interactive Proactive Recommendation */}
      <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-4 relative overflow-hidden flex flex-col md:flex-row border-l-4 border-l-blue-600">
         <div className="bg-blue-50/50 absolute inset-0 z-0 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-1">
           <div className="mr-6 hidden sm:block">
             <div className="w-14 h-14 bg-gray-200/60 rounded-full flex items-center justify-center relative">
               <Lightbulb size={24} className="text-blue-900" />
               <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#fafafa]"></div>
             </div>
           </div>
           <div>
             <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Interactive Insight: Debt Consolidation</h3>
             <p className="text-gray-600 leading-relaxed text-sm mb-6 max-w-4xl">
               Our analysis suggests that consolidating high-interest credit into an institutional line could unlock significant monthly cash flow. 
               Move the slider to see how different rates impact your savings.
             </p>
             <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
               <div className="w-full sm:w-64">
                 <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Target APR</span>
                    <span className="text-sm font-bold text-blue-700">{interestRate}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="3" max="10" step="0.1"
                   className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   value={interestRate}
                   onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                 />
               </div>
               <div className="bg-[#0a3296] text-white px-6 py-3 rounded-xl shadow-lg flex-shrink-0 animate-in zoom-in-95 duration-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Monthly Savings</p>
                  <p className="text-2xl font-black">${calculateDebtSavings().toLocaleString()}</p>
               </div>
             </div>
           </div>
         </div>
      </div>

    </div>
  );
};

