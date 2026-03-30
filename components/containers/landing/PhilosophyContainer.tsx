import styles from '@/assets/styles/components/containers/landing/PhilosophyContainer.module.scss';

interface PhilosophyStat {
  label: string;
  value: string;
  note: string;
}

interface PhilosophyMessages {
  title: string;
  subtitle: string;
}

interface PhilosophyContainerProps {
  messages: PhilosophyMessages;
  data: { stats: PhilosophyStat[] };
}

export default function PhilosophyContainer({ messages, data }: PhilosophyContainerProps) {
  return (
    <section id="philosophy" className={styles.philosophy}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <p className={styles.subtitle}>
          {messages.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < messages.subtitle.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className={styles.comparison}>
          {data.stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <p className={styles['stat-label']}>{stat.label}</p>
              <p className={styles['stat-value']}>{stat.value}</p>
              <p className={styles['stat-note']}>{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
