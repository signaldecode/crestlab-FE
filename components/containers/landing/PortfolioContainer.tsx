import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PortfolioContainer.module.scss';

interface AssetItem {
  name: string;
  amount: string;
  balance: string;
  color: string;
}

interface PortfolioContainerProps {
  messages: { title: string; subtitle: string };
  data: { assets: AssetItem[] };
}

export default function PortfolioContainer({ messages, data }: PortfolioContainerProps) {
  return (
    <section className={styles.portfolio}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.title}>{messages.title}</h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>

        <div className={styles.showcase}>
          <div className={styles['mockup-wrap']}>
            <Image
              src="/images/landing/mockup-phone-1-1fb7f2.png"
              alt=""
              width={280}
              height={528}
              className={styles.mockup}
              sizes="(max-width: 768px) 200px, 280px"
            />
            <ul className={styles['card-list']} aria-hidden="true">
              {data.assets.map((asset, index) => (
                <li
                  key={index}
                  className={`${styles['card-item']} ${index === 0 ? styles['card-item--active'] : ''}`}
                >
                  <div className={styles['card-left']}>
                    <span
                      className={styles['card-icon']}
                      style={{ backgroundColor: asset.color }}
                    />
                    <div className={styles['card-info']}>
                      <span className={styles['card-name']}>{asset.name}</span>
                      <span className={styles['card-amount']}>{asset.amount}</span>
                    </div>
                  </div>
                  <span className={styles['card-balance']}>{asset.balance}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['mockup-wrap']}>
            <Image
              src="/images/landing/mockup-phone-2-1fb7f2.png"
              alt=""
              width={280}
              height={528}
              className={styles.mockup}
              sizes="(max-width: 768px) 200px, 280px"
            />
            <ul className={styles['card-list']} aria-hidden="true">
              {data.assets.slice().reverse().map((asset, index) => (
                <li
                  key={index}
                  className={`${styles['card-item']} ${index === 0 ? styles['card-item--active'] : ''}`}
                >
                  <div className={styles['card-left']}>
                    <span
                      className={styles['card-icon']}
                      style={{ backgroundColor: asset.color }}
                    />
                    <div className={styles['card-info']}>
                      <span className={styles['card-name']}>{asset.name}</span>
                      <span className={styles['card-amount']}>{asset.amount}</span>
                    </div>
                  </div>
                  <span className={styles['card-balance']}>{asset.balance}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
