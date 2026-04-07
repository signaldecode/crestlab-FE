import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/HeroContainer.module.scss';

interface MockupCard {
  icon: string;
  name: string;
  amount: string;
  value: string;
}

interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  ctaAriaLabel: string;
}

interface HeroLandingData {
  backgroundImage: string;
  phoneImage: string;
  dashboardImage: string;
  mockupCards: MockupCard[];
}

interface HeroContainerProps {
  data: HeroData;
  landingData: HeroLandingData;
}

export default function HeroContainer({ data, landingData }: HeroContainerProps) {
  const titleLines = data.title.split('\n');

  return (
    <section className={styles.hero} aria-label={titleLines[titleLines.length - 1]}>
      <Image
        src={landingData.backgroundImage}
        alt=""
        fill
        priority
        className={styles['hero-bg']}
        sizes="100vw"
      />

      <div className={styles.inner}>
        {/* 텍스트 */}
        <div className={styles.text}>
          <h1 className={styles.title}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <a href="#download" className={styles['btn-cta']} aria-label={data.ctaAriaLabel}>
            {data.cta}
          </a>
        </div>

        {/* 폰 — 하단 잘림 (margin-bottom 음수) */}
        <div className={styles.phone}>
          <Image
            src={landingData.phoneImage}
            alt=""
            width={547}
            height={452}
            className={styles['phone-img']}
            priority
          />
        </div>

        {/* 카드 — .inner 기준 absolute, 폰과 별도 → 잘리지 않음 */}
        <div className={styles.cards} aria-hidden="true">
          {landingData.mockupCards.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles['card-left']}>
                <Image src={card.icon} alt="" width={40} height={40} className={styles['card-icon']} />
                <div className={styles['card-info']}>
                  <span className={styles['card-name']}>{card.name}</span>
                  <span className={styles['card-amount']}>{card.amount}</span>
                </div>
              </div>
              <span className={styles['card-value']}>{card.value}</span>
            </div>
          ))}
        </div>

        {/* 대시보드 — .inner 기준 absolute */}
        <div className={styles.dashboard} aria-hidden="true">
          <Image
            src={landingData.dashboardImage}
            alt=""
            width={280}
            height={350}
            className={styles['dashboard-img']}
          />
        </div>

        <div className={styles['background-text']}>CRAST LAB</div>
      </div>
    </section>
  );
}
