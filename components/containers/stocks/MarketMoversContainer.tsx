import styles from '@/assets/styles/components/containers/stocks/MarketMoversContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { StockItem } from '@/types/finance';

interface MarketMoversContainerProps {
  messages: {
    sectionTitle: string;
    gainersTitle: string;
    losersTitle: string;
    gainersBadge: string;
    losersBadge: string;
  };
  data: StockItem[];
  topCount?: number;
}

export default function MarketMoversContainer({
  messages,
  data,
  topCount = 5,
}: MarketMoversContainerProps) {
  const sorted = [...data].sort((a, b) => b.changePercent - a.changePercent);
  const gainers = sorted.slice(0, topCount);
  const losers = sorted.slice(-topCount).reverse();

  return (
    <section className={styles['movers']} aria-labelledby="market-movers-title">
      <h2 id="market-movers-title" className={styles['movers__title']}>
        {messages.sectionTitle}
      </h2>

      <div className={styles['movers__grid']}>
        <article className={`${styles['movers__panel']} ${styles['movers__panel--gain']}`}>
          <header className={styles['movers__header']}>
            <span className={`${styles['movers__badge']} ${styles['movers__badge--gain']}`}>
              {messages.gainersBadge}
            </span>
            <h3 className={styles['movers__panel-title']}>{messages.gainersTitle}</h3>
          </header>
          <ul className={styles['movers__list']}>
            {gainers.map((stock) => (
              <li key={stock.symbol} className={styles['movers__list-item']}>
                <span className={styles['movers__symbol-wrap']}>
                  <TickerBadge symbol={stock.symbol} size="sm" />
                  <span className={styles['movers__symbol']}>{stock.symbol}</span>
                </span>
                <span className={`${styles['movers__change']} ${styles['movers__change--gain']}`}>
                  ▲ {stock.changePercent.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className={`${styles['movers__panel']} ${styles['movers__panel--loss']}`}>
          <header className={styles['movers__header']}>
            <span className={`${styles['movers__badge']} ${styles['movers__badge--loss']}`}>
              {messages.losersBadge}
            </span>
            <h3 className={styles['movers__panel-title']}>{messages.losersTitle}</h3>
          </header>
          <ul className={styles['movers__list']}>
            {losers.map((stock) => (
              <li key={stock.symbol} className={styles['movers__list-item']}>
                <span className={styles['movers__symbol-wrap']}>
                  <TickerBadge symbol={stock.symbol} size="sm" />
                  <span className={styles['movers__symbol']}>{stock.symbol}</span>
                </span>
                <span className={`${styles['movers__change']} ${styles['movers__change--loss']}`}>
                  ▼ {Math.abs(stock.changePercent).toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
