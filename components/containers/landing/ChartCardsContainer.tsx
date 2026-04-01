'use client';

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, LabelList,
  AreaChart, Area,
  ResponsiveContainer,
} from 'recharts';
import styles from '@/assets/styles/components/containers/landing/ChartCardsContainer.module.scss';

const PIE_COLORS = ['#6B8BF5', '#B0BEE6', '#D4D4D4'];
const BAR_COLORS = ['#C5CEE0', '#5B7FDE', '#B0BEE6'];

interface ChartDataItem {
  name: string;
  value: number;
}

interface ChartCardItem {
  type: 'pie' | 'bar' | 'line';
  data: ChartDataItem[];
}

interface CardMessage {
  title: string;
  description: string;
}

interface ChartCardsContainerProps {
  messages: {
    title: string;
    subtitle: string;
    cards: CardMessage[];
  };
  data: { items: ChartCardItem[] };
}

function PieChartCard({ data }: { data: ChartDataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="55%"
          cy="50%"
          innerRadius={0}
          outerRadius="75%"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          stroke="none"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label={((props: any) => {
            const RADIAN = Math.PI / 180;
            const radius = props.outerRadius * 1.25;
            const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
            const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);
            return (
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={13} fill="#555">
                {props.value}%
              </text>
            );
          }) as unknown as boolean}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartCard({ data }: { data: ChartDataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barCategoryGap="35%" margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide domain={[0, 100]} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
          {data.map((_, i) => (
            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
          ))}
          <LabelList dataKey="value" position="top" fontSize={12} fill="#555" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function LineChartCard({ data }: { data: ChartDataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B8BF5" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6B8BF5" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#6B8BF5"
          strokeWidth={2.5}
          fill="url(#chartAreaGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function ChartCardsContainer({ messages, data }: ChartCardsContainerProps) {
  const chartRenderers = {
    pie: PieChartCard,
    bar: BarChartCard,
    line: LineChartCard,
  };

  return (
    <section className={styles['chart-cards']}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {messages.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < messages.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>
            {messages.subtitle.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < messages.subtitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.grid}>
          {data.items.map((item, index) => {
            const ChartComponent = chartRenderers[item.type];
            const card = messages.cards[index];
            return (
              <article key={index} className={styles.card}>
                <div className={styles['chart-area']}>
                  <ChartComponent data={item.data} />
                </div>
                <div className={styles['card-text']}>
                  <h3 className={styles['card-title']}>{card.title}</h3>
                  <p className={styles['card-desc']}>{card.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
