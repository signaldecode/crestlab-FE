import styles from '@/assets/styles/components/containers/landing/FeatureCardsContainer.module.scss';
import FlipCard from '@/components/ui/FlipCard';

export interface FeatureCardItem {
  index: string;
  frontTitle: string;
  frontDescription: string;
  frontImage: string;
  backImage: string;
  ariaLabel: string;
}

interface FeatureCardsContainerProps {
  messages: {
    title: string;
    subtitle: string;
  };
  items: FeatureCardItem[];
}

export default function FeatureCardsContainer({ messages, items }: FeatureCardsContainerProps) {
  return (
    <section className={styles['feature-cards']} aria-labelledby="feature-cards-title">
      <div className={styles['feature-cards__inner']}>
        <header className={styles['feature-cards__header']}>
          <h2 id="feature-cards-title" className={styles['feature-cards__title']}>
            {messages.title}
          </h2>
          <p className={styles['feature-cards__subtitle']}>{messages.subtitle}</p>
        </header>

        <ul className={styles['feature-cards__list']}>
          {items.map((item) => (
            <li key={item.index} className={styles['feature-cards__list-item']}>
              <FlipCard
                index={item.index}
                frontTitle={item.frontTitle}
                frontDescription={item.frontDescription}
                frontImage={item.frontImage}
                backImage={item.backImage}
                ariaLabel={item.ariaLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
