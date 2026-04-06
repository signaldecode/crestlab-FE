import { NextResponse } from 'next/server';

/**
 * GET /api/news
 * Proxy for RSS feed aggregation (CNBC, Bloomberg, CoinDesk)
 * TODO: Implement RSS parsing and caching
 */
export async function GET() {
  return NextResponse.json({
    message: 'News API proxy endpoint. Connect RSS feed aggregation.',
  });
}
