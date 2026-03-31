import styles from '@/assets/styles/components/containers/landing/PointsContainer.module.scss';

interface PointItem {
  label: string;
  title: string;
  description: string;
}

interface PointsContainerProps {
  messages: { title: string };
  data: { items: PointItem[] };
}

export default function PointsContainer({ messages, data }: PointsContainerProps) {
  return (
    <section className={styles.points}>
      <div className={styles.inner}>
        <h2 className={styles['section-title']}>{messages.title}</h2>
        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <span className={styles.label}>{item.label}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
