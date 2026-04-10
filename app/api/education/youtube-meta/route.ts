import { NextResponse } from 'next/server';
import { fetchYouTubeMeta } from '@/lib/youtubeMeta';

/**
 * GET /api/education/youtube-meta?url=<youtube_url>
 * GET /api/education/youtube-meta?id=<video_id>
 *
 * Returns YouTube video metadata. Uses YouTube Data API v3 when YOUTUBE_API_KEY
 * is configured (full metadata including duration/views), otherwise falls back
 * to oEmbed (title/thumbnail only).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('url') ?? searchParams.get('id');

  if (!input) {
    return NextResponse.json(
      { error: 'Missing required query parameter: url or id' },
      { status: 400 },
    );
  }

  const meta = await fetchYouTubeMeta(input);
  if (!meta) {
    return NextResponse.json(
      { error: 'Could not resolve YouTube video metadata' },
      { status: 404 },
    );
  }

  return NextResponse.json(meta);
}
