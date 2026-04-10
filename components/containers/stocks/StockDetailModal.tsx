'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/assets/styles/components/containers/stocks/StockDetailModal.module.scss';
import TradingViewChart, { type TradingViewVariant } from '@/components/charts/TradingViewChart';
import type { StockItemApi } from '@/types/market';

interface StockDetailModalProps {
  messages: {
    closeAriaLabel: string;
    chartView: {
      overview: string;
      advanced: string;
      ariaLabel: string;
    };
  };
  stock: StockItemApi;
  onClose: () => void;
}

const VARIANTS: TradingViewVariant[] = ['overview', 'advanced'];

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function StockDetailModal({ messages, stock, onClose }: StockDetailModalProps) {
  const [variant, setVariant] = useState<TradingViewVariant>('overview');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // ESC + body scroll lock + focus management
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles['stock-detail']}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stock-detail-title"
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

        {/* Header — symbol + name only. Live price/change comes from the widget. */}
        <header className={styles['stock-detail__header']}>
          <div className={styles['stock-detail__title-row']}>
            <span className={styles['stock-detail__avatar']} aria-hidden="true">
              {stock.symbol.charAt(0)}
            </span>
            <h2 id="stock-detail-title" className={styles['stock-detail__symbol']}>
              {stock.symbol}
            </h2>
            <span className={styles['stock-detail__name']}>{stock.name}</span>
          </div>
        </header>

        {/* Widget variant toggle: Overview (default, lightweight) ↔ Advanced (full toolbar) */}
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

        {/* TradingView widget — owns all data and controls */}
        <div className={styles['stock-detail__chart']}>
          <TradingViewChart
            symbol={stock.symbol}
            variant={variant}
            ariaLabel={`${stock.symbol} price chart`}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
