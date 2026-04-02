import styles from '@/assets/styles/components/containers/landing/TokenListContainer.module.scss';

interface TokenItem { name: string; ticker: string; amount: string; rewardRate: string; color: string; }

interface TokenListContainerProps {
  messages: { title: string; rewardLabel: string };
  data: { items: TokenItem[] };
}

export default function TokenListContainer({ messages, data }: TokenListContainerProps) {
  return (
    <section className={styles['token-list']}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          <div className={styles.slide}>
            {data.items.map((item, i) => (
              <article key={i} className={styles.card}>
                <div className={styles['card-top']}>
                  <span className={styles['card-icon']} style={{ backgroundColor: item.color }} />
                  <div>
                    <span className={styles['card-name']}>{item.name}({item.ticker})</span>
                    <span className={styles['card-amount']}>{item.amount}</span>
                  </div>
                </div>
                <div className={styles['card-bottom']}>
                  <span className={styles['card-reward-label']}>{messages.rewardLabel}</span>
                  <span className={styles['card-reward-value']}>{item.rewardRate}</span>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.slide} aria-hidden="true">
            {data.items.map((item, i) => (
              <article key={`dup1-${i}`} className={styles.card}>
                <div className={styles['card-top']}>
                  <span className={styles['card-icon']} style={{ backgroundColor: item.color }} />
                  <div>
                    <span className={styles['card-name']}>{item.name}({item.ticker})</span>
                    <span className={styles['card-amount']}>{item.amount}</span>
                  </div>
                </div>
                <div className={styles['card-bottom']}>
                  <span className={styles['card-reward-label']}>{messages.rewardLabel}</span>
                  <span className={styles['card-reward-value']}>{item.rewardRate}</span>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.slide} aria-hidden="true">
            {data.items.map((item, i) => (
              <article key={`dup2-${i}`} className={styles.card}>
                <div className={styles['card-top']}>
                  <span className={styles['card-icon']} style={{ backgroundColor: item.color }} />
                  <div>
                    <span className={styles['card-name']}>{item.name}({item.ticker})</span>
                    <span className={styles['card-amount']}>{item.amount}</span>
                  </div>
                </div>
                <div className={styles['card-bottom']}>
                  <span className={styles['card-reward-label']}>{messages.rewardLabel}</span>
                  <span className={styles['card-reward-value']}>{item.rewardRate}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
