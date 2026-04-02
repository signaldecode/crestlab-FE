import styles from '@/assets/styles/components/containers/landing/FeatureShowcaseContainer.module.scss';

interface FeatureItem { title: string; description: string; }

interface FeatureShowcaseContainerProps {
  messages: { title: string; items: FeatureItem[] };
}

export default function FeatureShowcaseContainer({ messages }: FeatureShowcaseContainerProps) {
  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}</h2>
        <div className={styles.grid}>
          {messages.items.map((item, i) => (
            <article key={i} className={styles.card}>
              <div className={styles['card-preview']} />
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{item.title}</h3>
                <p className={styles['card-desc']}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
