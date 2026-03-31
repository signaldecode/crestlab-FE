import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/TrustContainer.module.scss';

interface TrustItem {
  title: string;
  description: string;
}

interface PortfolioCard {
  name: string;
  amount: string;
  value: string;
}

interface TrustData {
  items: TrustItem[];
  lockIcon: string;
  portfolioCards: PortfolioCard[];
}

interface TrustContainerProps {
  messages: { title: string };
  data: TrustData;
}

export default function TrustContainer({ messages, data }: TrustContainerProps) {
  const titleLines = messages.title.split('\n');

  return (
    <section className={styles.trust}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Image
            src={data.lockIcon}
            alt=""
            width={48}
            height={48}
            className={styles['lock-icon']}
            aria-hidden="true"
          />
          <h2 className={styles.title}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className={styles['info-grid']}>
          {data.items.map((item, i) => (
            <div key={i} className={styles['info-card']}>
              <h3 className={styles['info-title']}>{item.title}</h3>
              <p className={styles['info-desc']}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles['portfolio-row']} aria-hidden="true">
          {data.portfolioCards.map((card, i) => (
            <div key={i} className={styles['portfolio-card']}>
              <div className={styles['portfolio-top']}>
                <div className={styles['portfolio-dot']} />
                <div className={styles['portfolio-info']}>
                  <span className={styles['portfolio-name']}>{card.name}</span>
                  <span className={styles['portfolio-amount']}>{card.amount}</span>
                </div>
              </div>
              <span className={styles['portfolio-value']}>{card.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
