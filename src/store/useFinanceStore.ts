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
  goals: Record<string, { target: number; current: number }>;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  updateGoal: (name: string, target: number) => void;
  fetchInitialData: () => Promise<void>;
}

const initialTransactions: Transaction[] = [];

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: initialTransactions,
      role: 'ADMIN',
      filters: { search: '', category: 'ALL', type: 'ALL' },
      goals: {
        vacation: { target: 10000, current: 7500 }
      },
      isLoading: false,
      isInitialized: false,

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

      updateGoal: (name, target) => set((state) => ({
        goals: {
          ...state.goals,
          [name]: { ...state.goals[name], target }
        }
      })),

      fetchInitialData: async () => {
        const { transactions, isInitialized } = get();
        
        // Only seed if we haven't already and there are no transactions
        if (isInitialized || transactions.length > 0) return;

        set({ isLoading: true });
        try {
          const response = await fetch('/api/seed');
          const data = await response.json();
          if (data.status === 'success') {
            set({ transactions: data.transactions, isInitialized: true });
          }
        } catch (error) {
          console.error("Failed to fetch initial data:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
