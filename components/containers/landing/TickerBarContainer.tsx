'use client';

import styles from '@/assets/styles/components/containers/landing/TickerBarContainer.module.scss';
import type { MarketMainItem } from '@/types/market';

interface TickerBarContainerProps {
  data: MarketMainItem[];
  messages: {
    ariaLabel: string;
  };
}

export default function TickerBarContainer({ data, messages }: TickerBarContainerProps) {
  return (
    <div className={styles['ticker-bar']} role="marquee" aria-label={messages.ariaLabel}>
      <div className={styles['ticker-bar__track']}>
        {[...data, ...data].map((item, i) => {
          const isGain = item.change24h >= 0;
          return (
            <span
              key={`${item.symbol}-${i}`}
              className={`${styles['ticker-bar__item']} ${
                isGain ? styles['ticker-bar__item--gain'] : styles['ticker-bar__item--loss']
              }`}
            >
              <span className={styles['ticker-bar__info']}>
                <span className={styles['ticker-bar__symbol']}>{item.symbol}</span>
                <span className={styles['ticker-bar__price']}>
                  {item.price.toLocaleString()}
                </span>
              </span>
              <span className={styles['ticker-bar__change']}>
                {isGain ? '+' : ''}{item.change24h.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
