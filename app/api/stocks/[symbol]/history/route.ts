import { NextResponse, type NextRequest } from 'next/server';
import stockHistoryData from '@/data/mock/stockHistoryData.json';
import type { StockHistory, StockPeriod } from '@/types/finance';

const VALID_PERIODS: StockPeriod[] = ['1w', '1m', '3m', '1y', '5y'];

/**
 * GET /api/stocks/[symbol]/history?period=1w
 * Returns OHLCV time series for one symbol.
 *
 * Mock implementation reads from data/mock/stockHistoryData.json.
 * TODO: Replace with Alpha Vantage / Twelve Data proxy using process.env.STOCK_API_KEY.
 */
export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/stocks/[symbol]/history'>,
) {
  const { symbol } = await ctx.params;
  const symbolUpper = symbol.toUpperCase();

  const all = stockHistoryData as Record<string, StockHistory>;
  const symbolHistory = all[symbolUpper];
  if (!symbolHistory) {
    return NextResponse.json({ error: 'Symbol not found' }, { status: 404 });
  }

  const periodParam = req.nextUrl.searchParams.get('period');
  if (periodParam) {
    if (!VALID_PERIODS.includes(periodParam as StockPeriod)) {
      return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
    }
    return NextResponse.json({
      symbol: symbolUpper,
      period: periodParam,
      data: symbolHistory[periodParam as StockPeriod],
    });
  }

  // No period → return whole history map
  return NextResponse.json({ symbol: symbolUpper, data: symbolHistory });
}
