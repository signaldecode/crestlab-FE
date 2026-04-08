'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import styles from '@/assets/styles/components/containers/stocks/StockDetailModal.module.scss';
import TickerBadge from '@/components/ui/TickerBadge';
import type { CoinHistory, CoinItem, CoinPeriod, OHLCV } from '@/types/finance';

interface CoinDetailModalProps {
  messages: {
    currentPrice: string;
    periodOpen: string;
    volume24h: string;
    closeAriaLabel: string;
    periods: Record<CoinPeriod, string>;
    tooltipDate: string;
    tooltipOpen: string;
    tooltipHigh: string;
    tooltipLow: string;
    tooltipClose: string;
    tooltipVolume: string;
    chartType: {
      line: string;
      candle: string;
      ariaLabel: string;
    };
  };
  coin: CoinItem;
  onClose: () => void;
}

interface ChartDatum extends OHLCV {
  range: [number, number];
  mid: number;
}

type ChartType = 'line' | 'candle';

const PERIODS: CoinPeriod[] = ['1w', '1m', '3m', '1y', '5y'];
const CHART_TYPES: ChartType[] = ['line', 'candle'];

const GAIN_COLOR = '#16a34a';
const LOSS_COLOR = '#dc2626';
const SYNC_ID = 'coinDetailChartSync';

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Coin prices range from $80,000 (BTC) down to $0.0000091 (PEPE). */
function formatCoinPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  if (n >= 0.01) return n.toFixed(4);
  if (n >= 0.0001) return n.toFixed(6);
  return n.toPrecision(3);
}

function formatCoinPriceCompact(n: number): string {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (n >= 1) return n.toFixed(2);
  if (n >= 0.01) return n.toFixed(3);
  return n.toPrecision(2);
}

