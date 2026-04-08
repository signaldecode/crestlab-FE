import styles from '@/assets/styles/components/containers/stocks/IndexCardsContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { StockIndex } from '@/types/finance';

interface IndexCardsContainerProps {
  messages: {
    title: string;
  };
  data: StockIndex[];
}

export default function IndexCardsContainer({ messages, data }: IndexCardsContainerProps) {
  return (
    <section className={styles['index-cards']} aria-labelledby="index-cards-title">
      <h2 id="index-cards-title" className={styles['index-cards__title']}>
        {messages.title}
      </h2>
      <div className={styles['index-cards__grid']}>
        {data.map((index) => (
          <div key={index.symbol} className={styles['index-cards__card']}>
            <div className={styles['index-cards__header']}>
              <TickerBadge symbol={index.symbol} size="md" />
              <span className={styles['index-cards__name']}>{index.name}</span>
            </div>
            <span className={styles['index-cards__price']}>
              {index.price.toLocaleString()}
            </span>
            <span
              className={`${styles['index-cards__change']} ${
                index.change >= 0 ? styles['index-cards__change--gain'] : styles['index-cards__change--loss']
              }`}
            >
              {index.change >= 0 ? '▲' : '▼'} {Math.abs(index.change).toFixed(2)} ({Math.abs(index.changePercent).toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
