'use client';

import { useRef } from 'react';
import styles from '@/assets/styles/components/containers/landing/FeaturedCarouselContainer.module.scss';

interface FeaturedItem {
  symbol: string;
  name: string;
}

interface FeaturedCarouselContainerProps {
  messages: {
    title: string;
    subtitle: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
  };
  items: FeaturedItem[];
}

export default function FeaturedCarouselContainer({ messages, items }: FeaturedCarouselContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles['featured-carousel__card']}`);
    const step = card ? card.offsetWidth + 32 : 348;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  };

  return (
    <section className={styles['featured-carousel']} aria-labelledby="featured-carousel-title">
      <header className={styles['featured-carousel__header']}>
        <span className={styles['featured-carousel__icon']} aria-hidden="true" />
        <h2 id="featured-carousel-title" className={styles['featured-carousel__title']}>
          {messages.title}
        </h2>
        <p className={styles['featured-carousel__subtitle']}>{messages.subtitle}</p>
      </header>

      <div className={styles['featured-carousel__viewport']}>
        <div ref={trackRef} className={styles['featured-carousel__track']}>
          {items.map((item) => (
            <article key={item.symbol} className={styles['featured-carousel__card']}>
              <div className={styles['featured-carousel__card-top']}>
                <span className={styles['featured-carousel__symbol']}>{item.symbol}</span>
                <span className={styles['featured-carousel__name']}>{item.name}</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles['featured-carousel__nav']}>
          <button
            type="button"
            className={styles['featured-carousel__nav-btn']}
            onClick={() => handleScroll('prev')}
            aria-label={messages.prevAriaLabel}
          >
            <span className={styles['featured-carousel__nav-arrow--prev']} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles['featured-carousel__nav-btn']} ${styles['featured-carousel__nav-btn--filled']}`}
            onClick={() => handleScroll('next')}
            aria-label={messages.nextAriaLabel}
          >
            <span className={styles['featured-carousel__nav-arrow--next']} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
