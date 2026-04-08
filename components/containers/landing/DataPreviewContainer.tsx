'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from '@/assets/styles/components/containers/landing/DataPreviewContainer.module.scss';

interface CopyBlock {
  eyebrow: string;
  title: string;
  description: string;
}

interface DataPreviewContainerProps {
  messages: {
    rowCoins: CopyBlock;
    rowChart: CopyBlock;
    barLabels: {
      btcDominance: string;
      sp500: string;
      btcAttractiveness: string;
    };
    coinCardAriaLabel: string;
    barChartAriaLabel: string;
  };
}

// ─────────────────────────────────────────────────────────────
// Mock data — placeholder values fixed for now. Real values will
// come from the API later (CoinGecko proxy etc.).
// ─────────────────────────────────────────────────────────────

type SparkTrend = 'up' | 'down';

interface CoinRow {
  symbol: string;
  name: string;
  ticker: string;
  price: string;
  change: string;
  trend: SparkTrend;
  icon: ReactNode;
}

const SPARK_UP =
  'M0 22 L10 18 L20 20 L30 12 L40 14 L50 8 L60 11 L70 5';
const SPARK_DOWN =
  'M0 6 L10 9 L20 7 L30 14 L40 12 L50 19 L60 16 L70 22';

function CoinIconBitcoin() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f7931a" />
      <text
        x="16"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        textAnchor="middle"
        fill="#ffffff"
      >
        ₿
      </text>
    </svg>
  );
}

function CoinIconEth() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627eea" />
      <g fill="#ffffff">
        <path d="M16 5 L16 13.5 L23 17 Z" opacity="0.85" />
        <path d="M16 5 L9 17 L16 13.5 Z" />
        <path d="M16 18.5 L16 26 L23 18.5 L16 22 Z" opacity="0.85" />
        <path d="M16 18.5 L9 18.5 L16 22 Z" />
      </g>
    </svg>
  );
}

function CoinIconBand() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#516aff" />
      <text
        x="16"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        fill="#ffffff"
      >
        Ⓑ
      </text>
    </svg>
  );
}

function CoinIconAda() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#0033ad" />
      <g fill="#ffffff">
        <circle cx="16" cy="9" r="1.6" />
        <circle cx="16" cy="23" r="1.6" />
        <circle cx="9" cy="13" r="1.4" />
        <circle cx="23" cy="13" r="1.4" />
        <circle cx="9" cy="19" r="1.4" />
        <circle cx="23" cy="19" r="1.4" />
        <circle cx="16" cy="16" r="2" />
      </g>
    </svg>
  );
}

const COINS: CoinRow[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    ticker: 'BTC',
    price: '$2,509.75',
    change: '+9.77%',
    trend: 'up',
    icon: <CoinIconBitcoin />,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    ticker: 'ETH',
    price: '$2,509.75',
    change: '-21.00%',
    trend: 'down',
    icon: <CoinIconEth />,
  },
  {
    symbol: 'BAND',
    name: 'Band Protocol',
    ticker: 'BAND',
    price: '$553.06',
    change: '-22.97%',
    trend: 'down',
    icon: <CoinIconBand />,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    ticker: 'ADA',
    price: '$105.06',
    change: '+16.31%',
    trend: 'up',
    icon: <CoinIconAda />,
  },
];

interface BarItem {
  key: 'btcDominance' | 'sp500' | 'btcAttractiveness';
  value: number;
  highlighted: boolean;
}

const BARS: BarItem[] = [
  { key: 'btcDominance', value: 30, highlighted: false },
  { key: 'sp500', value: 80, highlighted: true },
  { key: 'btcAttractiveness', value: 62, highlighted: false },
];

