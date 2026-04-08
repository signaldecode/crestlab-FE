import { parseYouTubeId } from './youtube';

export interface YouTubeMeta {
  videoId: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  thumbnail: string;
  publishedAt: string;
  channel: string;
  source: 'data-api' | 'oembed';
}

/**
 * Convert ISO 8601 duration (PT#H#M#S) to "HH:MM:SS" or "MM:SS".
 */
export function parseIsoDuration(iso: string): string {
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return '00:00';
  const h = Number(match[1] ?? 0);
  const m = Number(match[2] ?? 0);
  const s = Number(match[3] ?? 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

interface DataApiResponse {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelTitle?: string;
      thumbnails?: {
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
    contentDetails?: { duration?: string };
    statistics?: { viewCount?: string };
  }>;
}

interface OEmbedResponse {
  title?: string;
  author_name?: string;
  thumbnail_url?: string;
}

async function fetchFromDataApi(videoId: string, apiKey: string): Promise<YouTubeMeta | null> {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('id', videoId);
  url.searchParams.set('part', 'snippet,contentDetails,statistics');
  url.searchParams.set('key', apiKey);

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;

  const data = (await res.json()) as DataApiResponse;
  const item = data.items?.[0];
  if (!item) return null;

  const snippet = item.snippet ?? {};
  const thumb =
    snippet.thumbnails?.high?.url ??
    snippet.thumbnails?.medium?.url ??
    snippet.thumbnails?.default?.url ??
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    videoId,
    title: snippet.title ?? '',
    description: snippet.description ?? '',
    duration: parseIsoDuration(item.contentDetails?.duration ?? ''),
    views: Number(item.statistics?.viewCount ?? 0),
    thumbnail: thumb,
    publishedAt: (snippet.publishedAt ?? '').slice(0, 10),
    channel: snippet.channelTitle ?? '',
    source: 'data-api',
  };
}

async function fetchFromOEmbed(videoId: string): Promise<YouTubeMeta | null> {
  const url = new URL('https://www.youtube.com/oembed');
  url.searchParams.set('url', `https://www.youtube.com/watch?v=${videoId}`);
  url.searchParams.set('format', 'json');

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;

  const data = (await res.json()) as OEmbedResponse;
  return {
    videoId,
    title: data.title ?? '',
    description: '',
    duration: '',
    views: 0,
    thumbnail: data.thumbnail_url ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    publishedAt: '',
    channel: data.author_name ?? '',
    source: 'oembed',
  };
}

/**
 * Fetch YouTube video metadata. Tries Data API v3 first if YOUTUBE_API_KEY is set,
 * falls back to oEmbed (no auth, title/thumbnail only — no duration/views).
 */
export async function fetchYouTubeMeta(input: string): Promise<YouTubeMeta | null> {
  const videoId = parseYouTubeId(input);
  if (!videoId) return null;

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey) {
    const meta = await fetchFromDataApi(videoId, apiKey);
    if (meta) return meta;
  }

  return fetchFromOEmbed(videoId);
}
