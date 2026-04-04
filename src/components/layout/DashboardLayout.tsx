"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Loader2 } from 'lucide-react';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchInitialData, isLoading } = useFinanceStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="flex min-h-screen bg-[#fafafa] relative">
      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
           <Loader2 className="text-blue-600 animate-spin mb-4" size={48} />
           <p className="text-sm font-bold text-gray-900 tracking-widest uppercase">Archiving Financial Data...</p>
           <p className="text-xs text-gray-400 mt-2">Connecting to secure mock vault</p>
        </div>
      )}

      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <div className="flex-col flex-1 flex w-full overflow-hidden">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

