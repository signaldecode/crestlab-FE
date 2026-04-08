import { NextResponse, type NextRequest } from 'next/server';
import cryptoData from '@/data/mock/cryptoData.json';
import type { CoinHistory, CoinPeriod, OHLCV } from '@/types/finance';

const VALID_PERIODS: CoinPeriod[] = ['1w', '1m', '3m', '1y', '5y'];

const PERIOD_POINTS: Record<CoinPeriod, number> = {
  '1w': 7,
  '1m': 30,
  '3m': 90,
  '1y': 52, // weekly
  '5y': 60, // monthly
};

const PERIOD_VOLATILITY: Record<CoinPeriod, number> = {
  '1w': 0.025,
  '1m': 0.04,
  '3m': 0.07,
  '1y': 0.18,
  '5y': 0.55,
};

const PERIOD_STEP_DAYS: Record<CoinPeriod, number> = {
  '1w': 1,
  '1m': 1,
  '3m': 1,
  '1y': 7,
  '5y': 30,
};

/**
 * Deterministic LCG seeded by string.
 * Produces stable mock OHLCV per coin id + period without external deps.
 */
function makeRng(seed: string) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) {
    s = (s * 31 + seed.charCodeAt(i)) | 0;
  }
  if (s === 0) s = 1;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 100000) / 100000;
  };
}

function buildSeries(
  id: string,
  endPrice: number,
  endVolume: number,
  period: CoinPeriod,
): OHLCV[] {
  const rng = makeRng(`${id}:${period}`);
  const points = PERIOD_POINTS[period];
  const vol = PERIOD_VOLATILITY[period];
  const stepDays = PERIOD_STEP_DAYS[period];

  // Walk backward from current price
  const closes: number[] = new Array(points);
  closes[points - 1] = endPrice;
  for (let i = points - 2; i >= 0; i--) {
    const drift = (rng() - 0.5) * 2 * vol;
    closes[i] = closes[i + 1] / (1 + drift);
  }

  const series: OHLCV[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < points; i++) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (points - 1 - i) * stepDays);
    const close = closes[i];
    const open = i === 0 ? close * (1 + (rng() - 0.5) * vol * 0.5) : closes[i - 1];
    const wiggle = vol * 0.6;
    const high = Math.max(open, close) * (1 + rng() * wiggle);
    const low = Math.min(open, close) * (1 - rng() * wiggle);
    const volume = endVolume * (0.5 + rng());

    series.push({
      date: date.toISOString().slice(0, 10),
      open: round(open),
      high: round(high),
      low: round(low),
      close: round(close),
      volume: Math.round(volume),
    });
  }

  return series;
}

function round(n: number) {
  if (n >= 100) return Math.round(n * 100) / 100;
  if (n >= 1) return Math.round(n * 10000) / 10000;
  return Math.round(n * 100000000) / 100000000;
}

/**
 * GET /api/crypto/[id]/history?period=1w
 *
 * Mock implementation generates a deterministic OHLCV series from the
 * coin's current price/volume in cryptoData.json. Same input → same
 * output across requests.
 *
 * TODO: Replace with CoinGecko OHLC proxy using process.env.COINGECKO_API_KEY.
 */
export async function GET(
  req: NextRequest,
  ctx: RouteContext<'/api/crypto/[id]/history'>,
) {
  const { id } = await ctx.params;
  const coin = cryptoData.coins.find((c) => c.id === id);
  if (!coin) {
    return NextResponse.json({ error: 'Coin not found' }, { status: 404 });
  }

  const periodParam = req.nextUrl.searchParams.get('period');
  if (periodParam) {
    if (!VALID_PERIODS.includes(periodParam as CoinPeriod)) {
      return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
    }
    return NextResponse.json({
      id: coin.id,
      period: periodParam,
      data: buildSeries(coin.id, coin.price, coin.volume24h, periodParam as CoinPeriod),
    });
  }

  const history: CoinHistory = {
    '1w': buildSeries(coin.id, coin.price, coin.volume24h, '1w'),
    '1m': buildSeries(coin.id, coin.price, coin.volume24h, '1m'),
    '3m': buildSeries(coin.id, coin.price, coin.volume24h, '3m'),
    '1y': buildSeries(coin.id, coin.price, coin.volume24h, '1y'),
    '5y': buildSeries(coin.id, coin.price, coin.volume24h, '5y'),
  };

  return NextResponse.json({ id: coin.id, data: history });
}
