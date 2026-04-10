'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/FeaturedCarouselContainer.module.scss';
import type { MarketMainItem } from '@/types/market';

/* ── Component ── */

interface FeaturedCarouselContainerProps {
  messages: {
    title: string;
    subtitle: string;
    changeLabel: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
  };
  items: MarketMainItem[];
}

export default function FeaturedCarouselContainer({ messages, items }: FeaturedCarouselContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.4);
  const pausedRef = useRef(false);
  const accRef = useRef(0);

  const loopItems = [...items, ...items];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const tick = () => {
      const el = trackRef.current;
      if (el && !pausedRef.current) {
        accRef.current += speedRef.current;
        if (accRef.current >= 1) {
          const px = Math.floor(accRef.current);
          accRef.current -= px;
          el.scrollLeft += px;
          const half = el.scrollWidth / 2;
          if (el.scrollLeft >= half) {
            el.scrollLeft -= half;
          }
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleNav = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles['featured-carousel__card']}`);
    const step = card ? card.offsetWidth + 24 : 340;
    pausedRef.current = true;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
    setTimeout(() => { pausedRef.current = false; }, 800);
  };

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section className={styles['featured-carousel']} aria-labelledby="featured-carousel-title">
      <header className={styles['featured-carousel__header']}>
        <span className={styles['featured-carousel__icon']} aria-hidden="true">
          <Image
            src="/mainpage/featured/coin.svg"
            alt=""
            width={52}
            height={52}
          />
        </span>
        <h2 id="featured-carousel-title" className={styles['featured-carousel__title']}>
          {messages.title}
        </h2>
        <p className={styles['featured-carousel__subtitle']}>{messages.subtitle}</p>
      </header>

      <div
        className={styles['featured-carousel__viewport']}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles['featured-carousel__fade-left']} aria-hidden="true" />
        <div className={styles['featured-carousel__fade-right']} aria-hidden="true" />

        <div ref={trackRef} className={styles['featured-carousel__track']}>
          {loopItems.map((coin, i) => {
            const isGain = coin.change24h >= 0;
            return (
              <article key={`${coin.symbol}-${i}`} className={styles['featured-carousel__card']}>
                <div className={styles['featured-carousel__card-top']}>
                  <div className={styles['featured-carousel__card-icon']}>
                    <Image
                      src={coin.logoUrl}
                      alt=""
                      width={32}
                      height={32}
                      aria-hidden="true"
                      unoptimized
                    />
                  </div>
                  <div className={styles['featured-carousel__card-info']}>
                    <span className={styles['featured-carousel__card-name']}>{coin.name}</span>
                    <span className={styles['featured-carousel__card-cap']}>
                      ${coin.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className={styles['featured-carousel__card-bottom']}>
                  <div className={styles['featured-carousel__card-change-group']}>
                    <span className={styles['featured-carousel__card-label']}>{messages.changeLabel}</span>
                    <span
                      className={`${styles['featured-carousel__card-change']} ${
                        isGain
                          ? styles['featured-carousel__card-change--up']
                          : styles['featured-carousel__card-change--down']
                      }`}
                    >
                      {isGain ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <span
                    className={`${styles['featured-carousel__card-arrow']} ${
                      isGain
                        ? styles['featured-carousel__card-arrow--up']
                        : styles['featured-carousel__card-arrow--down']
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles['featured-carousel__nav']}>
          <button
            type="button"
            className={styles['featured-carousel__nav-btn']}
            onClick={() => handleNav('prev')}
            aria-label={messages.prevAriaLabel}
          >
            <span className={styles['featured-carousel__nav-arrow--prev']} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles['featured-carousel__nav-btn']} ${styles['featured-carousel__nav-btn--filled']}`}
            onClick={() => handleNav('next')}
            aria-label={messages.nextAriaLabel}
          >
            <span className={styles['featured-carousel__nav-arrow--next']} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
