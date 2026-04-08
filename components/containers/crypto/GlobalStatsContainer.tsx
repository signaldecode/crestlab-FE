import styles from '@/assets/styles/components/containers/crypto/GlobalStatsContainer.module.scss';
import type { CryptoGlobalStats } from '@/types/finance';

interface GlobalStatsContainerProps {
  messages: {
    sectionTitle: string;
    totalMarketCap: string;
    totalVolume24h: string;
    btcDominance: string;
    ethLabel: string;
    change24hShort: string;
  };
  data: CryptoGlobalStats;
}

function formatCompactUSD(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

interface ChangeDeltaProps {
  value: number;
  suffix?: string;
}

function ChangeDelta({ value, suffix }: ChangeDeltaProps) {
  const isGain = value >= 0;
  const arrow = isGain ? '▲' : '▼';
  const className = `${styles['global-stats__delta']} ${
    isGain ? styles['global-stats__delta--gain'] : styles['global-stats__delta--loss']
  }`;
  return (
    <span className={className}>
      {arrow} {Math.abs(value).toFixed(2)}%{suffix ? ` ${suffix}` : ''}
    </span>
  );
}

export default function GlobalStatsContainer({ messages, data }: GlobalStatsContainerProps) {
  return (
    <section className={styles['global-stats']} aria-labelledby="global-stats-title">
      <h2 id="global-stats-title" className={styles['global-stats__title']}>
        {messages.sectionTitle}
      </h2>
      <div className={styles['global-stats__grid']}>
        <article className={styles['global-stats__card']}>
          <span className={styles['global-stats__label']}>{messages.totalMarketCap}</span>
          <span className={styles['global-stats__value']}>
            {formatCompactUSD(data.totalMarketCap)}
          </span>
          <ChangeDelta value={data.totalMarketCapChange24h} suffix={`(${messages.change24hShort})`} />
        </article>

        <article className={styles['global-stats__card']}>
          <span className={styles['global-stats__label']}>{messages.totalVolume24h}</span>
          <span className={styles['global-stats__value']}>
            {formatCompactUSD(data.totalVolume24h)}
          </span>
          <ChangeDelta value={data.totalVolume24hChangePct} />
        </article>

        <article className={styles['global-stats__card']}>
          <span className={styles['global-stats__label']}>{messages.btcDominance}</span>
          <span className={styles['global-stats__value']}>
            {data.btcDominance.toFixed(1)}%
          </span>
          <span className={styles['global-stats__sub']}>
            {messages.ethLabel} {data.ethDominance.toFixed(1)}%
          </span>
        </article>
      </div>
    </section>
  );
}
