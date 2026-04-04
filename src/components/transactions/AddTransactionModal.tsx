"use client";

import React, { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { X } from 'lucide-react';
import { TransactionType } from '@/types/finance';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const { addTransaction, role } = useFinanceStore();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('EXPENSE');

  if (!isOpen || role !== 'ADMIN') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      category: category.toUpperCase(),
      type,
      date: new Date().toISOString()
    });

    setDescription('');
    setAmount('');
    setCategory('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              required
              className="w-full text-gray-400 px-4 py-2 border border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Apple Store"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input
                type="number"
                required
                min="0.01" step="0.01"
                className="w-full text-gray-400 px-4 py-2 border border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="1299.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="w-full text-gray-400 border-2 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
              >
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              required
              className="w-full text-gray-400 px-4 py-2 border border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. ELECTRONICS"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
