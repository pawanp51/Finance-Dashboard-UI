import { NextResponse } from 'next/server';
import { mockTransactions } from '@/mocks/data';

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({
    transactions: mockTransactions,
    status: 'success',
    count: mockTransactions.length
  });
}
