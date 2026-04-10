/** GET /api/v1/market/main response */
export interface MarketMainResponse {
  fetchedAt: string;
  stocks: MarketMainItem[];
  coins: MarketMainItem[];
}

export interface MarketMainItem {
  symbol: string;
  name: string;
  logoUrl: string;
  price: number;
  change24h: number;
}

/** GET /api/v1/market/stocks response */
export interface StocksPageResponse {
  fetchedAt: string;
  indices: StockIndexApi[];
  stocks: StockItemApi[];
  topGainers: StockMoverApi[];
  topLosers: StockMoverApi[];
}

export interface StockIndexApi {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export interface StockItemApi {
  symbol: string;
  name: string;
  logoUrl: string;
  sector: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: string;
  chart: number[];
}

export interface StockMoverApi {
  symbol: string;
  name: string;
  change24h: number;
}
