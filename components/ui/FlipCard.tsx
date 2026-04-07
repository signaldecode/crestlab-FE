'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/ui/FlipCard.module.scss';

export interface FlipCardProps {
  index: string;
  frontTitle: string;
  frontDescription: string;
  backTitle: string;
  backDescription: string;
  ariaLabel: string;
}

export default function FlipCard({
  index,
  frontTitle,
  frontDescription,
  backTitle,
  backDescription,
  ariaLabel,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      className={`${styles['flip-card']} ${flipped ? styles['flip-card--flipped'] : ''}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-pressed={flipped}
    >
      <div className={styles['flip-card__inner']}>
        {/* Front */}
        <div className={`${styles['flip-card__face']} ${styles['flip-card__face--front']}`}>
          <span className={styles['flip-card__index']}>{index}</span>
          <div className={styles['flip-card__icon']} aria-hidden="true">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <defs>
                <pattern id={`dots-${index}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.4" fill="rgba(255,255,255,0.85)" />
                </pattern>
              </defs>
              <circle cx="40" cy="40" r="36" fill={`url(#dots-${index})`} />
            </svg>
          </div>
          <h3 className={styles['flip-card__title']}>{frontTitle}</h3>
          <p className={styles['flip-card__description']}>{frontDescription}</p>
        </div>

        {/* Back */}
        <div className={`${styles['flip-card__face']} ${styles['flip-card__face--back']}`}>
          <span className={styles['flip-card__index']}>{index}</span>
          <h3 className={styles['flip-card__title']}>{backTitle}</h3>
          <p className={styles['flip-card__description']}>{backDescription}</p>
        </div>
      </div>
    </div>
  );
}
