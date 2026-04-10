'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

interface FadeInWrapProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  as?: keyof HTMLElementTagNameMap;
}

const baseStyle: CSSProperties = {
  opacity: 0,
  transform: 'translateY(24px)',
  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
};

const inStyle: CSSProperties = {
  opacity: 1,
  transform: 'translateY(0)',
};

export default function FadeInWrap({
  children,
  className = '',
  threshold = 0.15,
  as: Tag = 'div',
}: FadeInWrapProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={className} style={inView ? inStyle : baseStyle}>
      {children}
    </Tag>
  );
}
