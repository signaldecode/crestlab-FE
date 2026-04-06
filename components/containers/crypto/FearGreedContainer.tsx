import styles from '@/assets/styles/components/containers/crypto/FearGreedContainer.module.scss';
import type { FearGreedData } from '@/types/finance';

interface FearGreedContainerProps {
  messages: {
    title: string;
    labels: Record<string, string>;
  };
  data: FearGreedData;
}

export default function FearGreedContainer({ messages, data }: FearGreedContainerProps) {
  const getLevel = (value: number) => {
    if (value <= 25) return 'extreme-fear';
    if (value <= 45) return 'fear';
    if (value <= 55) return 'neutral';
    if (value <= 75) return 'greed';
    return 'extreme-greed';
  };

  const level = getLevel(data.value);

  return (
    <div className={styles['fear-greed']} aria-label={messages.title}>
      <h3 className={styles['fear-greed__title']}>{messages.title}</h3>
      <div className={styles['fear-greed__gauge']}>
        <span className={styles['fear-greed__value']}>{data.value}</span>
        <span className={`${styles['fear-greed__label']} ${styles[`fear-greed__label--${level}`]}`}>
          {messages.labels[level] ?? data.label}
        </span>
      </div>
    </div>
  );
}
