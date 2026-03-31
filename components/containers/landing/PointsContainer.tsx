import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PointsContainer.module.scss';

interface CryptoItem {
  icon: string;
  name: string;
  amount: string;
  value: string;
}

interface PointItem {
  point: string;
  title: string;
  description: string;
  image?: string;
  cryptoItems?: CryptoItem[];
}

interface PointsData {
  items: PointItem[];
}

interface PointsContainerProps {
  messages: { title: string };
  data: PointsData;
}

export default function PointsContainer({ messages, data }: PointsContainerProps) {
  const titleLines = messages.title.split('\n');
  // Duplicate for seamless infinite loop
  const marqueeItems = [...data.items, ...data.items];

  return (
    <section className={styles.points}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>

      {/* Infinite marquee — full-width */}
      <div className={styles.marquee}>
        <div className={styles['marquee-track']}>
          {marqueeItems.map((item, i) => (
            <article
              key={i}
              className={styles.card}
              aria-hidden={i >= data.items.length}
            >
              <span className={styles['point-label']}>{item.point}</span>
              <h3 className={styles['card-title']}>
                {item.title.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < item.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className={styles['card-desc']}>
                {item.description.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < item.description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>

              {/* Card visual content */}
              <div className={styles['card-visual']}>
                {item.image && (
                  <div className={styles['card-image-wrap']}>
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className={styles['card-image']}
                    />
                  </div>
                )}
                {item.cryptoItems && (
                  <ul className={styles['crypto-list']}>
                    {item.cryptoItems.map((crypto, k) => (
                      <li key={k} className={styles['crypto-item']}>
                        <div className={styles['crypto-left']}>
                          <Image
                            src={crypto.icon}
                            alt=""
                            width={32}
                            height={32}
                            className={styles['crypto-icon']}
                          />
                          <div className={styles['crypto-info']}>
                            <span className={styles['crypto-name']}>{crypto.name}</span>
                            <span className={styles['crypto-amount']}>{crypto.amount}</span>
                          </div>
                        </div>
                        <span className={styles['crypto-value']}>{crypto.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
