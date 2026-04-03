"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wallet, LineChart, FileText, HelpCircle, LogOut, Lock, X } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';

export const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const pathname = usePathname();
  const { role } = useFinanceStore();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: FileText },
    { name: 'Insights', href: '/insights', icon: LineChart },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#fafafa] border-r border-gray-100 flex flex-col pt-6 pb-8 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-8 mb-12 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex flex-col justify-center items-center shadow-sm">
              <div className="w-4 h-0.5 bg-white mb-0.5 rounded-full"></div>
              <div className="w-4 h-0.5 bg-white mb-0.5 rounded-full"></div>
              <div className="w-4 h-0.5 bg-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-blue-900 leading-tight">Private Wealth</h2>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide">INSTITUTIONAL GRADE</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-white text-blue-700 shadow-sm font-semibold border border-gray-50' 
                        : 'text-gray-500 hover:bg-gray-100 font-medium'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-blue-600 mr-3' : 'text-gray-400 mr-3'} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-8 flex flex-col space-y-6">
          {role === 'ADMIN' ? (
            <button className="w-full py-3 bg-[#0a3296] hover:bg-blue-800 text-white font-medium rounded-full transition-colors shadow-md text-sm">
              Open New Account
            </button>
          ) : (
            <div className="w-full py-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200">
              <Lock size={16} className="mb-2" />
              <span className="text-xs font-bold tracking-wider text-center">ACTIONS RESTRICTED</span>
            </div>
          )}
          
          <div className="space-y-4">
            <Link href="/support" className="flex items-center text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              <HelpCircle size={18} className="mr-3 text-gray-400" />
              Support
            </Link>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              <LogOut size={18} className="mr-3 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};


