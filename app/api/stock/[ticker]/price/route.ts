// File: /app/api/stocks/[ticker]/price/route.ts
// File: /app/api/stocks/[ticker]/price/route.ts
import { NextResponse } from 'next/server';

interface StockPriceParams {
  ticker: string;
}

export async function GET(request: Request, { params }: { params: StockPriceParams }) {
  const { ticker } = params;

  // Placeholder constant value, replace this with actual stock data later
  const stockPrice = 100.0;

  return NextResponse.json({
    ticker: ticker.toUpperCase(),
    price: stockPrice,
  });
}
