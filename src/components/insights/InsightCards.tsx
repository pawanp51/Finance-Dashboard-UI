"use client";

import React from 'react';
import { 
  TrendingUp, 
  ArrowRight,
  Lightbulb,
  CreditCard,
  Flag
} from 'lucide-react';

export const InsightCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 1. Peak Expenditure (Housing) */}
      <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <TrendingUp size={18} />
             </div>
             <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">PEAK EXPENDITURE</h3>
          </div>
          <div className="px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center">
            <TrendingUp size={16} className="text-red-500 mr-2" />
            <span className="font-bold text-red-500 mr-2">10%</span>
            <span className="text-xs text-gray-500 font-medium">vs Last Month</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Housing</h2>
        <div className="flex items-baseline mb-8">
          <p className="text-5xl font-extrabold text-blue-700 tracking-tight">$1,200</p>
          <span className="ml-2 text-gray-500 font-medium">per month</span>
        </div>
        
        {/* Mockup Bar Chart Graphic */}
        <div className="h-24 w-full bg-gray-50/50 rounded-xl border border-gray-100 mb-6 flex items-end p-4 space-x-2 relative">
          <div className="w-full bg-gray-200 rounded-t-lg h-1/3"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-1/2"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-1/3"></div>
          <div className="w-full bg-[#0a3296] rounded-t-lg h-[90%] relative">
             <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">Current</div>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          This is <span className="font-bold text-red-600">10% higher than last month</span>. Primary drivers include seasonal utility adjustments and property management surcharges.
        </p>
      </div>

      {/* 2. Savings Delta */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
           </div>
           <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">SAVINGS DELTA</h3>
        </div>
        
        <p className="text-2xl text-gray-900 leading-snug mb-8">
          You saved <span className="font-semibold text-blue-700">15% more</span> in February than January.
        </p>

        <div className="mt-auto">
          <div className="flex space-x-1 mb-2">
            <div className="h-2 w-1/2 bg-gray-400 rounded-full"></div>
            <div className="h-2 w-full bg-blue-700 rounded-full"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
          </div>
        </div>
      </div>

      {/* 3. Family Vacation Fund */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-500 text-xs tracking-wider uppercase">FAMILY VACATION FUND</h3>
          <Flag size={16} className="text-gray-400" />
        </div>
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-3xl font-bold text-gray-900">$7,500</p>
            <p className="text-xs font-medium text-gray-500 mt-1">of $10,000 goal</p>
          </div>
          <span className="text-2xl font-semibold text-blue-700">75%</span>
        </div>

        <div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-6 overflow-hidden flex">
             <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs font-medium text-gray-500 flex items-center">
            <span className="mr-2">✨</span> On track to reach goal by June 2024
          </p>
        </div>
      </div>

      {/* 4. Subscription Audit */}
      <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex items-center space-x-3 mb-6">
           <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <CreditCard size={18} />
           </div>
           <div>
             <h3 className="font-bold text-gray-900">Subscription Audit</h3>
             <p className="text-xs text-gray-500 font-medium mt-0.5">Found 5 recurring charges this cycle</p>
           </div>
        </div>
        
        <div className="space-y-4">
          {[
            { a: 'SF', n: 'Spotify Premium', p: 'Monthly', v: '$15.99' },
            { a: 'NX', n: 'Netflix Ultra HD', p: 'Monthly', v: '$19.99' },
            { a: 'BB', n: 'Bloomberg Terminal', p: 'Institutional', v: '$2,000.00' },
            { a: 'CD', n: 'Cloud Storage Plus', p: 'Annual', v: '$120.00' },
            { a: 'AT', n: 'Adobe Creative Cloud', p: 'Monthly', v: '$52.99' },
          ].map((sub, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-4 hover:bg-gray-50 rounded-xl transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">{sub.a}</div>
                <span className="text-sm font-bold text-gray-900 w-40">{sub.n}</span>
                <span className="text-xs font-medium text-blue-500 w-24">{sub.p}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{sub.v}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors inline-flex items-center">
            Review all subscriptions <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* 5. Recommended Insight */}
      <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-4 relative overflow-hidden flex border-l-4 border-l-blue-600">
         <div className="bg-blue-50/50 absolute inset-0 z-0 pointer-events-none"></div>
         <div className="relative z-10 flex">
           <div className="mr-6 hidden sm:block">
             <div className="w-14 h-14 bg-gray-200/60 rounded-full flex items-center justify-center relative">
               <Lightbulb size={24} className="text-blue-900" />
               <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#fafafa]"></div>
             </div>
           </div>
           <div>
             <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Proactive Recommendation: Debt Consolidation</h3>
             <p className="text-gray-600 leading-relaxed text-sm mb-6 max-w-4xl">
               Our analysis of your current transaction history suggests that consolidating your high-interest personal loans into a single 5.2% APR institutional credit line could save you approximately <span className="font-bold text-gray-900">$450 in monthly interest payments</span>. This adjustment would accelerate your "Family Vacation Fund" timeline by nearly three months.
             </p>
             <div className="flex items-center space-x-6">
               <button className="text-sm font-bold text-blue-700 hover:text-blue-800 underline-offset-4 hover:underline transition-all">
                 Calculate Potential Savings
               </button>
               <button className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                 Dismiss Recommendation
               </button>
             </div>
           </div>
         </div>
      </div>

    </div>
  );
};

