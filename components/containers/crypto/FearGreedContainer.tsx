'use client';

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

const GAUGE_COLORS = ['#2563EB', '#60A5FA', '#94A3B8', '#4ADE80', '#22C55E'];

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

/**
 * SVG 호(arc) 경로 — 시계방향 반원
 * angleDeg: 0°=우측(3시), 반시계로 증가. 반원은 180°(좌)→0°(우)
 */
function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToXY(cx, cy, r, startAngle);
  const end = polarToXY(cx, cy, r, endAngle);
  const sweep = startAngle - endAngle;
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  // sweep-flag=1 (시계방향 = 좌→우)
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

interface GaugeSVGProps {
  value: number;
  size: number;
  strokeWidth: number;
  label: string;
  showValue?: boolean;
}

function GaugeSVG({ value, size, strokeWidth, label, showValue = false }: GaugeSVGProps) {
  const cx = size / 2;
  const cy = size * 0.48;
  const r = size / 2 - strokeWidth / 2 - 8;
  const segAngle = 180 / 5; // 36도씩

  // 바늘: value 0=180°(좌), 100=0°(우)
  const needleAngle = 180 - (value / 100) * 180;
  const needleLen = r - strokeWidth / 2 - 4;
  const tip = polarToXY(cx, cy, needleLen, needleAngle);
  const tailLen = 14;
  const tail = polarToXY(cx, cy, -tailLen, needleAngle);

  // 눈금
  const ticks: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
  for (let deg = 0; deg <= 180; deg += 6) {
    const major = deg % 36 === 0;
    const outer = r + strokeWidth / 2 + 1;
    const inner = outer - (major ? 7 : 3.5);
    const angle = 180 - deg;
    const p1 = polarToXY(cx, cy, outer, angle);
    const p2 = polarToXY(cx, cy, inner, angle);
    ticks.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, major });
  }

  const svgH = size * 0.8;

  return (
    <svg
      width={size}
      height={svgH}
      viewBox={`0 0 ${size} ${svgH}`}
      className={styles['gauge-svg']}
    >
      <defs>
        <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* 배경 트랙 */}
      <path
        d={describeArc(cx, cy, r, 180, 0)}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* 5구간 색상 호 */}
      {GAUGE_COLORS.map((color, i) => {
        const start = 180 - i * segAngle;
        const end = 180 - (i + 1) * segAngle;
        return (
          <path
            key={i}
            d={describeArc(cx, cy, r, start, end)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap={i === 0 ? 'round' : i === 4 ? 'round' : 'butt'}
          />
        );
      })}

      {/* 눈금 */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.major ? '#CBD5E1' : '#E2E8F0'}
          strokeWidth={t.major ? 1.5 : 0.75}
        />
      ))}

      {/* 바늘 */}
      <g filter="url(#needleShadow)">
        <line
          x1={tail.x} y1={tail.y} x2={tip.x} y2={tip.y}
          stroke="#1E293B" strokeWidth={2.5} strokeLinecap="round"
        />
      </g>

      {/* 중심 원 */}
      <circle cx={cx} cy={cy} r={7} fill="#1E293B" />
      <circle cx={cx} cy={cy} r={4} fill="#fff" />

      {/* 텍스트 */}
      {showValue ? (
        <>
          <text x={cx} y={cy + 45} textAnchor="middle" className={styles['gauge-svg__value']}>
            {value}
          </text>
          <text x={cx} y={cy + 62} textAnchor="middle" className={styles['gauge-svg__label']} fill={getLevelColor(value)}>
            {label}
          </text>
        </>
      ) : (
        <text x={cx} y={cy + 38} textAnchor="middle" className={styles['gauge-svg__full-label']}>
          {label}
        </text>
      )}
    </svg>
  );
}

export default function FearGreedContainer({ messages, data, compact = false }: FearGreedContainerProps) {
  const level = getLevel(data.value);
  const levelLabel = messages.labels[level] ?? data.label;

  if (compact) {
    return (
      <div className={styles['fear-greed--compact']} aria-label={messages.title}>
        <h3 className={styles['fear-greed__compact-title']}>{messages.title}</h3>
        <GaugeSVG value={data.value} size={240} strokeWidth={22} label={levelLabel} showValue />
      </div>
    );
  }

  return (
    <section className={styles['fear-greed']} aria-label={messages.title}>
      <div className={styles['fear-greed__header']}>
        <div>
          <h2 className={styles['fear-greed__title']}>{messages.title}</h2>
          <p className={styles['fear-greed__subtitle']}>{messages.subtitle}</p>
        </div>
        <span className={styles['fear-greed__as-of']}>{messages.asOf}</span>
      </div>

      <div className={styles['fear-greed__content']}>
        <div className={styles['fear-greed__gauge-wrap']}>
          <GaugeSVG value={data.value} size={320} strokeWidth={28} label={levelLabel} />

          <div className={styles['fear-greed__legend']}>
            {messages.legendLabels.map((label, i) => (
              <span key={i} className={styles['fear-greed__legend-item']}>
                <span className={styles['fear-greed__legend-dot']} style={{ backgroundColor: GAUGE_COLORS[i] }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles['fear-greed__info']}>
          <div className={styles['fear-greed__current']}>
            <div className={styles['fear-greed__current-header']}>
              <h3>{messages.currentTitle}</h3>
              <span className={styles['fear-greed__current-badge']} style={{ backgroundColor: getLevelColor(data.value) }}>
                {levelLabel} - {data.value}
              </span>
            </div>
            <p className={styles['fear-greed__current-desc']}>{messages.currentDescription}</p>
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
                      <span className={styles['fear-greed__history-badge']} style={{ backgroundColor: getLevelColor(item.value) }}>
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
