'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/AppScreensContainer.module.scss';

const IMG_BASE = '/images/landing/AppScreens';

interface SlideData {
  id: number;
  type: 'side' | 'center';
  src?: string;
  w?: number;
  h?: number;
}

const SLIDES: SlideData[] = [
  { id: 0, type: 'side', src: `${IMG_BASE}/Rectangle 33522.svg`, w: 300, h: 527 },
  { id: 1, type: 'side', src: `${IMG_BASE}/Rectangle 33521.svg`, w: 360, h: 644 },
  { id: 2, type: 'center' },
  { id: 3, type: 'side', src: `${IMG_BASE}/Rectangle 33524.svg`, w: 360, h: 644 },
  { id: 4, type: 'side', src: `${IMG_BASE}/Rectangle 33523.svg`, w: 300, h: 527 },
];

const TOTAL = SLIDES.length;
const START_INDEX = 2;
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 0.25;

function getCircularOffset(slideIndex: number, activeIndex: number): number {
  let diff = slideIndex - activeIndex;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;
  return diff;
}

function wrapIndex(index: number): number {
  return ((index % TOTAL) + TOTAL) % TOTAL;
}

interface AppScreensContainerProps {
  messages: {
    ariaLabel: string;
    badge: string;
    title: string;
    description: string;
  };
}

export default function AppScreensContainer({ messages }: AppScreensContainerProps) {
  const [activeIndex, setActiveIndex] = useState(START_INDEX);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const pointerStartTime = useRef(0);
  const dragging = useRef(false);
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev + 1));
  }, []);

  // Touch event로 수평 스와이프 직접 처리 (pointer events 보완)
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let locked: 'horizontal' | 'vertical' | null = null;
    let touchDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      locked = null;
      touchDragging = true;
      setIsDragging(true);
      setDragDelta(0);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchDragging) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (!locked) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          locked = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
        }
      }

      if (locked === 'horizontal') {
        e.preventDefault();
        setDragDelta(dx);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchDragging) return;
      touchDragging = false;
      setIsDragging(false);
      setDragDelta(0);

      if (locked !== 'horizontal') return;

      const touch = e.changedTouches[0];
      const diff = startX - touch.clientX;
      const elapsed = Date.now() - startTime;
      const velocity = Math.abs(diff) / Math.max(elapsed, 1);

      if (velocity > VELOCITY_THRESHOLD || Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) setActiveIndex((prev) => wrapIndex(prev + 1));
        else setActiveIndex((prev) => wrapIndex(prev - 1));
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // 마우스 드래그 (데스크탑)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    pointerStartTime.current = Date.now();
    dragging.current = true;
    directionLocked.current = null;
    setIsDragging(true);
    setDragDelta(0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - pointerStartX.current;
    const dy = e.clientY - pointerStartY.current;

    if (!directionLocked.current) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        directionLocked.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
      }
    }

    if (directionLocked.current === 'horizontal') {
      setDragDelta(dx);
    }
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
      setDragDelta(0);

      if (directionLocked.current !== 'horizontal' && directionLocked.current !== null) return;

      const diff = pointerStartX.current - e.clientX;
      const elapsed = Date.now() - pointerStartTime.current;
      const velocity = Math.abs(diff) / Math.max(elapsed, 1);

      if (velocity > VELOCITY_THRESHOLD || Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev],
  );

  const handleMouseLeave = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      setIsDragging(false);
      setDragDelta(0);
    }
  }, []);

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
            ref={showcaseRef}
            className={`${styles.showcase} ${isDragging ? styles['showcase--dragging'] : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-roledescription="carousel"
          >
            {SLIDES.map((slide, i) => {
              const offset = getCircularOffset(i, activeIndex);
              if (Math.abs(offset) > 2) return null;

              return (
                <div
                  key={slide.id}
                  className={styles.phone}
                  data-offset={offset}
                  aria-hidden={offset !== 0}
                  style={
                    isDragging
                      ? { transform: `translateX(calc(var(--tx, 0px) + ${dragDelta}px)) scale(var(--sc, 1))` }
                      : undefined
                  }
                >
                  {slide.type === 'center' ? (
                    renderCenterPhone()
                  ) : slide.src ? (
                    <Image
                      src={slide.src}
                      alt=""
                      width={slide.w!}
                      height={slide.h!}
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
                className={styles['nav-button']}
                aria-label="Previous"
                onClick={goPrev}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`${styles['nav-button']} ${styles['nav-button--active']}`}
                aria-label="Next"
                onClick={goNext}
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
