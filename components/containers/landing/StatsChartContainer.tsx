import styles from '@/assets/styles/components/containers/landing/StatsChartContainer.module.scss';

interface ChartBar {
  label: string;
  value: number;
}

interface StatsChartContainerProps {
  messages: { title: string; subtitle: string };
  data: { bars: ChartBar[] };
}

export default function StatsChartContainer({ messages, data }: StatsChartContainerProps) {
  const maxValue = Math.max(...data.bars.map((b) => b.value));

  return (
    <section className={styles['stats-chart']}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{messages.title}</h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>
        <div className={styles.chart} role="img" aria-label={messages.title}>
          {data.bars.map((bar, index) => (
            <div key={index} className={styles['bar-wrap']}>
              <span className={styles['bar-label']}>{bar.value}%</span>
              <div
                className={styles.bar}
                style={{ height: `${(bar.value / maxValue) * 100}%` }}
              />
              <span className={styles['bar-text']}>{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
