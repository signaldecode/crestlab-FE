'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/crypto/CoinListContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { CoinCategory, CoinItem } from '@/types/finance';

interface CoinListContainerProps {
  messages: {
    title: string;
    description?: string;
    filterAll: string;
    columns: {
      name: string;
      price: string;
      change24h: string;
      marketCap: string;
      volume: string;
    };
    categories: Record<CoinCategory, string>;
  };
  data: CoinItem[];
  onSelect?: (coin: CoinItem) => void;
}

const CATEGORIES: Array<CoinCategory | 'all'> = [
  'all',
  'layer1',
  'defi',
  'meme',
  'ai',
  'exchange',
  'stablecoin',
];

function formatCoinPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  if (n >= 0.01) return n.toFixed(4);
  if (n >= 0.0001) return n.toFixed(6);
  return n.toPrecision(3);
}

function formatCompactUSD(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

export default function CoinListContainer({ messages, data, onSelect }: CoinListContainerProps) {
  const [activeCategory, setActiveCategory] = useState<CoinCategory | 'all'>('all');

  const filtered =
    activeCategory === 'all' ? data : data.filter((c) => c.category === activeCategory);

  return (
    <section className={styles['coin-list']} aria-labelledby="coin-list-title">
      <div className={styles['coin-list__header']}>
        <div className={styles['coin-list__header-text']}>
          <h2 id="coin-list-title" className={styles['coin-list__title']}>
            {messages.title}
          </h2>
          {messages.description && (
            <p className={styles['coin-list__description']}>
              {messages.description}
            </p>
          )}
        </div>

        <div className={styles['coin-list__filters']} role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`${styles['coin-list__filter']} ${
              activeCategory === cat ? styles['coin-list__filter--active'] : ''
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? messages.filterAll : messages.categories[cat]}
          </button>
        ))}
        </div>
      </div>

      <div className={styles['coin-list__wrapper']}>
        <table className={styles['coin-list__table']}>
          <thead>
            <tr>
              <th>{messages.columns.name}</th>
              <th>{messages.columns.price}</th>
              <th>{messages.columns.change24h}</th>
              <th>{messages.columns.marketCap}</th>
              <th>{messages.columns.volume}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((coin) => {
              const clickable = Boolean(onSelect);
              return (
                <tr
                  key={coin.id}
                  className={`${styles['coin-list__row']} ${clickable ? styles['coin-list__row--clickable'] : ''}`}
                  tabIndex={clickable ? 0 : undefined}
                  role={clickable ? 'button' : undefined}
                  onClick={clickable ? () => onSelect!(coin) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelect!(coin);
                          }
                        }
                      : undefined
                  }
                >
                  <td className={styles['coin-list__cell--name']}>
                    <TickerBadge symbol={coin.symbol} size="sm" />
                    <span className={styles['coin-list__symbol']}>{coin.symbol}</span>
                    <span className={styles['coin-list__name']}>{coin.name}</span>
                  </td>
                  <td>${formatCoinPrice(coin.price)}</td>
                  <td
                    className={
                      coin.change24h >= 0 ? styles['coin-list__cell--gain'] : styles['coin-list__cell--loss']
                    }
                  >
                    {coin.change24h >= 0 ? '▲ +' : '▼ '}{coin.change24h.toFixed(2)}%
                  </td>
                  <td>{formatCompactUSD(coin.marketCap)}</td>
                  <td>{formatCompactUSD(coin.volume24h)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
