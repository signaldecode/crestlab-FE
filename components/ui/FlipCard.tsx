'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/ui/FlipCard.module.scss';

export interface FlipCardProps {
  index: string;
  frontTitle: string;
  frontDescription: string;
  frontImage: string;
  backImage: string;
  ariaLabel: string;
}

export default function FlipCard({
  index,
  frontTitle,
  frontDescription,
  frontImage,
  backImage,
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
          <span className={styles['flip-card__index']}>{index}.</span>
          <div className={styles['flip-card__icon']} aria-hidden="true">
            <Image src={frontImage} alt="" width={120} height={120} />
          </div>
          <h3 className={styles['flip-card__title']}>{frontTitle}</h3>
          <p className={styles['flip-card__description']}>{frontDescription}</p>
        </div>

        {/* Back */}
        <div className={`${styles['flip-card__face']} ${styles['flip-card__face--back']}`}>
          <div className={styles['flip-card__back-image']} aria-hidden="true">
            <Image src={backImage} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        </div>
      </div>
    </div>
  );
}
