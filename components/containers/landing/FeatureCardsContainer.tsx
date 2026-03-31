import styles from '@/assets/styles/components/containers/landing/FeatureCardsContainer.module.scss';

interface FeatureCardItem {
  title: string;
  description: string;
  assets: { name: string; amount: string }[];
}

interface FeatureCardsContainerProps {
  messages: { title: string; subtitle: string };
  data: { items: FeatureCardItem[] };
}

export default function FeatureCardsContainer({ messages, data }: FeatureCardsContainerProps) {
  return (
    <section className={styles['feature-cards']}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{messages.title}</h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>

        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles['card-bg']} />
              <div className={styles['card-content']}>
                <ul className={styles['asset-list']} aria-hidden="true">
                  {item.assets.map((asset, ai) => (
                    <li
                      key={ai}
                      className={`${styles['asset-item']} ${ai === 0 ? styles['asset-item--active'] : ''}`}
                    >
                      <span className={styles['asset-icon']} />
                      <span className={styles['asset-name']}>{asset.name}</span>
                      <span className={styles['asset-amount']}>{asset.amount}</span>
                    </li>
                  ))}
                </ul>
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
