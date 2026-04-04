import { Transaction } from '../types/finance';

export const mockTransactions: Transaction[] = [
  // October 2023
  { id: '1', date: '2023-10-24', description: 'Cloud Infrastructure Svc', amount: 12450.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '2', date: '2023-10-22', description: 'Dividend Payout - Q3', amount: 45200.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '3', date: '2023-10-19', description: 'Legal Advisory Retainer', amount: 8500.00, category: 'PROFESSIONAL', type: 'EXPENSE' },
  { id: '4', date: '2023-10-15', description: 'Real Estate Rental', amount: 18900.00, category: 'REAL ESTATE', type: 'INCOME' },
  { id: '5', date: '2023-10-12', description: 'Private Jet Charter', amount: 32100.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '6', date: '2023-10-10', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '7', date: '2023-10-05', description: 'Spotify Premium', amount: 15.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  
  // September 2023
  { id: '8', date: '2023-09-28', description: 'Apple Store - MacBook Pro', amount: 3499.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '9', date: '2023-09-25', description: 'Monthly Salary', amount: 25000.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '10', date: '2023-09-20', description: 'Luxury Hotel Stay', amount: 4200.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '11', date: '2023-09-15', description: 'SaaS Platform Revenue', amount: 12000.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '12', date: '2023-09-10', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '13', date: '2023-09-05', description: 'Spotify Premium', amount: 15.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '14', date: '2023-09-01', description: 'Co-working Office Rent', amount: 1200.00, category: 'PROFESSIONAL', type: 'EXPENSE' },

  // August 2023
  { id: '15', date: '2023-08-28', description: 'Venture Capital Interest', amount: 8200.00, category: 'INVESTMENTS', type: 'INCOME' },
  { id: '16', date: '2023-08-22', description: 'Art Gallery Purchase', amount: 15000.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '17', date: '2023-08-15', description: 'Consulting Fee - Project X', amount: 9500.00, category: 'PROFESSIONAL', type: 'INCOME' },
  { id: '18', date: '2023-08-12', description: 'Premium Fitness Club', amount: 350.00, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '19', date: '2023-08-10', description: 'Netflix Subscription', amount: 19.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  { id: '20', date: '2023-08-05', description: 'Spotify Premium', amount: 15.99, category: 'LIFESTYLE', type: 'EXPENSE' },
  
  // Extra for specific categories (Peak Expenditure)
  { id: '21', date: '2023-10-01', description: 'Software Licenses - Annual', amount: 5500.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
  { id: '22', date: '2023-09-02', description: 'AWS Hosting Credits', amount: 3200.00, category: 'TECHNOLOGY', type: 'EXPENSE' },
];
