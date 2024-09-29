// /app/api/portfolio/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy data to return for the portfolio
  const portfolioData = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      value: '150.00',
      units: 10,
      currentAllocation: '30%',
      targetAllocation: '40%',
      diff: 5000, // positive difference
    },
    {
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      value: '700.00',
      units: 5,
      currentAllocation: '20%',
      targetAllocation: '15%',
      diff: -3000, // negative difference
    },
    // Add more data as needed
  ];

  return NextResponse.json(portfolioData);
}
