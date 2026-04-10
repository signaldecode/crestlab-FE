'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/FeaturedCarouselContainer.module.scss';

/* ── Coin icon components ── */

function IconBitcoin() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f7931a" />
      <path
        d="M21.2 14.1c.3-2-1.2-3-3.3-3.8l.7-2.7-1.6-.4-.6 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1-.2l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 .1.1.1.1.1l-.1 0-1.1 4.5c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.7.4.7-2.8c2.8.5 5 .3 5.9-2.2.7-2-.1-3.2-1.5-3.9 1.1-.3 1.9-1 2.1-2.5zm-3.7 5.2c-.5 2.1-4.1 1-5.3.7l.9-3.8c1.2.3 4.9.9 4.4 3.1zm.5-5.3c-.5 1.9-3.5.9-4.4.7l.8-3.4c1 .2 4.1.7 3.6 2.7z"
        fill="#fff"
      />
    </svg>
  );
}

function IconEthereum() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627eea" />
      <path d="M16 4v9.2l7.8 3.5L16 4z" fill="#fff" fillOpacity="0.6" />
      <path d="M16 4L8.2 16.7 16 13.2V4z" fill="#fff" />
      <path d="M16 21.9v6.1l7.8-10.8L16 21.9z" fill="#fff" fillOpacity="0.6" />
      <path d="M16 28v-6.1l-7.8-4.7L16 28z" fill="#fff" />
      <path d="M16 20.6l7.8-3.9L16 13.2v7.4z" fill="#fff" fillOpacity="0.2" />
      <path d="M8.2 16.7l7.8 3.9v-7.4l-7.8 3.5z" fill="#fff" fillOpacity="0.5" />
    </svg>
  );
}

function IconRipple() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#0085c0" />
      <path
        d="M23.1 9h2.3l-5.7 5.3a5.1 5.1 0 01-7.4 0L6.6 9H9l4.3 4a3 3 0 004.4 0L23.1 9zm-14.2 14H6.6l5.7-5.3a5.1 5.1 0 017.4 0l5.7 5.3h-2.3l-4.3-4a3 3 0 00-4.4 0L8.9 23z"
        fill="#fff"
      />
    </svg>
  );
}

function IconDoge() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#c2a633" />
      <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">D</text>
    </svg>
  );
}

function IconRedstone() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#e74c3c" />
      <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">RS</text>
    </svg>
  );
}

function IconSolana() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#9945ff" />
      <path d="M9 20.5l2-2h12l-2 2H9zm0-5l2-2h12l-2 2H9zm14-3H11l2-2h12l-2 2z" fill="#fff" />
    </svg>
  );
}

/* ── Mock data ── */

interface CoinCard {
  name: string;
  marketCap: string;
  changePercent: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const COINS: CoinCard[] = [
  { name: 'Bitcoin', marketCap: '104,710,000', changePercent: '1.82', trend: 'down', icon: <IconBitcoin /> },
  { name: 'Ethereum', marketCap: '3,231,000', changePercent: '1.82', trend: 'up', icon: <IconEthereum /> },
  { name: 'Ripple', marketCap: '2,031', changePercent: '1.82', trend: 'up', icon: <IconRipple /> },
  { name: 'Dogecoin', marketCap: '1,503', changePercent: '1.82', trend: 'down', icon: <IconDoge /> },
  { name: 'Redstone', marketCap: '215', changePercent: '1.82', trend: 'up', icon: <IconRedstone /> },
  { name: 'Solana', marketCap: '82,500', changePercent: '2.45', trend: 'up', icon: <IconSolana /> },
];

/* ── Component ── */

interface FeaturedCarouselContainerProps {
  messages: {
    title: string;
    subtitle: string;
    changeLabel: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
  };
}

export default function FeaturedCarouselContainer({ messages }: FeaturedCarouselContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.4);
  const pausedRef = useRef(false);
  const accRef = useRef(0);

  const loopItems = [...COINS, ...COINS];

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
          {loopItems.map((coin, i) => (
            <article key={`${coin.name}-${i}`} className={styles['featured-carousel__card']}>
              <div className={styles['featured-carousel__card-top']}>
                <div className={styles['featured-carousel__card-icon']}>
                  {coin.icon}
                </div>
                <div className={styles['featured-carousel__card-info']}>
                  <span className={styles['featured-carousel__card-name']}>{coin.name}</span>
                  <span className={styles['featured-carousel__card-cap']}>{coin.marketCap}</span>
                </div>
              </div>

              <div className={styles['featured-carousel__card-bottom']}>
                <div className={styles['featured-carousel__card-change-group']}>
                  <span className={styles['featured-carousel__card-label']}>{messages.changeLabel}</span>
                  <span
                    className={`${styles['featured-carousel__card-change']} ${
                      coin.trend === 'up'
                        ? styles['featured-carousel__card-change--up']
                        : styles['featured-carousel__card-change--down']
                    }`}
                  >
                    {coin.changePercent}%
                  </span>
                </div>
                <span
                  className={`${styles['featured-carousel__card-arrow']} ${
                    coin.trend === 'up'
                      ? styles['featured-carousel__card-arrow--up']
                      : styles['featured-carousel__card-arrow--down']
                  }`}
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
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
