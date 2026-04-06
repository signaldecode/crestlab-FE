import { NextResponse } from 'next/server';

/**
 * GET /api/stocks
 * Proxy for external stock API (Alpha Vantage / Twelve Data)
 * TODO: Replace mock with actual API call using process.env.STOCK_API_KEY
 */
export async function GET() {
  // Mock response — replace with actual API integration
  return NextResponse.json({
    message: 'Stock API proxy endpoint. Connect Alpha Vantage or Twelve Data.',
  });
}
