import SectionTitle from '@/components/ui/SectionTitle';
import styles from './StatsContainer.module.scss';

interface StatItem {
  value: string;
  unit: string;
  label: string;
  description: string;
}

interface StatsMessages {
  title: string;
  subtitle: string;
}

interface StatsContainerProps {
  messages: StatsMessages;
  data: { items: StatItem[] };
}

export default function StatsContainer({ messages, data }: StatsContainerProps) {
  return (
    <section className={styles.stats}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} />
        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles.value}>
                <span className={styles.number}>{item.value}</span>
                <span className={styles.unit}>{item.unit}</span>
              </div>
              <h3 className={styles.label}>{item.label}</h3>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
