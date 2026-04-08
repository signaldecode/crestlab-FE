'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/assets/styles/components/containers/landing/RollingCounterContainer.module.scss';

interface RollingCounterContainerProps {
  messages: {
    title: string;
    subtitle: string;
    description: string;
    valueAriaLabel: string;
  };
  targetValue: number;
}

const DURATION_MS = 1800;

// ease-out cubic — fast at the start, gentle at the end so the final
// digits visibly settle instead of slamming home.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function RollingCounterContainer({
  messages,
  targetValue,
}: RollingCounterContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionMq.matches) {
      setValue(targetValue);
      return;
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION_MS, 1);
        const eased = easeOutCubic(progress);
        setValue(Math.round(targetValue * eased));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [targetValue]);

  // Pad to the target's digit count so card slots don't reflow during the count.
  const targetDigits = String(targetValue).length;
  const paddedNum = String(value).padStart(targetDigits, '0');
  // Insert thousand separators
  const grouped = paddedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const chars = grouped.split('');

  return (
    <section
      ref={sectionRef}
      className={styles['rolling-counter']}
      aria-labelledby="rolling-counter-title"
    >
      <div className={styles['rolling-counter__inner']}>
        <h2 id="rolling-counter-title" className={styles['rolling-counter__title']}>
          {messages.title}
        </h2>
        <p className={styles['rolling-counter__subtitle']}>{messages.subtitle}</p>

        <div
          className={styles['rolling-counter__display']}
          role="text"
          aria-label={messages.valueAriaLabel}
        >
          {chars.map((char, i) => {
            const isDigit = /\d/.test(char);
            return isDigit ? (
              <span
                key={`d-${i}`}
                className={styles['rolling-counter__digit']}
                aria-hidden="true"
              >
                {char}
              </span>
            ) : (
              <span
                key={`s-${i}`}
                className={styles['rolling-counter__separator']}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
        </div>

        <p className={styles['rolling-counter__description']}>{messages.description}</p>
      </div>
    </section>
  );
}
