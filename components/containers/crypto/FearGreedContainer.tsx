'use client';

import { PieChart, Pie, Cell } from 'recharts';
import styles from '@/assets/styles/components/containers/crypto/FearGreedContainer.module.scss';
import type { FearGreedData } from '@/types/finance';

interface FearGreedContainerProps {
  messages: {
    title: string;
    subtitle: string;
    asOf: string;
    currentTitle: string;
    currentDescription: string;
    historyTitle: string;
    historyLabels: Record<string, string>;
    labels: Record<string, string>;
    legendLabels: string[];
  };
  data: FearGreedData;
  compact?: boolean;
}

const GAUGE_COLORS = ['#3B82F6', '#60A5FA', '#94A3B8', '#60D394', '#34D399'];

const GAUGE_SEGMENTS = [
  { value: 20 },
  { value: 20 },
  { value: 20 },
  { value: 20 },
  { value: 20 },
];

function getLevel(value: number) {
  if (value <= 15) return 'extremeFear';
  if (value <= 30) return 'fear';
  if (value <= 40) return 'mildFear';
  if (value <= 55) return 'neutral';
  if (value <= 65) return 'mildGreed';
  if (value <= 80) return 'greed';
  return 'extremeGreed';
}

function getLevelColor(value: number) {
  if (value <= 20) return GAUGE_COLORS[0];
  if (value <= 40) return GAUGE_COLORS[1];
  if (value <= 60) return GAUGE_COLORS[2];
  if (value <= 80) return GAUGE_COLORS[3];
  return GAUGE_COLORS[4];
}

function Needle({ value, cx, cy, radius }: { value: number; cx: number; cy: number; radius: number }) {
  const angle = 180 - (value / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const needleLen = radius * 0.72;
  const tipX = cx + needleLen * Math.cos(rad);
  const tipY = cy - needleLen * Math.sin(rad);

  return (
    <g>
      <line
        x1={cx} y1={cy} x2={tipX} y2={tipY}
        stroke="#1E293B" strokeWidth={2.5} strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={6} fill="#1E293B" />
      <circle cx={cx} cy={cy} r={3} fill="#fff" />
    </g>
  );
}

export default function FearGreedContainer({ messages, data, compact = false }: FearGreedContainerProps) {
  const level = getLevel(data.value);
  const levelLabel = messages.labels[level] ?? data.label;

  // compact 모드: 게이지 + 값만 표시
  if (compact) {
    const cx = 120;
    const cy = 110;
    const outerR = 95;
    const innerR = 65;

    return (
      <div className={styles['fear-greed--compact']} aria-label={messages.title}>
        <h3 className={styles['fear-greed__compact-title']}>{messages.title}</h3>
        <div className={styles['fear-greed__compact-gauge']}>
          <PieChart width={240} height={135}>
            <Pie
              data={GAUGE_SEGMENTS}
              cx={cx} cy={cy}
              startAngle={180} endAngle={0}
              innerRadius={innerR} outerRadius={outerR}
              dataKey="value" stroke="none" isAnimationActive={false}
            >
              {GAUGE_SEGMENTS.map((_, i) => (
                <Cell key={i} fill={GAUGE_COLORS[i]} />
              ))}
            </Pie>
            <Needle value={data.value} cx={cx} cy={cy} radius={outerR} />
          </PieChart>
          <div className={styles['fear-greed__compact-label']}>
            <span className={styles['fear-greed__compact-value']}>{data.value}</span>
            <span
              className={styles['fear-greed__compact-badge']}
              style={{ backgroundColor: getLevelColor(data.value) }}
            >
              {levelLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 풀 모드: 상세 레이아웃
  const cx = 160;
  const cy = 150;
  const outerR = 130;
  const innerR = 90;

  return (
    <section className={styles['fear-greed']} aria-label={messages.title}>
      {/* Header */}
      <div className={styles['fear-greed__header']}>
        <div>
          <h2 className={styles['fear-greed__title']}>{messages.title}</h2>
          <p className={styles['fear-greed__subtitle']}>{messages.subtitle}</p>
        </div>
        <span className={styles['fear-greed__as-of']}>{messages.asOf}</span>
      </div>

      <div className={styles['fear-greed__content']}>
        {/* 좌측: 게이지 */}
        <div className={styles['fear-greed__gauge-wrap']}>
          <div className={styles['fear-greed__gauge']}>
            <PieChart width={320} height={180}>
              <Pie
                data={GAUGE_SEGMENTS}
                cx={cx} cy={cy}
                startAngle={180} endAngle={0}
                innerRadius={innerR} outerRadius={outerR}
                dataKey="value" stroke="none" isAnimationActive={false}
              >
                {GAUGE_SEGMENTS.map((_, i) => (
                  <Cell key={i} fill={GAUGE_COLORS[i]} />
                ))}
              </Pie>
              <Needle value={data.value} cx={cx} cy={cy} radius={outerR} />
            </PieChart>
            <div className={styles['fear-greed__gauge-label']}>
              <span className={styles['fear-greed__gauge-text']}>{levelLabel}</span>
            </div>
          </div>

          {/* 범례 */}
          <div className={styles['fear-greed__legend']}>
            {messages.legendLabels.map((label, i) => (
              <span key={i} className={styles['fear-greed__legend-item']}>
                <span
                  className={styles['fear-greed__legend-dot']}
                  style={{ backgroundColor: GAUGE_COLORS[i] }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* 우측: 현재 지수 + 기간별 */}
        <div className={styles['fear-greed__info']}>
          <div className={styles['fear-greed__current']}>
            <div className={styles['fear-greed__current-header']}>
              <h3>{messages.currentTitle}</h3>
              <span
                className={styles['fear-greed__current-badge']}
                style={{ backgroundColor: getLevelColor(data.value) }}
              >
                {levelLabel} - {data.value}
              </span>
            </div>
            <p className={styles['fear-greed__current-desc']}>
              {messages.currentDescription}
            </p>
          </div>

          {data.history && (
            <div className={styles['fear-greed__history']}>
              <h3 className={styles['fear-greed__history-title']}>{messages.historyTitle}</h3>
              <ul className={styles['fear-greed__history-list']}>
                {Object.entries(data.history).map(([period, item]) => {
                  const histLevel = getLevel(item.value);
                  const histLabel = messages.labels[histLevel] ?? item.label;
                  return (
                    <li key={period} className={styles['fear-greed__history-item']}>
                      <span>{messages.historyLabels[period]}</span>
                      <span
                        className={styles['fear-greed__history-badge']}
                        style={{ backgroundColor: getLevelColor(item.value) }}
                      >
                        {histLabel}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
