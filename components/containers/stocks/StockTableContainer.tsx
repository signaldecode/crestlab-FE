'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/stocks/StockTableContainer.module.scss';
import type { StockItemApi } from '@/types/market';

interface StockTableContainerProps {
  messages: {
    title: string;
    description?: string;
    filterAll: string;
    columns: {
      symbol: string;
      name: string;
      price: string;
      change: string;
      volume: string;
      marketCap: string;
    };
    sectors: Record<string, string>;
  };
  data: StockItemApi[];
  onSelect?: (symbol: string) => void;
}

const SECTORS = ['all', 'TECHNOLOGY', 'ENERGY', 'FINANCE', 'HEALTHCARE', 'CONSUMER', 'INDUSTRIAL'] as const;

function formatVolume(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export default function StockTableContainer({ messages, data, onSelect }: StockTableContainerProps) {
  const [activeSector, setActiveSector] = useState<string>('all');

  const filtered = activeSector === 'all'
    ? data
    : data.filter((s) => s.sector === activeSector);

  return (
    <section className={styles['stock-table']} aria-labelledby="stock-table-title">
      <div className={styles['stock-table__header']}>
        <div className={styles['stock-table__header-text']}>
          <h2 id="stock-table-title" className={styles['stock-table__title']}>
            {messages.title}
          </h2>
          {messages.description && (
            <p className={styles['stock-table__description']}>
              {messages.description}
            </p>
          )}
        </div>

        <div className={styles['stock-table__filters']} role="tablist">
        {SECTORS.map((sector) => (
          <button
            key={sector}
            role="tab"
            aria-selected={activeSector === sector}
            className={`${styles['stock-table__filter']} ${
              activeSector === sector ? styles['stock-table__filter--active'] : ''
            }`}
            onClick={() => setActiveSector(sector)}
          >
            {sector === 'all' ? messages.filterAll : messages.sectors[sector] ?? sector}
          </button>
        ))}
        </div>
      </div>

      <div className={styles['stock-table__wrapper']}>
        <table className={styles['stock-table__table']}>
          <thead>
            <tr>
              <th>{messages.columns.symbol}</th>
              <th>{messages.columns.name}</th>
              <th>{messages.columns.price}</th>
              <th>{messages.columns.change}</th>
              <th>{messages.columns.volume}</th>
              <th>{messages.columns.marketCap}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stock) => {
              const clickable = Boolean(onSelect);
              const isGain = stock.change24h >= 0;
              return (
                <tr
                  key={stock.symbol}
                  className={`${styles['stock-table__row']} ${clickable ? styles['stock-table__row--clickable'] : ''}`}
                  tabIndex={clickable ? 0 : undefined}
                  role={clickable ? 'button' : undefined}
                  onClick={clickable ? () => onSelect!(stock.symbol) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelect!(stock.symbol);
                          }
                        }
                      : undefined
                  }
                >
                  <td className={styles['stock-table__cell--symbol']}>
                    <span className={styles['stock-table__symbol-wrap']}>
                      <Image
                        src={stock.logoUrl}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                        unoptimized
                      />
                      {stock.symbol}
                    </span>
                  </td>
                  <td>{stock.name}</td>
                  <td>${stock.price.toLocaleString()}</td>
                  <td
                    className={
                      isGain ? styles['stock-table__cell--gain'] : styles['stock-table__cell--loss']
                    }
                  >
                    {isGain ? '▲ +' : '▼ '}{stock.change24h.toFixed(2)}%
                  </td>
                  <td>{formatVolume(stock.volume)}</td>
                  <td>${stock.marketCap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
