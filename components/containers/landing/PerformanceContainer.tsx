import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PerformanceContainer.module.scss';

interface CryptoCard {
  name: string;
  amount: string;
  rate: string;
  icon: string;
}

interface PerformanceData {
  cryptoCards: CryptoCard[];
}

interface PerformanceMessages {
  title: string;
  subtitle: string;
  annualReturn: string;
}

interface PerformanceContainerProps {
  messages: PerformanceMessages;
  data: PerformanceData;
}

export default function PerformanceContainer({ messages, data }: PerformanceContainerProps) {
  const titleLines = messages.title.split('\n');
  const subtitleLines = messages.subtitle.split('\n');

  // 무한 마키용 — 원본 2번 복제
  const marqueeCards = [...data.cryptoCards, ...data.cryptoCards];

  return (
    <section className={styles.section}>
      {/* 벨 아이콘 */}
      <div className={styles.icon} aria-hidden="true">🔔</div>

      {/* 헤더 — 중앙 정렬 */}
      <h2 className={styles.title}>
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h2>
      <p className={styles.subtitle}>
        {subtitleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < subtitleLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      {/* 무한 마키 슬라이드 */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {marqueeCards.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles['card-top']}>
                <Image src={card.icon} alt="" width={40} height={40} className={styles['card-icon']} />
                <div className={styles['card-info']}>
                  <span className={styles['card-name']}>{card.name}</span>
                  <span className={styles['card-amount']}>{card.amount}</span>
                </div>
              </div>
              <div className={styles['card-bottom']}>
                <span className={styles['rate-label']}>{messages.annualReturn}</span>
                <span className={styles['rate-value']}>{card.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
