'use client';

import { useRef } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/InvestmentTypesContainer.module.scss';

interface InvestmentItem {
  category: string;
  title: string;
  image: string;
  bgColor: string;
}

interface InvestmentTypesData {
  items: InvestmentItem[];
}

interface InvestmentTypesMessages {
  title: string;
  subtitle: string;
}

interface InvestmentTypesContainerProps {
  messages: InvestmentTypesMessages;
  data: InvestmentTypesData;
}

export default function InvestmentTypesContainer({ messages, data }: InvestmentTypesContainerProps) {
  const titleLines = messages.title.split('\n');
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth * 0.6;
    sliderRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const loopItems = [...data.items, ...data.items, ...data.items];

  return (
    <section className={styles.section}>
      {/* 한 줄: 좌측 헤더 + 우측 슬라이더 */}
      <div className={styles.row}>
        {/* 좌측 헤더 — 고정 너비 */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles['nav-btn']}
              onClick={() => scroll('left')}
              aria-label="이전 슬라이드"
            >
              &#8249;
            </button>
            <button
              type="button"
              className={`${styles['nav-btn']} ${styles['nav-btn--active']}`}
              onClick={() => scroll('right')}
              aria-label="다음 슬라이드"
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* 우측 슬라이더 — 나머지 공간 + 오른쪽으로 삐져나감 */}
        <div className={styles.slider} ref={sliderRef}>
          {loopItems.map((item, i) => (
            <div key={i} className={`${styles.card} ${styles[`card--${item.bgColor}`]}`}>
              <div className={styles['card-text']}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles['card-title']}>{item.title}</h3>
              </div>
              <div className={styles['card-image']}>
                <Image
                  src={item.image}
                  alt=""
                  width={420}
                  height={400}
                  className={styles.img}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
