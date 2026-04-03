import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { Transaction, Role, Filters } from '../types/finance';

// Custom IndexedDB storage for Zustand
const idbStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  filters: Filters;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', date: '2023-10-24', description: 'Cloud Infrastructure Svc', amount: 12450.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '2', date: '2023-10-22', description: 'Dividend Payout - Q3', amount: 45200.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '3', date: '2023-10-19', description: 'Legal Advisory Retainer', amount: 8500.00, category: 'PROFESSIONAL', type: 'EXPENSE' },
  { id: '4', date: '2023-10-15', description: 'Real Estate Rental', amount: 18900.00, category: 'REAL ESTATE', type: 'INCOME' },
  { id: '5', date: '2023-10-12', description: 'Private Jet Charter', amount: 32100.00, category: 'LIFESTYLE', type: 'EXPENSE' },
];

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      role: 'ADMIN',
      filters: { search: '', category: 'ALL', type: 'ALL' },

      addTransaction: (transaction) => {
        if (get().role !== 'ADMIN') return;
        const newTransaction: Transaction = {
          ...transaction,
          id: Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
      },

      updateTransaction: (id, updatedTx) => {
        if (get().role !== 'ADMIN') return;
        set((state) => ({
          transactions: state.transactions.map((tx) => 
            tx.id === id ? { ...updatedTx, id } : tx
          )
        }));
      },

      deleteTransaction: (id) => {
        if (get().role !== 'ADMIN') return;
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id)
        }));
      },

      setRole: (role) => set({ role }),
      
      setFilters: (filters) => set((state) => ({ 
        filters: { ...state.filters, ...filters } 
      })),
      
      resetFilters: () => set({ filters: { search: '', category: 'ALL', type: 'ALL' } }),
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
