'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/stocks/StockTableContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { StockItem, StockSector } from '@/types/finance';

interface StockTableContainerProps {
  messages: {
    title: string;
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
  data: StockItem[];
  onSelect?: (stock: StockItem) => void;
}

const SECTORS: Array<StockSector | 'all'> = ['all', 'tech', 'energy', 'finance', 'healthcare', 'consumer', 'industrial'];

export default function StockTableContainer({ messages, data, onSelect }: StockTableContainerProps) {
  const [activeSector, setActiveSector] = useState<StockSector | 'all'>('all');

  const filtered = activeSector === 'all'
    ? data
    : data.filter((s) => s.sector === activeSector);

  return (
    <section className={styles['stock-table']} aria-labelledby="stock-table-title">
      <h2 id="stock-table-title" className={styles['stock-table__title']}>
        {messages.title}
      </h2>

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
              return (
                <tr
                  key={stock.symbol}
                  className={`${styles['stock-table__row']} ${clickable ? styles['stock-table__row--clickable'] : ''}`}
                  tabIndex={clickable ? 0 : undefined}
                  role={clickable ? 'button' : undefined}
                  onClick={clickable ? () => onSelect!(stock) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelect!(stock);
                          }
                        }
                      : undefined
                  }
                >
                  <td className={styles['stock-table__cell--symbol']}>
                    <span className={styles['stock-table__symbol-wrap']}>
                      <TickerBadge symbol={stock.symbol} size="sm" />
                      {stock.symbol}
                    </span>
                  </td>
                  <td>{stock.name}</td>
                  <td>${stock.price.toLocaleString()}</td>
                  <td
                    className={
                      stock.change >= 0 ? styles['stock-table__cell--gain'] : styles['stock-table__cell--loss']
                    }
                  >
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td>{(stock.volume / 1e6).toFixed(1)}M</td>
                  <td>${(stock.marketCap / 1e9).toFixed(0)}B</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
