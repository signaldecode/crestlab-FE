import styles from '@/assets/styles/components/containers/stocks/MarketMoversContainer.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { StockMoverApi } from '@/types/market';

interface MarketMoversContainerProps {
  messages: {
    sectionTitle: string;
    gainersTitle: string;
    losersTitle: string;
    gainersBadge: string;
    losersBadge: string;
  };
  gainers: StockMoverApi[];
  losers: StockMoverApi[];
  onSelect?: (symbol: string) => void;
}

export default function MarketMoversContainer({
  messages,
  gainers,
  losers,
  onSelect,
}: MarketMoversContainerProps) {
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
            {gainers.map((item) => (
              <li
                key={item.symbol}
                className={`${styles['movers__list-item']} ${onSelect ? styles['movers__list-item--clickable'] : ''}`}
                tabIndex={onSelect ? 0 : undefined}
                role={onSelect ? 'button' : undefined}
                onClick={onSelect ? () => onSelect(item.symbol) : undefined}
                onKeyDown={
                  onSelect
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect(item.symbol);
                        }
                      }
                    : undefined
                }
              >
                <span className={styles['movers__symbol-wrap']}>
                  <TickerBadge symbol={item.symbol} size="sm" />
                  <span className={styles['movers__symbol']}>{item.symbol}</span>
                </span>
                <span className={`${styles['movers__change']} ${styles['movers__change--gain']}`}>
                  ▲ +{item.change24h.toFixed(2)}%
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
            {losers.map((item) => (
              <li
                key={item.symbol}
                className={`${styles['movers__list-item']} ${onSelect ? styles['movers__list-item--clickable'] : ''}`}
                tabIndex={onSelect ? 0 : undefined}
                role={onSelect ? 'button' : undefined}
                onClick={onSelect ? () => onSelect(item.symbol) : undefined}
                onKeyDown={
                  onSelect
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect(item.symbol);
                        }
                      }
                    : undefined
                }
              >
                <span className={styles['movers__symbol-wrap']}>
                  <TickerBadge symbol={item.symbol} size="sm" />
                  <span className={styles['movers__symbol']}>{item.symbol}</span>
                </span>
                <span className={`${styles['movers__change']} ${styles['movers__change--loss']}`}>
                  ▼ {item.change24h.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
