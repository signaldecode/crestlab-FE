import styles from '@/assets/styles/components/containers/landing/StocksPreviewContainer.module.scss';
import SectionTitle from '@/components/ui/SectionTitle';
import type { StockItem } from '@/types/finance';

interface StocksPreviewContainerProps {
  messages: {
    title: string;
    viewAll: string;
  };
  data: StockItem[];
}

export default function StocksPreviewContainer({ messages, data }: StocksPreviewContainerProps) {
  return (
    <section className={styles['stocks-preview']} aria-labelledby="stocks-preview-title">
      <SectionTitle title={messages.title} />
      <div className={styles['stocks-preview__grid']}>
        {data.slice(0, 4).map((stock) => (
          <div key={stock.symbol} className={styles['stocks-preview__card']}>
            <div className={styles['stocks-preview__card-header']}>
              <span className={styles['stocks-preview__symbol']}>{stock.symbol}</span>
              <span className={styles['stocks-preview__name']}>{stock.name}</span>
            </div>
            <div className={styles['stocks-preview__card-body']}>
              <span className={styles['stocks-preview__price']}>
                ${stock.price.toLocaleString()}
              </span>
              <span
                className={`${styles['stocks-preview__change']} ${
                  stock.change >= 0 ? styles['stocks-preview__change--gain'] : styles['stocks-preview__change--loss']
                }`}
              >
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <a href="/stocks" className={styles['stocks-preview__view-all']}>
        {messages.viewAll}
      </a>
    </section>
  );
}
