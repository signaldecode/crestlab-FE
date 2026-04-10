'use client';

import Link from 'next/link';
import { useRef } from 'react';
import styles from '@/assets/styles/components/containers/landing/NewsPreviewContainer.module.scss';
import type { NewsItem } from '@/types/finance';

interface NewsPreviewContainerProps {
  messages: {
    title: string;
    subtitle: string;
    viewMore: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
    sourceLabel: string;
  };
  data: NewsItem[];
}

export default function NewsPreviewContainer({ messages, data }: NewsPreviewContainerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles['news-preview__card']}`);
    const step = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles['news-preview']} aria-labelledby="news-preview-title">
      <div className={styles['news-preview__inner']}>
        <header className={styles['news-preview__header']}>
          <div className={styles['news-preview__heading']}>
            <h2 id="news-preview-title" className={styles['news-preview__title']}>
              {messages.title}
            </h2>
            <p className={styles['news-preview__subtitle']}>{messages.subtitle}</p>
          </div>

          <div className={styles['news-preview__nav']}>
            <button
              type="button"
              className={styles['news-preview__nav-btn']}
              onClick={() => handleScroll('prev')}
              aria-label={messages.prevAriaLabel}
            >
              <span className={styles['news-preview__nav-arrow--prev']} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles['news-preview__nav-btn']} ${styles['news-preview__nav-btn--filled']}`}
              onClick={() => handleScroll('next')}
              aria-label={messages.nextAriaLabel}
            >
              <span className={styles['news-preview__nav-arrow--next']} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div ref={trackRef} className={styles['news-preview__track']}>
          {data.map((item) => (
            <article key={item.id} className={styles['news-preview__card']}>
              <Link href={`/news/${item.slug}`} className={styles['news-preview__link']}>
                <div className={styles['news-preview__body']}>
                  <div className={styles['news-preview__meta-top']}>
                    <span className={styles['news-preview__category']}>
                      {item.category}
                    </span>
                    <span className={styles['news-preview__source']}>
                      {item.source}
                    </span>
                  </div>
                  <h3 className={styles['news-preview__card-title']}>{item.title}</h3>
                  <time
                    dateTime={item.publishedAt}
                    className={styles['news-preview__date']}
                  >
                    {item.publishedAt.slice(0, 10)}
                  </time>
                </div>
                <div className={styles['news-preview__thumb']} aria-hidden="true">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail} alt="" />
                  ) : null}
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles['news-preview__footer']}>
          <Link href="/news" className={styles['news-preview__view-more']}>
            {messages.viewMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
