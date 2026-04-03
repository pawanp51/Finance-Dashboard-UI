export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export type Role = 'ADMIN' | 'VIEWER';

export interface Filters {
  search: string;
  category: string;
  type: string;
}
