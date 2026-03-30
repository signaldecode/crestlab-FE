import styles from '@/assets/styles/components/containers/landing/HeroContainer.module.scss';

interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  primaryCtaAriaLabel: string;
  secondaryCtaAriaLabel: string;
}

interface HeroContainerProps {
  data: HeroData;
}

export default function HeroContainer({ data }: HeroContainerProps) {
  return (
    <section className={styles.hero} aria-label={data.badge}>
      <div className={styles.inner}>
        <span className={styles.badge}>{data.badge}</span>
        <h1 className={styles.title}>
          {data.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < data.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.subtitle}>
          {data.subtitle.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < data.subtitle.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        <div className={styles.cta}>
          <a href="/contact" className={styles['btn-primary']} aria-label={data.primaryCtaAriaLabel}>
            {data.primaryCta}
          </a>
          <a href="#philosophy" className={styles['btn-secondary']} aria-label={data.secondaryCtaAriaLabel}>
            {data.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
