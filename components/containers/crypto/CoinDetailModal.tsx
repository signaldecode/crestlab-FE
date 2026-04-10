'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/assets/styles/components/containers/stocks/StockDetailModal.module.scss';
import TradingViewChart, { type TradingViewVariant } from '@/components/charts/TradingViewChart';
import TickerBadge from '@/components/ui/TickerBadge';
import type { CoinItem } from '@/types/finance';

interface CoinDetailModalProps {
  messages: {
    closeAriaLabel: string;
    chartView: {
      overview: string;
      advanced: string;
      ariaLabel: string;
    };
  };
  coin: CoinItem;
  onClose: () => void;
}

const VARIANTS: TradingViewVariant[] = ['overview', 'advanced'];

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CoinDetailModal({ messages, coin, onClose }: CoinDetailModalProps) {
  const [variant, setVariant] = useState<TradingViewVariant>('overview');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !modalRef.current.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      focusable?.[0]?.focus();
    });

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  // TradingView resolves bare crypto pairs like BTCUSD / ETHUSD via its built-in
  // crypto data feeds, no exchange prefix required.
  const tvSymbol = `${coin.symbol.toUpperCase()}USD`;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles['stock-detail']}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coin-detail-title"
    >
      <div className={styles['stock-detail__backdrop']} onClick={onClose} aria-hidden="true" />

      <div className={styles['stock-detail__modal']} ref={modalRef}>
        <button
          type="button"
          className={styles['stock-detail__close']}
          onClick={onClose}
          aria-label={messages.closeAriaLabel}
        >
          ×
        </button>

        <header className={styles['stock-detail__header']}>
          <div className={styles['stock-detail__title-row']}>
            <TickerBadge symbol={coin.symbol} size="md" />
            <h2 id="coin-detail-title" className={styles['stock-detail__symbol']}>
              {coin.symbol}
            </h2>
            <span className={styles['stock-detail__name']}>{coin.name}</span>
          </div>
        </header>

        <div
          className={styles['stock-detail__chart-toggle']}
          role="tablist"
          aria-label={messages.chartView.ariaLabel}
        >
          {VARIANTS.map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={variant === v}
              className={`${styles['stock-detail__chart-toggle-btn']} ${
                variant === v ? styles['stock-detail__chart-toggle-btn--active'] : ''
              }`}
              onClick={() => setVariant(v)}
            >
              {messages.chartView[v]}
            </button>
          ))}
        </div>

        <div className={styles['stock-detail__chart']}>
          <TradingViewChart
            symbol={tvSymbol}
            variant={variant}
            ariaLabel={`${coin.symbol} price chart`}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
