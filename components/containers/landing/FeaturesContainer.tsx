import type { ReactNode } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from '@/assets/styles/components/containers/landing/FeaturesContainer.module.scss';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesMessages {
  title: string;
  subtitle: string;
}

interface FeaturesContainerProps {
  messages: FeaturesMessages;
  data: { items: FeatureItem[] };
}

const iconMap: Record<string, ReactNode> = {
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20L9 14L13 18L21 8" />
      <path d="M17 8H21V12" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7V12C3 16.97 7.03 21.5 12 22.5C16.97 21.5 21 16.97 21 12V7L12 2Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  ),
  portfolio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" />
      <path d="M12 12V14" />
      <path d="M2 12H22" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
      <path d="M14 2V8H20" />
      <path d="M8 13H16" />
      <path d="M8 17H12" />
    </svg>
  ),
};

export default function FeaturesContainer({ messages, data }: FeaturesContainerProps) {
  return (
    <section className={styles.features}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} />
        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {iconMap[item.icon] || '●'}
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
