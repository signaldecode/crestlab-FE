import styles from '@/assets/styles/components/ui/TickerBadge.module.scss';

type TickerBadgeSize = 'sm' | 'md' | 'lg';

interface TickerBadgeProps {
  symbol: string;
  size?: TickerBadgeSize;
  /** 한 번에 표시할 최대 글자 수 (기본 4) */
  maxChars?: number;
}

// 심볼이 같으면 항상 같은 색이 나오는 결정론적 팔레트.
// 금융 플랫폼 톤에 맞는 8색.
const PALETTE = [
  '#3086f5', // brand blue
  '#8b5cf6', // violet
  '#0ea5e9', // sky
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#14b8a6', // teal
];

function hashSymbol(symbol: string): number {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = (hash * 31 + symbol.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export default function TickerBadge({ symbol, size = 'md', maxChars = 4 }: TickerBadgeProps) {
  const label = symbol.slice(0, maxChars).toUpperCase();
  const fill = PALETTE[hashSymbol(symbol) % PALETTE.length];
  // 글자 수에 따라 viewBox 기준 폰트 사이즈 조정
  const fontSize = label.length <= 2 ? 38 : label.length === 3 ? 30 : 24;

  return (
    <svg
      className={`${styles['ticker-badge']} ${styles[`ticker-badge--${size}`]}`}
      viewBox="0 0 80 80"
      role="img"
      aria-label={symbol}
    >
      <circle cx="40" cy="40" r="40" fill={fill} />
      <text
        x="40"
        y="40"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="'Pretendard Variable', 'Pretendard', sans-serif"
        fill="#ffffff"
        letterSpacing="-0.5"
      >
        {label}
      </text>
    </svg>
  );
}
