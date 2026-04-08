'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from '@/assets/styles/components/containers/landing/RotatingHeadlineContainer.module.scss';

export interface RotatingHeadlineItem {
  before: string;
  after: string;
  icon: 'pencil' | 'medal' | 'bank';
  iconAlt: string;
}

interface RotatingHeadlineContainerProps {
  messages: {
    ariaLabel: string;
  };
  items: RotatingHeadlineItem[];
}

const ICONS: Record<RotatingHeadlineItem['icon'], ReactNode> = {
  pencil: (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <rect x="6" y="32" width="36" height="6" rx="2" fill="#34d399" />
      <path
        d="M10 30 L30 10 L38 18 L18 38 L8 40 Z"
        fill="#1f2937"
        stroke="#f9fafb"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M28 12 L36 20" stroke="#f9fafb" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  medal: (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <path d="M16 4 L24 18 L32 4 Z" fill="#f87171" />
      <circle cx="24" cy="30" r="12" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <text
        x="24"
        y="34"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        fill="#7c2d12"
      >
        1
      </text>
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <path d="M6 18 L24 6 L42 18 Z" fill="#c7d2fe" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <rect x="8" y="20" width="32" height="20" fill="#e0e7ff" stroke="#1e293b" strokeWidth="2" />
      <line x1="14" y1="22" x2="14" y2="38" stroke="#1e293b" strokeWidth="2" />
      <line x1="22" y1="22" x2="22" y2="38" stroke="#1e293b" strokeWidth="2" />
      <line x1="30" y1="22" x2="30" y2="38" stroke="#1e293b" strokeWidth="2" />
      <line x1="38" y1="22" x2="38" y2="38" stroke="#1e293b" strokeWidth="2" />
      <rect x="6" y="40" width="36" height="4" fill="#1e293b" />
    </svg>
  ),
};

// Piecewise mapping from raw scroll progress (0..1) to "focus" position
// (0..items.length-1). Hold ranges keep a message focused for a beat;
// transition ranges interpolate smoothly to the next message.
//
// For 3 items the timeline is:
//   [hold msg0] [transition 0→1] [hold msg1] [transition 1→2] [hold msg2]
// Cyclic offset: an item at index `i` with current focus value sees the
// shortest distance around the wheel, so it can wrap from the bottom slot
// back to the top (and vice-versa). This makes the wheel feel continuous.
function wrapOffset(rawOffset: number, count: number): number {
  if (count <= 1) return rawOffset;
  let wrapped = ((rawOffset % count) + count) % count;
  if (wrapped > count / 2) wrapped -= count;
  return wrapped;
}

function focusFromProgress(progress: number, count: number): number {
  if (count <= 1) return 0;

  // Hold = beat where a message stays focused. Transition = the wheel turn.
  // Larger transitionShare = slower, more deliberate rotations.
  const holdShare = 0.12;
  const transitionShare = 0.32;

  let cursor = 0;
  for (let i = 0; i < count; i++) {
    const holdEnd = cursor + holdShare;
    if (progress < holdEnd) return i;
    cursor = holdEnd;

    if (i === count - 1) return i; // last hold runs to the end

    const transEnd = cursor + transitionShare;
    if (progress < transEnd) {
      const local = (progress - cursor) / transitionShare;
      // Quintic smoothstep — flatter at both ends than cubic, so the wheel
      // eases in and out of motion instead of starting/stopping abruptly.
      const eased = local * local * local * (local * (local * 6 - 15) + 10);
      return i + eased;
    }
    cursor = transEnd;
  }
  return count - 1;
}

export default function RotatingHeadlineContainer({
  messages,
  items,
}: RotatingHeadlineContainerProps) {
  const pinnerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let raf = 0;

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const reset = () => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = '';
        el.style.zIndex = '';
      });
    };

    const update = () => {
      const pinner = pinnerRef.current;
      if (!pinner) return;
      if (motionMq.matches) {
        reset();
        return;
      }

      const rect = pinner.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;

      const focus = focusFromProgress(progress, items.length);

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        // Cyclic offset: items wrap around the wheel so the slot above the
        // first item is filled by the last item, and vice-versa. This is
        // what gives the rotation its continuous, looping feel.
        const offset = wrapOffset(i - focus, items.length);
        const absOffset = Math.abs(offset);

        // 3D wheel: items above rotate forward (top tilts back), below
        // rotate the opposite way. Distance drives translateY, scale and
        // opacity. Off-focus items stay faintly visible behind the focused
        // line — like the picker-wheel mock — instead of fading completely.
        const rotateX = -offset * 38; // deg, gentler so dimmed lines read clearly
        const translateY = offset * 110; // px between rows
        const scale = Math.max(0.85, 1 - absOffset * 0.08);

        // Opacity curve: 1 at focus, ~0.28 at offset ±1, fully gone past ±1.4
        const opacity = Math.max(0, Math.min(1, 1.04 - absOffset * 0.78));

        el.style.transform = `translate3d(-50%, calc(-50% + ${translateY}px), 0) rotateX(${rotateX}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        // Focused item is on top so it visually overlaps the dimmed neighbours
        el.style.zIndex = absOffset < 0.5 ? '3' : absOffset < 1.5 ? '2' : '1';
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    motionMq.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motionMq.removeEventListener('change', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <section
      className={styles['rotating-headline']}
      aria-label={messages.ariaLabel}
    >
      <div ref={pinnerRef} className={styles['rotating-headline__pinner']}>
        <div className={styles['rotating-headline__stage']}>
          <div className={styles['rotating-headline__wheel']}>
            {items.map((item, i) => (
              <div
                key={`${item.before}-${i}`}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className={styles['rotating-headline__item']}
                aria-hidden={i === 0 ? undefined : 'true'}
              >
                <span className={styles['rotating-headline__text']}>
                  {item.before}
                </span>
                <span
                  className={styles['rotating-headline__icon']}
                  role="img"
                  aria-label={item.iconAlt}
                >
                  {ICONS[item.icon]}
                </span>
                <span className={styles['rotating-headline__text']}>
                  {item.after}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
