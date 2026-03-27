import styles from './PhilosophyContainer.module.scss';

interface PhilosophyStat {
  label: string;
  value: string;
  note: string;
}

interface PhilosophyData {
  title: string;
  subtitle: string;
  stats: PhilosophyStat[];
}

interface PhilosophyContainerProps {
  data: PhilosophyData;
}

export default function PhilosophyContainer({ data }: PhilosophyContainerProps) {
  return (
    <section id="philosophy" className={styles.philosophy}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>
          {data.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < data.subtitle.split('\n').length - 1 && <br />}
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
