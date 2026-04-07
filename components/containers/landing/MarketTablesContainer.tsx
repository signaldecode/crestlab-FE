import styles from '@/assets/styles/components/containers/landing/MarketTablesContainer.module.scss';
import type { StockItem, CoinItem } from '@/types/finance';

interface MarketTablesContainerProps {
  messages: {
    stocksTitle: string;
    cryptoTitle: string;
    headers: {
      name: string;
      price: string;
      change: string;
      volume: string;
    };
  };
  stocks: StockItem[];
  coins: CoinItem[];
}

interface TableRow {
  key: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number;
}

function formatVolume(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function MarketTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: MarketTablesContainerProps['messages']['headers'];
  rows: TableRow[];
}) {
  return (
    <div className={styles['market-tables__column']}>
      <h2 className={styles['market-tables__title']}>{title}</h2>
      <div className={styles['market-tables__table']} role="table">
        <div className={styles['market-tables__head']} role="row">
          <span className={`${styles['market-tables__cell']} ${styles['market-tables__cell--name']}`} role="columnheader">
            {headers.name}
          </span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.price}</span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.change}</span>
          <span className={styles['market-tables__cell']} role="columnheader">{headers.volume}</span>
        </div>
        {rows.map((row, idx) => {
          const isGain = row.changePercent >= 0;
          return (
            <div
              key={row.key}
              className={`${styles['market-tables__row']} ${idx % 2 === 1 ? styles['market-tables__row--alt'] : ''}`}
              role="row"
            >
              <span className={`${styles['market-tables__cell']} ${styles['market-tables__cell--name']}`} role="cell">
                {row.name}
              </span>
              <span className={styles['market-tables__cell']} role="cell">
                {row.price.toLocaleString()}
              </span>
              <span
                className={`${styles['market-tables__cell']} ${
                  isGain ? styles['market-tables__cell--gain'] : styles['market-tables__cell--loss']
                }`}
                role="cell"
              >
                {isGain ? '+' : ''}{row.changePercent.toFixed(2)}%
              </span>
              <span className={styles['market-tables__cell']} role="cell">
                {formatVolume(row.volume)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketTablesContainer({ messages, stocks, coins }: MarketTablesContainerProps) {
  const stockRows: TableRow[] = stocks.slice(0, 5).map((s) => ({
    key: s.symbol,
    name: s.name,
    price: s.price,
    changePercent: s.changePercent,
    volume: s.volume,
  }));

  const coinRows: TableRow[] = coins.slice(0, 5).map((c) => ({
    key: c.id,
    name: c.name,
    price: c.price,
    changePercent: c.change24h,
    volume: c.volume24h,
  }));

  return (
    <section className={styles['market-tables']} aria-label="시장 테이블">
      <div className={styles['market-tables__grid']}>
        <MarketTable title={messages.stocksTitle} headers={messages.headers} rows={stockRows} />
        <MarketTable title={messages.cryptoTitle} headers={messages.headers} rows={coinRows} />
      </div>
    </section>
  );
}
