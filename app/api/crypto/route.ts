import { NextResponse } from 'next/server';

/**
 * GET /api/crypto
 * Proxy for CoinGecko API
 * TODO: Replace mock with actual API call
 */
export async function GET() {
  return NextResponse.json({
    message: 'Crypto API proxy endpoint. Connect CoinGecko API.',
  });
}
