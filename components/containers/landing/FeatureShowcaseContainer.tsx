'use client';

import { 
  ResponsiveContainer, 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import styles from '@/assets/styles/components/containers/landing/FeatureShowcaseContainer.module.scss';

interface FeatureItem { title: string; description: string; }

interface FeatureShowcaseContainerProps {
  messages: { title: string; items: FeatureItem[] };
}

// Dummy data for charts
const areaData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
  { name: 'Next', value: 2000 },
  { name: 'Future', value: 3000 },
];

const barData = [
  { name: 'A', value: 2400 },
  { name: 'B', value: 1398 },
  { name: 'C', value: 9800 },
  { name: 'D', value: 3908 },
  { name: 'E', value: 4800 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartPreview = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3cd36c" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3cd36c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3cd36c" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 1:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" fill="#3cd36c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    case 2:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    case 3:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={areaData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3cd36c" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};

export default function FeatureShowcaseContainer({ messages }: FeatureShowcaseContainerProps) {
  return (
    <section className={styles.showcase}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title.split('\n').map((line, i) => (
          <span key={i}>{line}<br /></span>
        ))}</h2>
        <div className={styles.grid}>
          {messages.items.map((item, i) => (
            <article key={i} className={styles.card}>
              <div className={styles['card-preview']}>
                <ChartPreview index={i % 4} />
              </div>
              <div className={styles['card-content']}>
                <h3 className={styles['card-title']}>{item.title}</h3>
                <p className={styles['card-desc']}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
