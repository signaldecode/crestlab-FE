'use client';

import styles from '@/assets/styles/components/containers/crypto/DominanceChartContainer.module.scss';
import type { DominanceData } from '@/types/finance';

interface DominanceChartContainerProps {
  messages: {
    title: string;
    btcLabel: string;
    ethLabel: string;
    othersLabel: string;
  };
  data: DominanceData;
}

export default function DominanceChartContainer({ messages, data }: DominanceChartContainerProps) {
  return (
    <div className={styles['dominance-chart']} aria-label={messages.title}>
      <h3 className={styles['dominance-chart__title']}>{messages.title}</h3>
      <div className={styles['dominance-chart__bar']}>
        <div
          className={styles['dominance-chart__segment--btc']}
          style={{ width: `${data.btc}%` }}
          role="meter"
          aria-valuenow={data.btc}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${messages.btcLabel} ${data.btc}%`}
        />
        <div
          className={styles['dominance-chart__segment--eth']}
          style={{ width: `${data.eth}%` }}
          role="meter"
          aria-valuenow={data.eth}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${messages.ethLabel} ${data.eth}%`}
        />
        <div
          className={styles['dominance-chart__segment--others']}
          style={{ width: `${data.others}%` }}
          role="meter"
          aria-valuenow={data.others}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${messages.othersLabel} ${data.others}%`}
        />
      </div>
      <div className={styles['dominance-chart__legend']}>
        <span>{messages.btcLabel}: {data.btc}%</span>
        <span>{messages.ethLabel}: {data.eth}%</span>
        <span>{messages.othersLabel}: {data.others}%</span>
      </div>
    </div>
  );
}
