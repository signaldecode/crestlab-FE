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

export type StockSector =
  | 'tech'
  | 'energy'
  | 'finance'
  | 'healthcare'
  | 'consumer'
  | 'industrial';

// Crypto
export interface CoinItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  image: string;
}

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

export interface FearGreedData {
  value: number;
  label: string;
  timestamp: string;
}

// News
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: 'stocks' | 'crypto' | 'macro';
  publishedAt: string;
  thumbnail?: string;
}

// Education
export interface VideoItem {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  category: 'beginner' | 'technical-analysis' | 'crypto-basics';
  thumbnail: string;
  duration: string;
}

// Ticker
export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}
