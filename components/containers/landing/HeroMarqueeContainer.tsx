import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/HeroMarqueeContainer.module.scss';

interface HeroMarqueeContainerProps {
  messages: { marqueeText: string; ariaLabel: string };
}

export default function HeroMarqueeContainer({ messages }: HeroMarqueeContainerProps) {
  const items = Array(6).fill(messages.marqueeText);
  return (
    <section className={styles.hero} aria-label={messages.ariaLabel}>
      <div className={styles['bg-wrap']}>
        <Image src="/images/landing/hero-stock-market.png" alt="" fill className={styles['bg-image']} sizes="100vw" priority />
        <div className={styles.overlay} />
      </div>
      <div className={styles.inner}>
        <p className={styles.brand}>CREST LAB</p>
        <div className={styles.marquee}>
          <div className={styles['marquee-track']}>
            <div className={styles['marquee-slide']}>
              {items.map((text, i) => (
                <span key={i} className={styles['marquee-text']}>{text}</span>
              ))}
            </div>
            <div className={styles['marquee-slide']} aria-hidden="true">
              {items.map((text, i) => (
                <span key={`d-${i}`} className={styles['marquee-text']}>{text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
