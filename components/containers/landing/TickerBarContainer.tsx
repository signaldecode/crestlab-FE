'use client';

import styles from '@/assets/styles/components/containers/landing/TickerBarContainer.module.scss';
import type { TickerItem } from '@/types/finance';

interface TickerBarContainerProps {
  data: TickerItem[];
  messages: {
    ariaLabel: string;
  };
}

export default function TickerBarContainer({ data, messages }: TickerBarContainerProps) {
  return (
    <div className={styles['ticker-bar']} role="marquee" aria-label={messages.ariaLabel}>
      <div className={styles['ticker-bar__track']}>
        {[...data, ...data].map((item, i) => (
          <span
            key={`${item.symbol}-${i}`}
            className={`${styles['ticker-bar__item']} ${
              item.change >= 0 ? styles['ticker-bar__item--gain'] : styles['ticker-bar__item--loss']
            }`}
          >
            <span className={styles['ticker-bar__symbol']}>{item.symbol}</span>
            <span className={styles['ticker-bar__price']}>
              ${item.price.toLocaleString()}
            </span>
            <span className={styles['ticker-bar__change']}>
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.changePercent).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
