'use client';

import styles from '@/assets/styles/components/containers/crypto/CoinListContainer.module.scss';
import type { CoinItem } from '@/types/finance';

interface CoinListContainerProps {
  messages: {
    title: string;
    columns: {
      name: string;
      price: string;
      change24h: string;
      marketCap: string;
      volume: string;
    };
  };
  data: CoinItem[];
}

export default function CoinListContainer({ messages, data }: CoinListContainerProps) {
  return (
    <section className={styles['coin-list']} aria-labelledby="coin-list-title">
      <h2 id="coin-list-title" className={styles['coin-list__title']}>
        {messages.title}
      </h2>
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
            {data.map((coin) => (
              <tr key={coin.id} className={styles['coin-list__row']}>
                <td className={styles['coin-list__cell--name']}>
                  <span className={styles['coin-list__symbol']}>{coin.symbol}</span>
                  <span>{coin.name}</span>
                </td>
                <td>${coin.price.toLocaleString()}</td>
                <td
                  className={
                    coin.change24h >= 0 ? styles['coin-list__cell--gain'] : styles['coin-list__cell--loss']
                  }
                >
                  {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                </td>
                <td>${(coin.marketCap / 1e9).toFixed(1)}B</td>
                <td>${(coin.volume24h / 1e9).toFixed(1)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