const COIN_STAGGER_MS = 180;
const BAR_DURATION_MS = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// ─────────────────────────────────────────────────────────────
// Hook: trigger a one-shot reveal when the element enters the viewport
// ─────────────────────────────────────────────────────────────
function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─────────────────────────────────────────────────────────────
// Coin card — staggered fade-in of each row
// ─────────────────────────────────────────────────────────────
function CoinCard({ ariaLabel }: { ariaLabel: string }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);

  return (
    <div
      ref={ref}
      className={styles['data-preview__coin-card']}
      role="group"
      aria-label={ariaLabel}
    >
      <ul className={styles['data-preview__coin-list']}>
        {COINS.map((coin, i) => (
          <li
            key={coin.symbol}
            className={`${styles['data-preview__coin-row']} ${
              inView ? styles['data-preview__coin-row--in'] : ''
            }`}
            style={{ transitionDelay: inView ? `${i * COIN_STAGGER_MS}ms` : '0ms' }}
          >
            <span className={styles['data-preview__coin-icon']}>{coin.icon}</span>
            <div className={styles['data-preview__coin-meta']}>
              <span className={styles['data-preview__coin-name']}>{coin.name}</span>
              <span className={styles['data-preview__coin-ticker']}>{coin.ticker}</span>
            </div>
            <svg
              viewBox="0 0 70 28"
              width="70"
              height="28"
              className={styles['data-preview__coin-spark']}
              aria-hidden="true"
            >
              <path
                d={coin.trend === 'up' ? SPARK_UP : SPARK_DOWN}
                fill="none"
                stroke={coin.trend === 'up' ? '#10b981' : '#ef4444'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className={styles['data-preview__coin-values']}>
              <span className={styles['data-preview__coin-price']}>{coin.price}</span>
              <span
                className={`${styles['data-preview__coin-change']} ${
                  coin.trend === 'up'
                    ? styles['data-preview__coin-change--up']
                    : styles['data-preview__coin-change--down']
                }`}
              >
                {coin.change}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bar chart — animated count-up + bar grow on viewport entry
// ─────────────────────────────────────────────────────────────
function BarChart({
  ariaLabel,
  labels,
}: {
  ariaLabel: string;
  labels: DataPreviewContainerProps['messages']['barLabels'];
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.35);
  const [values, setValues] = useState<number[]>(() => BARS.map(() => 0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionMq.matches) {
      setValues(BARS.map((b) => b.value));
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / BAR_DURATION_MS, 1);
      const eased = easeOutCubic(progress);
      setValues(BARS.map((b) => Math.round(b.value * eased)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className={styles['data-preview__bar-card']}
      role="group"
      aria-label={ariaLabel}
    >
      <div className={styles['data-preview__bars']}>
        {BARS.map((bar, i) => (
          <div key={bar.key} className={styles['data-preview__bar-col']}>
            <span className={styles['data-preview__bar-value']}>{values[i]}%</span>
            <div
              className={`${styles['data-preview__bar']} ${
                bar.highlighted ? styles['data-preview__bar--highlight'] : ''
              }`}
              style={{ height: `${values[i]}%` }}
            />
            <span className={styles['data-preview__bar-label']}>{labels[bar.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable copy block (eyebrow + h2 + description)
// ─────────────────────────────────────────────────────────────
function CopySide({ copy, headingId }: { copy: CopyBlock; headingId: string }) {
  return (
    <div className={styles['data-preview__copy']}>
      <span className={styles['data-preview__eyebrow']}>{copy.eyebrow}</span>
      <h2 id={headingId} className={styles['data-preview__title']}>
        {copy.title}
      </h2>
      <p className={styles['data-preview__description']}>{copy.description}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main container
// ─────────────────────────────────────────────────────────────
export default function DataPreviewContainer({ messages }: DataPreviewContainerProps) {
  return (
    <section className={styles['data-preview']} aria-labelledby="data-preview-coins-title">
      <div className={styles['data-preview__inner']}>
        {/* Row 1: copy left, coin card right (visual is right on desktop) */}
        <div
          className={`${styles['data-preview__row']} ${styles['data-preview__row--coins']}`}
        >
          <CopySide copy={messages.rowCoins} headingId="data-preview-coins-title" />
          <CoinCard ariaLabel={messages.coinCardAriaLabel} />
        </div>

        {/* Row 2: chart left, copy right */}
        <div
          className={`${styles['data-preview__row']} ${styles['data-preview__row--chart']}`}
        >
          <BarChart ariaLabel={messages.barChartAriaLabel} labels={messages.barLabels} />
          <CopySide copy={messages.rowChart} headingId="data-preview-chart-title" />
        </div>
      </div>
    </section>
  );
}
