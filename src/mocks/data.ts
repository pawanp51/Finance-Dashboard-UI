import { Transaction } from '../types/finance';

export const mockTransactions: Transaction[] = [
  // 2026
  { id: '26-04-1', date: '2026-04-03', description: 'Cloud Infrastructure Svc', amount: 12450.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '26-04-2', date: '2026-04-02', description: 'Monthly Dividend Payout', amount: 45200.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '26-04-3', date: '2026-04-01', description: 'Rent Payment', amount: 3500.00, category: 'REAL ESTATE', type: 'EXPENSE' },
  { id: '26-03-1', date: '2026-03-25', description: 'Monthly Salary', amount: 25000.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '26-02-1', date: '2026-02-22', description: 'Art Gallery Purchase', amount: 15000.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '26-01-1', date: '2026-01-25', description: 'Annual Bonus', amount: 35000.00, category: 'PROFESSIONAL', type: 'INCOME' },

  // 2025
  { id: '25-12-1', date: '2025-12-15', description: 'Holiday Bonus', amount: 8000.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '25-11-1', date: '2025-11-10', description: 'New Office Equipment', amount: 4500.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '25-08-1', date: '2025-08-20', description: 'Investment Return', amount: 12000.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '25-06-1', date: '2025-06-12', description: 'Project Consultation', amount: 15000.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '25-03-1', date: '2025-03-05', description: 'Conference Travel', amount: 2800.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '25-01-1', date: '2025-01-15', description: 'Q4 Performance Payout', amount: 11000.00, category: 'INVESTMENTS', type: 'INCOME' },

  // 2024
  { id: '24-10-1', date: '2024-10-25', description: 'Property Refurbishment', amount: 25000.00, category: 'REAL ESTATE', type: 'EXPENSE' },
  { id: '24-07-1', date: '2024-07-12', description: 'Tech Setup Upgrade', amount: 3200.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '24-04-1', date: '2024-04-20', description: 'New Client Retainer', amount: 18000.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '24-01-1', date: '2024-01-10', description: 'Starting Capital Injection', amount: 50000.00, category: 'INVESTMENTS', type: 'INCOME' },

  // Subscriptions (for Audit)
  { id: 'sub-1', date: '2026-04-05', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: 'sub-2', date: '2026-03-05', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: 'sub-3', date: '2026-02-05', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: 'sub-4', date: '2026-04-01', description: 'Spotify Premium', amount: 15.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: 'sub-5', date: '2026-03-01', description: 'Spotify Premium', amount: 15.99, category: 'LIFESTYLE', type: 'EXPENSE' },
];
