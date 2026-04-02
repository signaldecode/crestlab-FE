'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/AppScreensContainer.module.scss';

const IMG_BASE = '/images/landing/AppScreens';

const SIDE_PHONES = [
  { id: 0, src: `${IMG_BASE}/Rectangle 33522.svg`, w: 300, h: 527 },
  { id: 1, src: `${IMG_BASE}/Rectangle 33521.svg`, w: 360, h: 644 },
  { id: 3, src: `${IMG_BASE}/Rectangle 33524.svg`, w: 360, h: 644 },
  { id: 4, src: `${IMG_BASE}/Rectangle 33523.svg`, w: 300, h: 527 },
];

const CENTER_ID = 2;
const TOTAL = 5;
const SWIPE_THRESHOLD = 50;

interface AppScreensContainerProps {
  messages: {
    ariaLabel: string;
    badge: string;
    title: string;
    description: string;
  };
}

export default function AppScreensContainer({ messages }: AppScreensContainerProps) {
  const [activeIndex, setActiveIndex] = useState(CENTER_ID);
  const pointerStartX = useRef(0);
  const isDragging = useRef(false);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev < TOTAL - 1 ? prev + 1 : prev));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const diff = pointerStartX.current - e.clientX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev],
  );

  const renderCenterPhone = () => (
    <div className={styles['center-phone']}>
      <Image
        src={`${IMG_BASE}/front-side-view-photo-gray-smartphone-mobile-phone-without-background-template-mockup 2.svg`}
        alt=""
        width={456}
        height={804}
        className={styles['mockup-frame']}
        sizes="(max-width: 768px) 55vw, 320px"
        priority
      />
      <div className={styles['screen-content']}>
        <Image
          src={`${IMG_BASE}/Illustration.svg`}
          alt=""
          width={236}
          height={220}
          className={styles['screen-illustration']}
        />
        <Image
          src={`${IMG_BASE}/매일 환율을 예측하면 상금을 드립니다.svg`}
          alt=""
          width={205}
          height={60}
          className={styles['screen-title-img']}
        />
        <Image
          src={`${IMG_BASE}/소수의 채권을 모두의 채권으로 모두에게 동일한 투자 기회를 제공합니다..svg`}
          alt=""
          width={246}
          height={38}
          className={styles['screen-subtitle-img']}
        />
        <Image
          src={`${IMG_BASE}/Frame 1707484932.svg`}
          alt=""
          width={292}
          height={52}
          className={styles['screen-buttons']}
        />
      </div>
    </div>
  );

  return (
    <section className={styles['app-screens']} aria-label={messages.ariaLabel}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>{messages.badge}</span>
          <h2 className={styles.title}>{messages.title}</h2>
        </header>

        <div className={styles.display}>
          <div
            className={styles.showcase}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { isDragging.current = false; }}
            role="region"
            aria-roledescription="carousel"
          >
            {Array.from({ length: TOTAL }, (_, i) => {
              const offset = i - activeIndex;
              if (Math.abs(offset) > 2) return null;

              const isCenter = i === CENTER_ID;
              const sidePhone = SIDE_PHONES.find((p) => p.id === i);

              return (
                <div
                  key={i}
                  className={styles.phone}
                  data-offset={offset}
                  aria-hidden={offset !== 0}
                >
                  {isCenter ? (
                    renderCenterPhone()
                  ) : sidePhone ? (
                    <Image
                      src={sidePhone.src}
                      alt=""
                      width={sidePhone.w}
                      height={sidePhone.h}
                      className={styles['phone-image']}
                      sizes="(max-width: 768px) 35vw, 240px"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className={styles.content}>
            <p className={styles.description}>{messages.description}</p>

            <div className={styles.navigation}>
              <button
                className={`${styles['nav-button']} ${activeIndex > 0 ? '' : styles['nav-button--disabled']}`}
                aria-label="Previous"
                onClick={goPrev}
                disabled={activeIndex === 0}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`${styles['nav-button']} ${activeIndex < TOTAL - 1 ? styles['nav-button--active'] : styles['nav-button--disabled']}`}
                aria-label="Next"
                onClick={goNext}
                disabled={activeIndex === TOTAL - 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
