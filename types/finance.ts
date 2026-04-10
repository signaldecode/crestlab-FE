// US Stocks
export interface StockIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type StockPeriod = '1w' | '1m' | '3m' | '1y' | '5y';

export type StockHistory = Record<StockPeriod, OHLCV[]>;

export type StockSector =
  | 'tech'
  | 'energy'
  | 'finance'
  | 'healthcare'
  | 'consumer'
  | 'industrial';

// Crypto
export type CoinCategory =
  | 'layer1'
  | 'defi'
  | 'meme'
  | 'ai'
  | 'exchange'
  | 'stablecoin';

export interface CoinItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  image: string;
  category: CoinCategory;
}

export interface CryptoGlobalStats {
  totalMarketCap: number;
  totalMarketCapChange24h: number;
  totalVolume24h: number;
  totalVolume24hChangePct: number;
  btcDominance: number;
  ethDominance: number;
}

export type CoinPeriod = '1w' | '1m' | '3m' | '1y' | '5y';

export type CoinHistory = Record<CoinPeriod, OHLCV[]>;

export interface DominanceData {
  btc: number;
  eth: number;
  others: number;
}

export interface DominanceTimeSeriesItem {
  date: string;
  btc: number;
  eth: number;
  others: number;
}

export interface FearGreedHistoryItem {
  value: number;
  label: string;
}

export interface FearGreedData {
  value: number;
  label: string;
  timestamp: string;
  history?: Record<string, FearGreedHistoryItem>;
}

// News
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string[];
  source: string;
  url: string;
  category: 'stocks' | 'crypto' | 'macro';
  publishedAt: string;
  thumbnail?: string;
  author?: string;
}

// Education
export type VideoCategory =
  | 'beginner'
  | 'intermediate'
  | 'technical-analysis'
  | 'crypto-basics'
  | 'market-strategy';

export interface VideoItem {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  category: VideoCategory;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt?: string;
}

// Ticker
export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}
