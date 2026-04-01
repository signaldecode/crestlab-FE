import styles from '@/assets/styles/components/containers/landing/CounterContainer.module.scss';

interface CounterContainerProps {
  messages: { title: string; subtitle: string };
  data: { value: string };
}

export default function CounterContainer({ messages, data }: CounterContainerProps) {
  const digits = data.value.split('');
  return (
    <section className={styles.counter}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <div className={styles.display} aria-label={data.value}>
          {digits.map((char, i) => (
            char === ',' ? (
              <span key={i} className={styles.comma}>{char}</span>
            ) : (
              <span key={i} className={styles.digit}>{char}</span>
            )
          ))}
        </div>
        <p className={styles.subtitle}>{messages.subtitle}</p>
      </div>
    </section>
  );
}
