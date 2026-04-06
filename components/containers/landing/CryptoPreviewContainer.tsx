import styles from '@/assets/styles/components/containers/landing/CryptoPreviewContainer.module.scss';
import SectionTitle from '@/components/ui/SectionTitle';
import type { CoinItem } from '@/types/finance';

interface CryptoPreviewContainerProps {
  messages: {
    title: string;
    viewAll: string;
  };
  data: CoinItem[];
}

export default function CryptoPreviewContainer({ messages, data }: CryptoPreviewContainerProps) {
  return (
    <section className={styles['crypto-preview']} aria-labelledby="crypto-preview-title">
      <SectionTitle title={messages.title} />
      <div className={styles['crypto-preview__grid']}>
        {data.slice(0, 4).map((coin) => (
          <div key={coin.id} className={styles['crypto-preview__card']}>
            <div className={styles['crypto-preview__card-header']}>
              <span className={styles['crypto-preview__symbol']}>{coin.symbol}</span>
              <span className={styles['crypto-preview__name']}>{coin.name}</span>
            </div>
            <div className={styles['crypto-preview__card-body']}>
              <span className={styles['crypto-preview__price']}>
                ${coin.price.toLocaleString()}
              </span>
              <span
                className={`${styles['crypto-preview__change']} ${
                  coin.change24h >= 0 ? styles['crypto-preview__change--gain'] : styles['crypto-preview__change--loss']
                }`}
              >
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <a href="/crypto" className={styles['crypto-preview__view-all']}>
        {messages.viewAll}
      </a>
    </section>
  );
}
