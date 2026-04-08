'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/IntersectionContainer.module.scss';

interface IntersectionContainerProps {
  messages: {
    leadingText: string;
    trailingText: string;
    imageAlt: string;
  };
  children: ReactNode;
}

export default function IntersectionContainer({ messages, children }: IntersectionContainerProps) {
  const pinnerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLSpanElement>(null);
  const leadingRef = useRef<HTMLSpanElement>(null);
  const trailingRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let snapTimer: number | null = null;
    let snapLockTimer: number | null = null;
    let snapping = false;
    let lastScrollY = window.scrollY;
    let lastDirection: 1 | -1 = 1;

    const clamp = (n: number, min = 0, max = 1) => Math.min(Math.max(n, min), max);

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Coarse pointer = touch device. We let touch users scroll freely without
    // hijacking — auto-snap is desktop/wheel only where the morph "stuck"
    // feeling is most pronounced.
    const touchMq = window.matchMedia('(pointer: coarse)');

    const resetInlineStyles = () => {
      const targets = [
        introRef.current,
        imageRef.current,
        leadingRef.current,
        trailingRef.current,
        overlayRef.current,
        cardsRef.current,
      ];
      targets.forEach((el) => {
        if (!el) return;
        el.style.opacity = '';
        el.style.transform = '';
      });
      if (cardsRef.current) cardsRef.current.style.pointerEvents = '';
    };

    // After the user stops scrolling mid-morph, smoothly scroll the page
    // to either the start (progress 0) or the end (progress 1) of the
    // pinner — whichever direction they were last moving. This makes the
    // morph naturally complete instead of freezing in an awkward halfway
    // state when scrolling pauses.
    const checkSnap = () => {
      if (snapping || motionMq.matches || touchMq.matches) return;

      const pinner = pinnerRef.current;
      if (!pinner) return;

      const rect = pinner.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      if (total <= 0) return;

      const scrolled = -rect.top;
      // Only snap when we're actually inside the pinner's pin range.
      if (scrolled <= 0 || scrolled >= total) return;

      const progress = scrolled / total;
      // Stable enough at the edges — leave it alone.
      if (progress < 0.05 || progress > 0.95) return;

      const targetProgress = lastDirection > 0 ? 1 : 0;
      const delta = (targetProgress - progress) * total;
      const targetY = Math.max(0, window.scrollY + delta);

      snapping = true;
      window.scrollTo({ top: targetY, behavior: 'smooth' });

      if (snapLockTimer) window.clearTimeout(snapLockTimer);
      // Long enough for smooth scroll to settle, then re-arm.
      snapLockTimer = window.setTimeout(() => {
        snapping = false;
      }, 700);
    };

    const update = () => {
      const pinner = pinnerRef.current;
      const image = imageRef.current;
      if (!pinner || !image) return;
      if (motionMq.matches) {
        resetInlineStyles();
        return;
      }

      const rect = pinner.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = clamp(-rect.top, 0, Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;

      // offsetWidth gives the un-transformed CSS box size — required because
      // getBoundingClientRect would feed back the already-scaled size and break
      // the target scale calculation.
      const baseSize = Math.min(image.offsetWidth, image.offsetHeight) || 1;
      const coverSize = Math.max(window.innerWidth, viewportH) * 1.8;
      const targetScale = coverSize / baseSize;

      const eased = progress * progress; // ease-in punch
      const scale = 1 + (targetScale - 1) * eased;

      // Phase 1 (0   – 0.45): texts fade out, image expands on white
      // Phase 2 (0.45 – 0.7): blue overlay covers, image fades, intro fades
      // Phase 3 (0.6  – 1.0): cards layer fades in over the blue
      const textOpacity = clamp(1 - progress * 2.4);
      const imageOpacity = clamp(1 - (progress - 0.5) * 3.5);
      const introOpacity = clamp(1 - (progress - 0.55) * 3);
      const overlayOpacity = clamp((progress - 0.4) * 3);
      const cardsOpacity = clamp((progress - 0.6) * 3);
      const cardsTranslate = (1 - cardsOpacity) * 24; // px slide-up

      image.style.transform = `scale(${scale})`;
      image.style.opacity = String(imageOpacity);
      if (leadingRef.current) leadingRef.current.style.opacity = String(textOpacity);
      if (trailingRef.current) trailingRef.current.style.opacity = String(textOpacity);
      if (introRef.current) introRef.current.style.opacity = String(introOpacity);
      if (overlayRef.current) overlayRef.current.style.opacity = String(overlayOpacity);
      if (cardsRef.current) {
        cardsRef.current.style.opacity = String(cardsOpacity);
        cardsRef.current.style.transform = `translateY(${cardsTranslate}px)`;
        cardsRef.current.style.pointerEvents = cardsOpacity > 0.85 ? 'auto' : 'none';
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY) lastDirection = 1;
      else if (currentY < lastScrollY) lastDirection = -1;
      lastScrollY = currentY;

      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          update();
        });
      }

      // Re-arm the snap timer on every scroll event. checkSnap fires only
      // after the user has been idle for ~180ms, then completes the morph.
      if (snapTimer !== null) window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(checkSnap, 300);
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
      if (snapTimer !== null) window.clearTimeout(snapTimer);
      if (snapLockTimer !== null) window.clearTimeout(snapLockTimer);
    };
  }, []);

  return (
    <section className={styles['intersection']} aria-labelledby="intersection-title">
      <div ref={pinnerRef} className={styles['intersection__pinner']}>
        <div className={styles['intersection__stage']}>
          <div ref={introRef} className={styles['intersection__intro']}>
            <h2 id="intersection-title" className={styles['intersection__title']}>
              <span ref={leadingRef} className={styles['intersection__text']}>
                {messages.leadingText}
              </span>
              <span ref={imageRef} className={styles['intersection__image']}>
                <Image
                  src="/mainpage/flipcardabove.svg"
                  alt={messages.imageAlt}
                  width={128}
                  height={128}
                  priority
                />
              </span>
              <span ref={trailingRef} className={styles['intersection__text']}>
                {messages.trailingText}
              </span>
            </h2>
          </div>
          <div
            ref={overlayRef}
            className={styles['intersection__overlay']}
            aria-hidden="true"
          />
          <div ref={cardsRef} className={styles['intersection__cards']}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
