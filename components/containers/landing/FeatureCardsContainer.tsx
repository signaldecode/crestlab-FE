import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/FeatureCardsContainer.module.scss';

const CARD_IMAGES = [
  { src: '/images/landing/feature-card1-content.png', width: 375, height: 275 },
  { src: '/images/landing/feature-card2-content.png', width: 255, height: 291 },
  { src: '/images/landing/feature-card3-content.png', width: 350, height: 283 },
];

interface FeatureCardItem {
  title: string;
  description: string;
}

interface FeatureCardsContainerProps {
  messages: {
    title: string;
    subtitle: string;
    items: FeatureCardItem[];
  };
}

export default function FeatureCardsContainer({ messages }: FeatureCardsContainerProps) {
  return (
    <section className={styles['feature-cards']}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {messages.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < messages.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>

        <ul className={styles.grid}>
          {messages.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles['card-visual']}>
                <Image
                  src={CARD_IMAGES[index % CARD_IMAGES.length].src}
                  alt=""
                  width={CARD_IMAGES[index % CARD_IMAGES.length].width}
                  height={CARD_IMAGES[index % CARD_IMAGES.length].height}
                  className={styles['card-image']}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{item.title}</h3>
                <p className={styles['card-desc']}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
