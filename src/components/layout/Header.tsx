import React from 'react';
import { Bell, Settings, User, Search, Menu } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { role, setRole } = useFinanceStore();
  const pathname = usePathname();

  const handleRoleToggle = () => {
    setRole(role === 'ADMIN' ? 'VIEWER' : 'ADMIN');
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 bg-[#fafafa] border-b border-gray-100">
      <div className="flex items-center flex-1">
        <button onClick={onMenuClick} className="mr-4 lg:hidden text-gray-500 hover:text-blue-600 transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="text-lg md:text-xl font-extrabold text-blue-900 mr-4 md:mr-8 truncate hidden sm:block">The Financial Architect</h1>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md w-full md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100/80 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6 ml-4">
        {/* Refined Role Toggle Button */}
        <button
          onClick={handleRoleToggle}
          className={`flex items-center px-2 md:px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors rounded-full ${role === 'ADMIN'
            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <span className={`w-2 h-2 mr-1 md:mr-2 rounded-full ${role === 'ADMIN' ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
          <span className="hidden md:inline">{role === 'ADMIN' ? 'Admin Role' : 'Viewer Role (Read-only)'}</span>
          <span className="md:hidden">{role === 'ADMIN' ? 'Admin' : 'Viewer'}</span>
        </button>

        <div className="flex items-center space-x-2 md:space-x-4 text-gray-500 hidden sm:flex">
          <button className="hover:text-gray-900 transition-colors">
            <Bell size={18} />
          </button>
          <button className="hover:text-gray-900 transition-colors">
            <Settings size={18} />
          </button>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      </div>
    </header>
  );
};

