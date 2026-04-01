import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PortfolioMockupContainer.module.scss';

interface CategoryItem {
  label: string;
}

interface PortfolioMockupContainerProps {
  messages: {
    title: string;
    subtitle: string;
    categories: CategoryItem[];
  };
}

export default function PortfolioMockupContainer({ messages }: PortfolioMockupContainerProps) {
  return (
    <section className={styles.portfolio}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <p className={styles.subtitle}>{messages.subtitle}</p>

        <ul className={styles.categories}>
          {messages.categories.map((cat, i) => (
            <li key={i} className={styles.pill}>
              <span className={styles['pill-icon']} />
              <span className={styles['pill-label']}>{cat.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles['mockup-wrap']}>
          <Image
            src="/images/landing/tablet-mockup.png"
            alt=""
            width={906}
            height={615}
            className={styles.mockup}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
      </div>
    </section>
  );
}
