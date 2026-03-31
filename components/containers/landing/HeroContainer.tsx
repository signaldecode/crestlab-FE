import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/HeroContainer.module.scss';

interface HeroData {
  headline: string;
  ariaLabel: string;
}

interface HeroContainerProps {
  data: HeroData;
}

export default function HeroContainer({ data }: HeroContainerProps) {
  return (
    <section className={styles.hero} aria-label={data.ariaLabel}>
      <Image
        src="/images/landing/hero-bg.png"
        alt=""
        fill
        priority
        className={styles['bg-image']}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <p className={styles.brand}>Crest Lab</p>
        <h1 className={styles.headline}>
          {data.headline.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < data.headline.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
