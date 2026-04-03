import { InsightCards } from '@/components/insights/InsightCards';

export default function InsightsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-1">Intelligent Analysis</p>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Insights</h2>
      </div>

      <InsightCards />
    </div>
  );
}
