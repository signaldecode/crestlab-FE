'use client';

import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/HeroContainer.module.scss';

interface HeroMessages {
  titleHighlight: string;
  titleSuffix: string;
  titleMain: string;
  subtitle: string;
  cta: string;
  ctaAriaLabel: string;
  ariaLabel: string;
  phoneAlt: string;
  tempWidgetAlt: string;
  chartWidgetAlt: string;
}

interface HeroContainerProps {
  messages: HeroMessages;
}

export default function HeroContainer({ messages }: HeroContainerProps) {
  return (
    <section className={styles.hero} aria-label={messages.ariaLabel}>
      {/* Blue background — pinned to bottom */}
      <div className={styles.bg}>
        <Image
          src="/images/landing/hero_bg.jpg"
          alt=""
          fill
          className={styles['bg-image']}
          sizes="100vw"
          priority
        />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles['title-line']}>
            <span className={styles['title-highlight']}>{messages.titleHighlight}</span>
            {messages.titleSuffix}
          </span>
          <span className={styles['title-line']}>{messages.titleMain}</span>
        </h1>

        <p className={styles.subtitle}>{messages.subtitle}</p>

        <a href="#download" className={styles.cta} aria-label={messages.ctaAriaLabel}>
          {messages.cta}
        </a>
      </div>

      {/* Phone mockup — absolutely positioned, NOT fill mode */}
      <div className={styles.phones}>
        <Image
          src="/images/landing/hero_phone.png"
          alt={messages.phoneAlt}
          width={2208}
          height={2217}
          className={styles['phones-image']}
          priority
          sizes="(max-width: 768px) 50vw, (max-width: 1536px) 40vw, 764px"
        />
      </div>

      {/* Floating widgets */}
      <div className={`${styles.floating} ${styles['floating--left']}`}>
        <Image
          src="/images/landing/hero_temp.png"
          alt={messages.tempWidgetAlt}
          fill
          className={styles['floating-image']}
          sizes="(max-width: 1536px) 160px, 220px"
        />
      </div>

      <div className={`${styles.floating} ${styles['floating--right']}`}>
        <Image
          src="/images/landing/hero_chart.png"
          alt={messages.chartWidgetAlt}
          fill
          className={styles['floating-image']}
          sizes="(max-width: 1536px) 160px, 220px"
        />
      </div>

      {/* Decorative crosses */}
      <span className={`${styles.deco} ${styles['deco--1']}`} aria-hidden="true">+</span>
      <span className={`${styles.deco} ${styles['deco--2']}`} aria-hidden="true">+</span>
      <span className={`${styles.deco} ${styles['deco--3']}`} aria-hidden="true">+</span>
      <span className={`${styles.deco} ${styles['deco--4']}`} aria-hidden="true">+</span>
    </section>
  );
}
