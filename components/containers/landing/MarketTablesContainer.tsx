'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/assets/styles/components/containers/landing/MarketTablesContainer.module.scss';
import type { StockItem, CoinItem } from '@/types/finance';

interface MarketTablesContainerProps {
  messages: {
    stocksTitle: string;
    cryptoTitle: string;
    headers: {
      name: string;
      price: string;
      change: string;
      volume: string;
    };
  };
  stocks: StockItem[];
  coins: CoinItem[];
}

interface TableRow {
  key: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number;
}

const ICON_COLORS: Record<string, string> = {
  AAPL: '#555555', GOOGL: '#4285f4', MSFT: '#00a4ef', NVDA: '#76b900', META: '#0082fb',
  SMCI: '#0a8a3e', CRWD: '#e23636', INTC: '#0071c5', AMZN: '#ff9900', TSLA: '#cc0000',
  NKE: '#111111', MCD: '#ffc72c',
  bitcoin: '#f7931a', ethereum: '#627eea', solana: '#9945ff', binancecoin: '#f3ba2f',
  cardano: '#0033ad', avalanche: '#e84142', uniswap: '#ff007a', aave: '#b6509e',
  curve: '#0000ff', dogecoin: '#c2a633',
};

function TickerIcon({ symbol }: { symbol: string }) {
  const color = ICON_COLORS[symbol] ?? '#888';
  const label = symbol.slice(0, 2).toUpperCase();
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="14" cy="14" r="14" fill={color} />
      <text x="14" y="18" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">{label}</text>
    </svg>
  );
}

function formatVolume(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function MarketTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: MarketTablesContainerProps['messages']['headers'];
  rows: TableRow[];
}) {
  return (
    <div className={styles['market-tables__column']}>
      <h2 className={styles['market-tables__title']}>{title}</h2>
      <div className={styles['market-tables__table']} role="table">
        <div className={styles['market-tables__head']} role="row">
          <span className={`${styles['market-tables__cell']} ${styles['market-tables__cell--name']}`} role="columnheader">
            {headers.name}
          </span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.price}</span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.change}</span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.volume}</span>
        </div>
        {rows.map((row, idx) => {
          const isGain = row.changePercent >= 0;
          return (
            <div
              key={row.key}
              className={`${styles['market-tables__row']} ${idx % 2 === 1 ? styles['market-tables__row--alt'] : ''}`}
              role="row"
            >
              <span className={`${styles['market-tables__cell']} ${styles['market-tables__cell--name']}`} role="cell">
                <TickerIcon symbol={row.key} />
                {row.name}
              </span>
              <span className={styles['market-tables__cell']} role="cell">
                {row.price.toLocaleString()}
              </span>
              <span
                className={`${styles['market-tables__cell']} ${
                  isGain ? styles['market-tables__cell--gain'] : styles['market-tables__cell--loss']
                }`}
                role="cell"
              >
                {isGain ? '+' : ''}{row.changePercent.toFixed(2)}%
              </span>
              <span className={styles['market-tables__cell']} role="cell">
                {formatVolume(row.volume)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketTablesContainer({ messages, stocks, coins }: MarketTablesContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stockRows: TableRow[] = stocks.slice(0, 5).map((s) => ({
    key: s.symbol,
    name: s.name,
    price: s.price,
    changePercent: s.changePercent,
    volume: s.volume,
  }));

  const coinRows: TableRow[] = coins.slice(0, 5).map((c) => ({
    key: c.id,
    name: c.name,
    price: c.price,
    changePercent: c.change24h,
    volume: c.volume24h,
  }));

  return (
    <section
      ref={sectionRef}
      className={`${styles['market-tables']} ${inView ? styles['market-tables--in'] : ''}`}
      aria-label="Market Tables"
    >
      <div className={styles['market-tables__grid']}>
        <MarketTable title={messages.stocksTitle} headers={messages.headers} rows={stockRows} />
        <MarketTable title={messages.cryptoTitle} headers={messages.headers} rows={coinRows} />
      </div>
    </section>
  );
}
