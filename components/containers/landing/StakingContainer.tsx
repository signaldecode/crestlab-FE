import styles from '@/assets/styles/components/containers/landing/StakingContainer.module.scss';

interface StakingItem {
  name: string;
  ticker: string;
  amount: string;
  rewardRate: string;
  color: string;
}

interface StakingContainerProps {
  messages: { title: string; subtitle: string; rewardLabel: string };
  data: { items: StakingItem[] };
}

export default function StakingContainer({ messages, data }: StakingContainerProps) {
  return (
    <section className={styles.staking}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{messages.title}</h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>
        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles['card-top']}>
                <span
                  className={styles['card-icon']}
                  style={{ backgroundColor: item.color }}
                />
                <div className={styles['card-info']}>
                  <span className={styles['card-name']}>
                    {item.name}({item.ticker})
                  </span>
                  <span className={styles['card-amount']}>{item.amount}</span>
                </div>
              </div>
              <div className={styles['card-bottom']}>
                <span className={styles['reward-label']}>{messages.rewardLabel}</span>
                <span className={styles['reward-value']}>{item.rewardRate}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
