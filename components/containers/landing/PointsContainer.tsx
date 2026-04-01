import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PointsContainer.module.scss';

const CARD_ILLUSTRATIONS = [
  '/images/landing/feature-card2-content.png',
  '/images/landing/feature-card1-content.png',
  '/images/landing/feature-card3-content.png',
  '/images/landing/feature-card2-content.png',
  '/images/landing/feature-card1-content.png',
];

interface PointItem {
  label: string;
  title: string;
  description: string;
}

interface PointsContainerProps {
  messages: { title: string; subtitle: string };
  data: { items: PointItem[] };
}

export default function PointsContainer({ messages, data }: PointsContainerProps) {
  const cards = data.items;

  return (
    <section className={styles.points} aria-label={messages.title}>
      <div className={styles.header}>
        <h2 className={styles['section-title']}>
          {messages.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < messages.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className={styles['section-subtitle']}>{messages.subtitle}</p>
      </div>
      <div className={styles.track}>
        {/* 원본 */}
        <div className={styles.slide}>
          {cards.map((item, index) => (
            <article key={index} className={styles.card}>
              <div className={styles['card-text']}>
                <span className={styles.label}>{item.label}</span>
                <h3 className={styles.title}>
                  {item.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className={styles.description}>{item.description}</p>
              </div>
              <div className={styles['card-illust']}>
                <Image
                  src={CARD_ILLUSTRATIONS[index % CARD_ILLUSTRATIONS.length]}
                  alt=""
                  width={300}
                  height={280}
                  className={styles['card-image']}
                  sizes="300px"
                />
              </div>
            </article>
          ))}
        </div>
        {/* 복제 (무한 루프) */}
        <div className={styles.slide} aria-hidden="true">
          {cards.map((item, index) => (
            <article key={`dup-${index}`} className={styles.card}>
              <div className={styles['card-text']}>
                <span className={styles.label}>{item.label}</span>
                <h3 className={styles.title}>
                  {item.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className={styles.description}>{item.description}</p>
              </div>
              <div className={styles['card-illust']}>
                <Image
                  src={CARD_ILLUSTRATIONS[index % CARD_ILLUSTRATIONS.length]}
                  alt=""
                  width={300}
                  height={280}
                  className={styles['card-image']}
                  sizes="300px"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
