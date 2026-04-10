import styles from '@/assets/styles/components/containers/stocks/IndexCardsContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import { formatFetchedAt } from '@/lib/formatDate';
import type { StockIndexApi } from '@/types/market';

interface IndexCardsContainerProps {
  messages: {
    title: string;
    fetchedAtLabel: string;
  };
  data: StockIndexApi[];
  fetchedAt?: string;
  locale?: string;
}

export default function IndexCardsContainer({ messages, data, fetchedAt, locale }: IndexCardsContainerProps) {
  return (
    <section className={styles['index-cards']} aria-labelledby="index-cards-title">
      <div className={styles['index-cards__title-row']}>
        <h2 id="index-cards-title" className={styles['index-cards__title']}>
          {messages.title}
        </h2>
        {fetchedAt && (
          <p className={styles['index-cards__fetched-at']} aria-live="polite">
            <svg
              className={styles['index-cards__clock-icon']}
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
      </div>
      <div className={styles['index-cards__grid']}>
        {data.map((index) => {
          const isGain = index.change24h >= 0;
          return (
            <div key={index.symbol} className={styles['index-cards__card']}>
              <div className={styles['index-cards__header']}>
                <TickerBadge symbol={index.symbol} size="md" />
                <span className={styles['index-cards__name']}>{index.name}</span>
              </div>
              <span className={styles['index-cards__price']}>
                ${index.price.toLocaleString()}
              </span>
              <span
                className={`${styles['index-cards__change']} ${
                  isGain ? styles['index-cards__change--gain'] : styles['index-cards__change--loss']
                }`}
              >
                {isGain ? '▲ +' : '▼ '}{index.change24h.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
