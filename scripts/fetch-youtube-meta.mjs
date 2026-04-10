// Enrich data/mock/educationData.json with real metadata from YouTube Data API v3.
//
// Usage:
//   node --env-file=.env.local scripts/fetch-youtube-meta.mjs
//
// Requires YOUTUBE_API_KEY in .env.local. Preserves slug and category;
// overwrites title, description, duration, views, thumbnail, publishedAt.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/mock/educationData.json');

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  console.error('Missing YOUTUBE_API_KEY. Run with: node --env-file=.env.local scripts/fetch-youtube-meta.mjs');
  process.exit(1);
}

function parseIsoDuration(iso) {
  const m = iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return '00:00';
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const s = Number(m[3] ?? 0);
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(min)}:${pad(s)}` : `${pad(min)}:${pad(s)}`;
}

async function fetchBatch(ids) {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('id', ids.join(','));
  url.searchParams.set('part', 'snippet,contentDetails,statistics');
  url.searchParams.set('key', apiKey);

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.items ?? [];
}

async function main() {
  const raw = await readFile(DATA_PATH, 'utf-8');
  const json = JSON.parse(raw);
  const videos = json.videos ?? [];

  if (videos.length === 0) {
    console.log('No videos to enrich.');
    return;
  }

  console.log(`Fetching metadata for ${videos.length} videos...`);
  const ids = videos.map((v) => v.youtubeId);
  const items = await fetchBatch(ids);

  const byId = new Map(items.map((it) => [it.id, it]));
  let enriched = 0;
  let missing = 0;

  for (const video of videos) {
    const item = byId.get(video.youtubeId);
    if (!item) {
      console.warn(`  ! No metadata for ${video.youtubeId} (slug: ${video.slug})`);
      missing++;
      continue;
    }

    const snippet = item.snippet ?? {};
    const stats = item.statistics ?? {};
    const content = item.contentDetails ?? {};
    const thumb =
      snippet.thumbnails?.maxres?.url ??
      snippet.thumbnails?.high?.url ??
      snippet.thumbnails?.medium?.url ??
      `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

    video.title = snippet.title ?? video.title;
    video.description = (snippet.description ?? '').split('\n')[0].slice(0, 200) || video.description;
    video.duration = parseIsoDuration(content.duration ?? '');
    video.views = Number(stats.viewCount ?? 0);
    video.thumbnail = thumb;
    video.publishedAt = (snippet.publishedAt ?? '').slice(0, 10) || video.publishedAt;
    enriched++;
    console.log(`  ✓ ${video.youtubeId}  ${video.duration}  ${video.title}`);
  }

  await writeFile(DATA_PATH, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`\nEnriched ${enriched}/${videos.length} videos (${missing} missing). Wrote ${DATA_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
