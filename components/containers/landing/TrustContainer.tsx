import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/TrustContainer.module.scss';

interface TrustStat {
  label: string;
  value: string;
}

interface TrustContainerProps {
  messages: { title: string; subtitle: string };
  data: { stats: TrustStat[] };
}

export default function TrustContainer({ messages, data }: TrustContainerProps) {
  return (
    <section className={styles.trust}>
      <Image
        src="/images/landing/trust-bg.png"
        alt=""
        fill
        className={styles['bg-image']}
        sizes="100vw"
      />
      <div className={styles.overlay} />
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
        <div className={styles['stats-grid']}>
          {data.stats.map((stat, index) => (
            <div key={index} className={styles['stat-item']}>
              <span className={styles['stat-value']}>{stat.value}</span>
              <span className={styles['stat-label']}>{stat.label}</span>
              <div className={styles['stat-bar']}>
                <div
                  className={styles['stat-bar-fill']}
                  style={{ width: stat.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
