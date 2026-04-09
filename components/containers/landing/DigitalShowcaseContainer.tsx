'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/DigitalShowcaseContainer.module.scss';

interface DigitalShowcaseContainerProps {
  messages: {
    title: string;
    subtitle: string;
    imageAlt: string;
  };
}

/** slot keys map to BEM modifiers for per-device positioning */
const SHOWCASE_SLOTS = [
  { src: '/mainpage/digital-showcase/digitalsection4.svg', width: 260, height: 320, slot: 'card-left' },
  { src: '/mainpage/digital-showcase/digitalsection3.svg', width: 220, height: 440, slot: 'phone-left' },
  { src: '/mainpage/digital-showcase/digitalsection_phone.png', width: 640, height: 647, slot: 'phone-center' },
  { src: '/mainpage/digital-showcase/digitalsection2.svg', width: 260, height: 320, slot: 'card-right' },
] as const;

export default function DigitalShowcaseContainer({
  messages,
}: DigitalShowcaseContainerProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles['digital-showcase']}
      aria-labelledby="digital-showcase-title"
    >
      <div className={styles['digital-showcase__inner']}>
        <div
          className={`${styles['digital-showcase__header']} ${
            inView ? styles['digital-showcase__header--in'] : ''
          }`}
        >
          <span className={styles['digital-showcase__icon']} aria-hidden="true">
            <Image
              src="/mainpage/digital-showcase/digitalsection5.svg"
              alt=""
              width={40}
              height={40}
              unoptimized={true}
            />
          </span>
          <h2
            id="digital-showcase-title"
            className={styles['digital-showcase__title']}
          >
            {messages.title}
          </h2>
          <p className={styles['digital-showcase__subtitle']}>
            {messages.subtitle}
          </p>
        </div>

        <div
          ref={galleryRef}
          className={styles['digital-showcase__gallery']}
          role="img"
          aria-label={messages.imageAlt}
        >
          {SHOWCASE_SLOTS.map((item) => (
            <div
              key={item.src}
              className={`${styles['digital-showcase__device']} ${
                styles[`digital-showcase__device--${item.slot}`] ?? ''
              } ${inView ? styles['digital-showcase__device--in'] : ''}`}
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                aria-hidden="true"
                {...(item.src.endsWith('.png') ? { unoptimized: true } : {})}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
