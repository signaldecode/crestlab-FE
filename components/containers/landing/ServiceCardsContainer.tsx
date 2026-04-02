import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/ServiceCardsContainer.module.scss';

const CARD_IMAGES = [
  '/images/landing/service-card1.png',
  '/images/landing/service-card2.png',
  '/images/landing/service-card3.png',
];

interface ServiceCardItem { title: string; description: string; }

interface ServiceCardsContainerProps {
  messages: { badge: string; title: string; items: ServiceCardItem[] };
}

export default function ServiceCardsContainer({ messages }: ServiceCardsContainerProps) {
  return (
    <section className={styles['service-cards']}>
      <div className={styles.inner}>
        <span className={styles.badge}>{messages.badge}</span>
        <h2 className={styles.title}>
          {messages.title.split('\n').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <ul className={styles.grid}>
          {messages.items.map((item, i) => (
            <li key={i} className={styles.card}>
              <div className={styles['card-image-wrap']}>
                <Image
                  src={CARD_IMAGES[i]}
                  alt="서비스 카드 이미지"
                  width={864}
                  height={560}
                  className={styles['card-image']}
                  sizes="(max-width: 768px) 100vw, 432px"
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