function formatVolumeCompact(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toString()}`;
}

function formatDateForPeriod(iso: string, period: CoinPeriod): string {
  const d = new Date(iso + 'T00:00:00Z');
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  if (period === '1w' || period === '1m' || period === '3m') return `${month}/${day}`;
  if (period === '1y') return `${year}.${String(month).padStart(2, '0')}`;
  return `${year}`;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartDatum }>;
  labels: {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
  onHover: (item: ChartDatum | null) => void;
  visible?: boolean;
}

function ChartTooltip({ active, payload, labels, onHover, visible = true }: ChartTooltipProps) {
  useEffect(() => {
    if (active && payload && payload.length) {
      onHover(payload[0].payload);
    } else {
      onHover(null);
    }
  });

  if (!visible || !active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  return (
    <div className={styles['stock-detail__tooltip']}>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.date}</span>
        <span>{item.date}</span>
      </div>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.open}</span>
        <span>${formatCoinPrice(item.open)}</span>
      </div>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.high}</span>
        <span>${formatCoinPrice(item.high)}</span>
      </div>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.low}</span>
        <span>${formatCoinPrice(item.low)}</span>
      </div>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.close}</span>
        <span>${formatCoinPrice(item.close)}</span>
      </div>
      <div className={styles['stock-detail__tooltip-row']}>
        <span className={styles['stock-detail__tooltip-label']}>{labels.volume}</span>
        <span>{formatVolumeCompact(item.volume)}</span>
      </div>
    </div>
  );
}

interface CandleShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ChartDatum;
}

function Candle(props: CandleShapeProps) {
  const { x, y, width, height, payload } = props;
  if (
    payload === undefined ||
    x === undefined ||
    y === undefined ||
    width === undefined ||
    height === undefined
  ) {
    return null;
  }
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  const color = isUp ? GAIN_COLOR : LOSS_COLOR;
  const range = high - low || 1;
  const valueToY = (v: number) => y + ((high - v) / range) * height;
  const openY = valueToY(open);
  const closeY = valueToY(close);
  const bodyTop = Math.min(openY, closeY);
  const bodyHeight = Math.max(1, Math.abs(closeY - openY));
  const cx = x + width / 2;
  const bodyWidth = Math.max(2, width * 0.6);
  const bodyX = cx - bodyWidth / 2;
  return (
    <g>
      <line x1={cx} y1={y} x2={cx} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={bodyX} y={bodyTop} width={bodyWidth} height={bodyHeight} fill={color} />
    </g>
  );
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface HoveredContext {
  datum: ChartDatum;
  period: CoinPeriod;
  chartType: ChartType;
}

interface FetchState {
  loading: boolean;
  error: string | null;
  history: CoinHistory | null;
}

const INITIAL_FETCH_STATE: FetchState = { loading: true, error: null, history: null };

export default function CoinDetailModal({ messages, coin, onClose }: CoinDetailModalProps) {
  const [period, setPeriod] = useState<CoinPeriod>('1w');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [fetchState, setFetchState] = useState<FetchState>(INITIAL_FETCH_STATE);
  const [hoveredCtx, setHoveredCtx] = useState<HoveredContext | null>(null);
  const { loading, error, history } = fetchState;

  const hovered =
    hoveredCtx && hoveredCtx.period === period && hoveredCtx.chartType === chartType
      ? hoveredCtx.datum
      : null;

  const setHovered = (datum: ChartDatum | null) => {
    setHoveredCtx(datum ? { datum, period, chartType } : null);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetch(`/api/crypto/${coin.id}/history`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: { data: CoinHistory }) => {
        if (cancelled) return;
        setFetchState({ loading: false, error: null, history: json.data });
      })
      .catch((err: unknown) => {
        if (cancelled || (err instanceof Error && err.name === 'AbortError')) return;
        setFetchState({
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load',
          history: null,
        });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [coin.id]);

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

  const { chartData, yMin, yMax, last, first, periodChange, periodChangePct } = useMemo(() => {
    const series = history?.[period] ?? [];
    if (series.length === 0) {
      return {
        chartData: [] as ChartDatum[],
        yMin: 0,
        yMax: 0,
        last: null as OHLCV | null,
        first: null as OHLCV | null,
        periodChange: 0,
        periodChangePct: 0,
      };
    }
    const lows = series.map((d) => d.low);
    const highs = series.map((d) => d.high);
    const min = Math.min(...lows);
    const max = Math.max(...highs);
    const pad = (max - min) * 0.1 || max * 0.02;
    const data: ChartDatum[] = series.map((d) => ({
      ...d,
      range: [d.low, d.high],
      mid: round3((d.high + d.low) / 2),
    }));
    const lastItem = series[series.length - 1];
    const firstItem = series[0];
    const change = lastItem.close - firstItem.close;
    const changePct = (change / firstItem.close) * 100;
    return {
      chartData: data,
      yMin: round3(min - pad),
      yMax: round3(max + pad),
      last: lastItem,
      first: firstItem,
      periodChange: change,
      periodChangePct: changePct,
    };
  }, [history, period]);

  const isGain = periodChange >= 0;
  const changeClass = isGain ? styles['stock-detail__change--gain'] : styles['stock-detail__change--loss'];
  const arrow = isGain ? '▲' : '▼';
  const sign = isGain ? '+' : '';
  const accentColor = isGain ? GAIN_COLOR : LOSS_COLOR;

  const referenceValue =
    chartType === 'line'
      ? first
        ? round3((first.high + first.low) / 2)
        : 0
      : first?.close ?? 0;
  const hoveredCrosshairValue = hovered
    ? chartType === 'line'
      ? hovered.mid
      : hovered.close
    : null;

  const tooltipLabels = {
    date: messages.tooltipDate,
    open: messages.tooltipOpen,
    high: messages.tooltipHigh,
    low: messages.tooltipLow,
    close: messages.tooltipClose,
    volume: messages.tooltipVolume,
  };

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

          <div className={styles['stock-detail__price-row']}>
            <span className={styles['stock-detail__price']}>${formatCoinPrice(coin.price)}</span>
            <span className={`${styles['stock-detail__change']} ${changeClass}`}>
              {arrow} {sign}{formatCoinPrice(periodChange)} ({sign}{periodChangePct.toFixed(2)}%)
            </span>
          </div>
        </header>

        <div className={styles['stock-detail__controls']}>
          <div
            className={styles['stock-detail__chart-type']}
            role="tablist"
            aria-label={messages.chartType.ariaLabel}
          >
            {CHART_TYPES.map((ct) => (
              <button
                key={ct}
                type="button"
                role="tab"
                aria-selected={chartType === ct}
                className={`${styles['stock-detail__chart-type-btn']} ${
                  chartType === ct ? styles['stock-detail__chart-type-btn--active'] : ''
                }`}
                onClick={() => setChartType(ct)}
              >
                {messages.chartType[ct]}
              </button>
            ))}
          </div>

          <div className={styles['stock-detail__periods']} role="tablist">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={period === p}
                className={`${styles['stock-detail__period']} ${
                  period === p ? styles['stock-detail__period--active'] : ''
                }`}
                onClick={() => setPeriod(p)}
              >
                {messages.periods[p]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles['stock-detail__chart']} aria-label={`${coin.symbol} price chart`}>
          {loading && <div className={styles['stock-detail__status']}>Loading…</div>}
          {error && !loading && (
            <div className={`${styles['stock-detail__status']} ${styles['stock-detail__status--error']}`}>
              {error}
            </div>
          )}

          {!loading && !error && chartData.length > 0 && (
            <>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
                  syncId={SYNC_ID}
                >
                  <defs>
                    <linearGradient id="coinDetailLineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="8 8" stroke="#E5E5EC" vertical={false} />

                  <XAxis dataKey="date" tick={false} axisLine={false} tickLine={false} height={0} />

                  <YAxis
                    domain={[yMin, yMax]}
                    tick={{ fontSize: 12, fill: '#767676' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${formatCoinPriceCompact(v)}`}
                    dx={-5}
                    width={72}
                  />

                  <Tooltip
                    content={<ChartTooltip labels={tooltipLabels} onHover={setHovered} />}
                    cursor={{ stroke: accentColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                  />

                  {first && (
                    <ReferenceLine
                      y={referenceValue}
                      stroke="#999999"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                    />
                  )}

                  {hovered && hoveredCrosshairValue !== null && (
                    <ReferenceLine
                      y={hoveredCrosshairValue}
                      stroke={accentColor}
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      label={{
                        value: `$${formatCoinPrice(hoveredCrosshairValue)}`,
                        position: 'insideLeft',
                        fill: '#ffffff',
                        fontSize: 11,
                        fontWeight: 600,
                        offset: 4,
                        style: {
                          paintOrder: 'stroke',
                          stroke: accentColor,
                          strokeWidth: 12,
                          strokeLinejoin: 'round',
                        },
                      }}
                    />
                  )}

                  {chartType === 'line' ? (
                    <>
                      <Area
                        type="monotone"
                        dataKey="range"
                        stroke="none"
                        fill={accentColor}
                        fillOpacity={0.08}
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="mid"
                        stroke={accentColor}
                        strokeWidth={1.5}
                        fill="url(#coinDetailLineGrad)"
                        activeDot={{
                          r: 6,
                          fill: accentColor,
                          stroke: '#FFFFFF',
                          strokeWidth: 4,
                        }}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="mid"
                        stroke="transparent"
                        dot={false}
                        activeDot={false}
                        isAnimationActive={false}
                      />
                    </>
                  ) : (
                    <Bar dataKey="range" shape={<Candle />} isAnimationActive={false} />
                  )}
                </ComposedChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={88}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  syncId={SYNC_ID}
                >
                  <CartesianGrid strokeDasharray="8 8" stroke="#E5E5EC" vertical={false} />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#767676' }}
                    axisLine={false}
                    tickLine={false}
                    dy={6}
                    minTickGap={32}
                    tickFormatter={(v: string) => formatDateForPeriod(v, period)}
                  />

                  <YAxis
                    tick={{ fontSize: 11, fill: '#767676' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => formatVolumeCompact(v)}
                    dx={-5}
                    width={72}
                  />

                  <Tooltip
                    content={
                      <ChartTooltip labels={tooltipLabels} onHover={setHovered} visible={false} />
                    }
                    cursor={{ stroke: accentColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                  />

                  <Bar
                    dataKey="volume"
                    fill={accentColor}
                    fillOpacity={0.35}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        <div className={styles['stock-detail__stats']}>
          <div className={styles['stock-detail__stat']}>
            <span className={styles['stock-detail__stat-label']}>{messages.currentPrice}</span>
            <span className={`${styles['stock-detail__stat-value']} ${changeClass}`}>
              ${last ? formatCoinPrice(last.close) : formatCoinPrice(coin.price)}
            </span>
          </div>
          <div className={styles['stock-detail__stat']}>
            <span className={styles['stock-detail__stat-label']}>{messages.periodOpen}</span>
            <span className={styles['stock-detail__stat-value']}>
              ${first ? formatCoinPrice(first.close) : formatCoinPrice(coin.price)}
            </span>
          </div>
          <div className={styles['stock-detail__stat']}>
            <span className={styles['stock-detail__stat-label']}>{messages.volume24h}</span>
            <span className={styles['stock-detail__stat-value']}>
              {formatVolumeCompact(coin.volume24h)}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
