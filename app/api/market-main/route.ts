import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL ?? '';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/market/main`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: { code: 'UPSTREAM_ERROR', message: 'Failed to fetch market data' } },
        { status: res.status },
      );
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'NETWORK_ERROR', message: 'Backend unreachable' } },
      { status: 502 },
    );
  }
}
