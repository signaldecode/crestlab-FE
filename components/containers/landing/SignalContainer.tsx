'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/SignalContainer.module.scss';

interface SignalItem {
  name: string;
  ticker: string;
  amount: string;
  rewardRate: string;
  icon: string;
}

interface SignalContainerProps {
  messages: {
    title: string;
    marquee: string;
    rewardLabel: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
  };
  data: { items: SignalItem[] };
}

export default function SignalContainer({ messages, data }: SignalContainerProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('li')?.offsetWidth ?? 316;
    const gap = 30;
    const distance = cardWidth + gap;
    trackRef.current.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.signal} aria-label={messages.title}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {messages.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < messages.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>

      {/* Subtitle */}
      <p className={styles.subtitle}>
        {messages.marquee}
      </p>

      {/* Coin cards carousel */}
      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles['nav-btn']} ${styles['nav-prev']}`}
          onClick={() => scroll('prev')}
          aria-label={messages.prevAriaLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul ref={trackRef} className={styles.track}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles['card-top']}>
                <span className={styles['card-icon']}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={48}
                    height={48}
                    sizes="48px"
                  />
                </span>
                <div className={styles['card-info']}>
                  <span className={styles['card-name']}>
                    {item.name}({item.ticker})
                  </span>
                  <span className={styles['card-amount']}>{item.amount}</span>
                </div>
              </div>
              <div className={styles['card-bottom']}>
                <span className={styles['reward-label']}>{messages.rewardLabel}</span>
                <span className={styles['reward-value']}>{item.rewardRate}</span>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${styles['nav-btn']} ${styles['nav-next']}`}
          onClick={() => scroll('next')}
          aria-label={messages.nextAriaLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
