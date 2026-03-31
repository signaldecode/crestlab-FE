'use client';

import { useRef, useEffect, useState } from 'react';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from 'recharts';
import styles from '@/assets/styles/components/containers/landing/MarketShareContainer.module.scss';

interface PieSegment {
  label?: string;
  value: number;
}

interface BarItem {
  value: number;
  label: string;
  displayValue: string;
}

interface MarketShareCard {
  label: string;
  badgeVariant: string;
  chartType: string;
  segments?: PieSegment[];
  bars?: BarItem[];
}

interface MarketShareData {
  cards: MarketShareCard[];
}

interface MarketShareContainerProps {
  messages: { title: string; badgeLabel: string };
  data: MarketShareData;
}

const PIE_COLORS = ['#72A3FF', '#DDE1EC', '#EDEFFA'];
const VBAR_COLORS = ['#DDE1EC', '#72A3FF', '#DDE1EC'];

export default function MarketShareContainer({ messages, data }: MarketShareContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const titleLines = messages.title.split('\n');

  return (
    <section
      ref={sectionRef}
      className={`${styles['market-share']} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className={styles['card-grid']}>
          {data.cards.map((card, i) => (
            <div key={i} className={styles.card}>
              {/* Badge pill */}
              <div
                className={`${styles.badge} ${
                  card.badgeVariant === 'filled'
                    ? styles['badge--filled']
                    : styles['badge--outlined']
                }`}
              >
                <span className={styles['badge-text']}>{messages.badgeLabel}</span>
              </div>

              {/* Label + description */}
              <span className={styles['card-label']}>{card.label}</span>
              <p className={styles['card-desc']}>{messages.badgeLabel}</p>

              {/* Chart area — mount only when visible for animation */}
              <div className={styles['chart-area']}>
                {isVisible && card.chartType === 'pie' && card.segments && (
                  <PieChartBlock segments={card.segments} />
                )}
                {isVisible && card.chartType === 'vbar' && card.bars && (
                  <VBarChartBlock bars={card.bars} />
                )}
                {card.chartType === 'hbar' && card.bars && (
                  <HBarChart bars={card.bars} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pie Chart (Recharts) ─── */
function PieChartBlock({ segments }: { segments: PieSegment[] }) {
  const pieData = segments.map((seg) => ({
    name: seg.label || '',
    value: seg.value,
  }));

  const renderLabel = (props: PieLabelRenderProps) => {
    const cx = Number(props.cx);
    const cy = Number(props.cy);
    const midAngle = Number(props.midAngle);
    const innerRadius = Number(props.innerRadius);
    const outerRadius = Number(props.outerRadius);
    const index = Number(props.index);
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const seg = segments[index];
    const isOnDark = index === 0;

    return (
      <g>
        {seg.label && (
          <text
            x={x}
            y={y - 10}
            textAnchor="middle"
            dominantBaseline="central"
            className={isOnDark ? styles['pie-text-label-dark'] : styles['pie-text-label-light']}
          >
            {seg.label}
          </text>
        )}
        <text
          x={x}
          y={seg.label ? y + 12 : y}
          textAnchor="middle"
          dominantBaseline="central"
          className={isOnDark ? styles['pie-text-value-dark'] : styles['pie-text-value-light']}
        >
          {seg.value}%
        </text>
      </g>
    );
  };

  return (
    <div className={styles['pie-wrap']}>
      <ResponsiveContainer width="100%" aspect={1}>
        <RechartsPie>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius="90%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            label={renderLabel}
            labelLine={false}
            isAnimationActive
            animationBegin={0}
            animationDuration={1000}
            stroke="none"
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i]} />
            ))}
          </Pie>
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Vertical Bar Chart (Recharts) ─── */
function VBarChartBlock({ bars }: { bars: BarItem[] }) {
  const barData = bars.map((bar) => ({
    name: bar.label,
    value: bar.value,
    displayValue: bar.displayValue,
  }));

  return (
    <div className={styles['vbar-wrap']}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData} barCategoryGap="30%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#767676', fontSize: 12 }}
          />
          <YAxis hide domain={[0, 100]} />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationBegin={0}
            animationDuration={1000}
            label={{
              position: 'top',
              fill: '#505050',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {barData.map((_, i) => (
              <Cell key={i} fill={VBAR_COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Horizontal Bar Chart (CSS) ─── */
function HBarChart({ bars }: { bars: BarItem[] }) {
  return (
    <div className={styles['hbar-chart']}>
      {bars.map((bar, i) => (
        <div key={i} className={styles['hbar-row']}>
          <div className={styles['hbar-header']}>
            <span className={styles['hbar-label']}>{bar.label}</span>
            <span className={styles['hbar-value']}>{bar.displayValue}</span>
          </div>
          <div className={styles['hbar-track']}>
            <div className={`${styles['hbar-fill']} ${styles[`hbar-fill--${i}`]}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
