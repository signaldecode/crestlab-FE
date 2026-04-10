'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import styles from '@/assets/styles/components/charts/TradingViewChart.module.scss';

export type TradingViewVariant = 'overview' | 'advanced';

interface TradingViewChartProps {
  /**
   * TradingView symbol. Accepts either a bare ticker (`AAPL`, `BTCUSD`) — which
   * TradingView auto-resolves to its primary listing — or an exchange-qualified
   * symbol (`NASDAQ:AAPL`, `BINANCE:BTCUSDT`).
   */
  symbol: string;
  /** Which embed widget to render. Defaults to the lightweight Symbol Overview. */
  variant?: TradingViewVariant;
  /** Default interval. Symbol Overview: "1D"/"1W"/"60". Advanced: "D"/"W"/"60". */
  interval?: string;
  ariaLabel?: string;
}

/** next-intl locale → TradingView locale code. */
const TV_LOCALE_MAP: Record<string, string> = {
  ko: 'kr',
  en: 'en',
  zh: 'zh_CN',
  ja: 'ja',
};

const SCRIPT_SRC: Record<TradingViewVariant, string> = {
  overview: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js',
  advanced: 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js',
};

/**
 * Embeds a TradingView widget. The widget is a script-injected iframe — TradingView
 * owns all rendering, data, and toolbars. We just provide the symbol, locale, and
 * pick which widget variant to render:
 *
 * - `overview` (default): lightweight Symbol Overview with date-range tabs and a
 *   built-in symbol header (price/change). Best for casual viewing.
 * - `advanced`: full Advanced Chart with timeframe toolbar, chart-type toggle,
 *   indicators, and drawing tools. Best for analysis.
 */
export default function TradingViewChart({
  symbol,
  variant = 'overview',
  interval,
  ariaLabel,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset on every (re)mount, symbol change, or variant switch so the widget
    // rebuilds cleanly. Each variant uses a different script and config schema.
    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    container.appendChild(widgetDiv);

    const tvLocale = TV_LOCALE_MAP[locale] ?? 'en';

    const config =
      variant === 'overview'
        ? {
            symbols: [[symbol, `${symbol}|${interval ?? '1D'}`]],
            chartOnly: false,
            width: '100%',
            height: '100%',
            locale: tvLocale,
            colorTheme: 'light',
            autosize: true,
            showVolume: false,
            showMA: false,
            hideDateRanges: false,
            hideMarketStatus: false,
            hideSymbolLogo: false,
            scalePosition: 'right',
            scaleMode: 'Normal',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
            fontSize: '10',
            noTimeScale: false,
            valuesTracking: '1',
            changeMode: 'price-and-percent',
            chartType: 'area',
            lineWidth: 2,
            lineType: 0,
            dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
            support_host: 'https://www.tradingview.com',
          }
        : {
            autosize: true,
            symbol,
            interval: interval ?? 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: tvLocale,
            allow_symbol_change: false,
            hide_side_toolbar: false,
            withdateranges: true,
            details: false,
            hotlist: false,
            calendar: false,
            support_host: 'https://www.tradingview.com',
          };

    const script = document.createElement('script');
    script.src = SCRIPT_SRC[variant];
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [symbol, variant, interval, locale]);

  return (
    <div
      ref={containerRef}
      className={`${styles['tv-chart']} tradingview-widget-container`}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
