'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from '@/assets/styles/components/containers/crypto/DominanceChartContainer.module.scss';
import type { DominanceTimeSeriesItem } from '@/types/finance';
import dominanceData from '@/data/mock/dominanceData.json';

interface DominanceChartContainerProps {
  messages: {
    title: string;
    subtitle: string;
    btcLabel: string;
    ethLabel: string;
    othersLabel: string;
    asOf: string;
    periods: Record<string, string>;
  };
  data: DominanceTimeSeriesItem[];
}

type Period = '1w' | '1m' | '3m' | '1y' | '5y';

const PERIODS: Period[] = ['1w', '1m', '3m', '1y', '5y'];

const COLORS = {
  btc: '#FF9500',
  eth: '#3086F5',
  others: '#B0B8C4',
};

export default function DominanceChartContainer({ messages }: DominanceChartContainerProps) {
  const [period, setPeriod] = useState<Period>('1w');

  const chartData = dominanceData[period] as DominanceTimeSeriesItem[];

  return (
    <div className={styles['dominance-chart']} aria-label={messages.title}>
      {/* Header */}
      <div className={styles['dominance-chart__header']}>
        <div>
          <h3 className={styles['dominance-chart__title']}>{messages.title}</h3>
          <p className={styles['dominance-chart__subtitle']}>{messages.subtitle}</p>
        </div>
        <span className={styles['dominance-chart__as-of']}>{messages.asOf}</span>
      </div>

      {/* Chart area */}
      <div className={styles['dominance-chart__body']}>
        {/* Legend + Period tabs */}
        <div className={styles['dominance-chart__controls']}>
          <div className={styles['dominance-chart__legend']}>
            <span className={styles['dominance-chart__legend-item']}>
              <span className={`${styles['dominance-chart__dot']} ${styles['dominance-chart__dot--btc']}`} />
              {messages.btcLabel}
            </span>
            <span className={styles['dominance-chart__legend-item']}>
              <span className={`${styles['dominance-chart__dot']} ${styles['dominance-chart__dot--eth']}`} />
              {messages.ethLabel}
            </span>
            <span className={styles['dominance-chart__legend-item']}>
              <span className={`${styles['dominance-chart__dot']} ${styles['dominance-chart__dot--others']}`} />
              {messages.othersLabel}
            </span>
          </div>

          <div className={styles['dominance-chart__periods']} role="tablist">
            {PERIODS.map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={period === p}
                className={`${styles['dominance-chart__period']} ${
                  period === p ? styles['dominance-chart__period--active'] : ''
                }`}
                onClick={() => setPeriod(p)}
              >
                {messages.periods[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts — Stacked Area */}
        <div className={styles['dominance-chart__chart']}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} stackOffset="none">
              <defs>
                <linearGradient id="gradBtc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.btc} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={COLORS.btc} stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="gradEth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.eth} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={COLORS.eth} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradOthers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.others} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={COLORS.others} stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#e9eaeb" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#767676' }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#767676' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                dx={-5}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e9eaeb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
                formatter={(value, name) => {
                  const labels: Record<string, string> = {
                    btc: messages.btcLabel,
                    eth: messages.ethLabel,
                    others: messages.othersLabel,
                  };
                  return [`${value}%`, labels[String(name)] || String(name)];
                }}
              />

              {/* 스택 순서: others(바닥) → eth(중간) → btc(위) */}
              <Area
                type="monotone"
                dataKey="others"
                stackId="dominance"
                stroke={COLORS.others}
                strokeWidth={1.5}
                fill="url(#gradOthers)"
              />
              <Area
                type="monotone"
                dataKey="eth"
                stackId="dominance"
                stroke={COLORS.eth}
                strokeWidth={1.5}
                fill="url(#gradEth)"
              />
              <Area
                type="monotone"
                dataKey="btc"
                stackId="dominance"
                stroke={COLORS.btc}
                strokeWidth={2}
                fill="url(#gradBtc)"
                dot={{ r: 3, fill: COLORS.btc, stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 5, fill: COLORS.btc, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
