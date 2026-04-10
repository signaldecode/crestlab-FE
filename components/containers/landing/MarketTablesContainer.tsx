'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/MarketTablesContainer.module.scss';
import { formatFetchedAt } from '@/lib/formatDate';
import type { MarketMainItem } from '@/types/market';

interface MarketTablesContainerProps {
  messages: {
    stocksTitle: string;
    cryptoTitle: string;
    fetchedAtLabel: string;
    headers: {
      name: string;
      price: string;
      change: string;
    };
  };
  stocks: MarketMainItem[];
  coins: MarketMainItem[];
  fetchedAt?: string;
  locale?: string;
}

interface TableRow {
  key: string;
  name: string;
  logoUrl: string;
  price: number;
  changePercent: number;
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
                <Image
                  src={row.logoUrl}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                  unoptimized
                />
                {row.name}
              </span>
              <span className={styles['market-tables__cell']} role="cell">
                ${row.price.toLocaleString()}
              </span>
              <span
                className={`${styles['market-tables__cell']} ${
                  isGain ? styles['market-tables__cell--gain'] : styles['market-tables__cell--loss']
                }`}
                role="cell"
              >
                {isGain ? '▲ +' : '▼ '}{row.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketTablesContainer({ messages, stocks, coins, fetchedAt, locale }: MarketTablesContainerProps) {
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

  const stockRows: TableRow[] = stocks.map((s) => ({
    key: s.symbol,
    name: s.name,
    logoUrl: s.logoUrl,
    price: s.price,
    changePercent: s.change24h,
  }));

  const coinRows: TableRow[] = coins.map((c) => ({
    key: c.symbol,
    name: c.name,
    logoUrl: c.logoUrl,
    price: c.price,
    changePercent: c.change24h,
  }));

  return (
    <section
      ref={sectionRef}
      className={`${styles['market-tables']} ${inView ? styles['market-tables--in'] : ''}`}
      aria-label="Market Tables"
    >
      {fetchedAt && (
        <p className={styles['market-tables__fetched-at']} aria-live="polite">
          <svg
            className={styles['market-tables__clock-icon']}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {formatFetchedAt(fetchedAt, messages.fetchedAtLabel, locale)}
        </p>
      )}
      <div className={styles['market-tables__grid']}>
        <MarketTable title={messages.stocksTitle} headers={messages.headers} rows={stockRows} />
        <MarketTable title={messages.cryptoTitle} headers={messages.headers} rows={coinRows} />
      </div>
    </section>
  );
}
