import { TransactionList } from '@/components/transactions/TransactionList';

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Ledger Management</p>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Transactions</h2>
      </div>

      <TransactionList />
    </div>
  );
}
