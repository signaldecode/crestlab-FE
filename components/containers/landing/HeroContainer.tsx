import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/HeroContainer.module.scss';

interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  ctaAriaLabel: string;
}

interface HeroLandingData {
  backgroundImage: string;
  phoneImage: string;
  leftCardImage: string;
  rightCardImage: string;
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

        {/* 에셋 영역 */}
        <div className={styles.assets}>
          {/* 좌측 카드 */}
          <div className={styles['asset-left']} aria-hidden="true">
            <Image
              src={landingData.leftCardImage}
              alt=""
              width={280}
              height={280}
              className={styles['asset-left-img']}
            />
          </div>

          {/* 중앙 폰 */}
          <div className={styles.phone}>
            <Image
              src={landingData.phoneImage}
              alt=""
              width={520}
              height={483}
              className={styles['phone-img']}
              priority
              unoptimized
            />
          </div>

          {/* 우측 카드 */}
          <div className={styles['asset-right']} aria-hidden="true">
            <Image
              src={landingData.rightCardImage}
              alt=""
              width={280}
              height={200}
              className={styles['asset-right-img']}
            />
          </div>
        </div>

        <div className={styles['background-text']}>CRAST LAB</div>
      </div>
    </section>
  );
}
