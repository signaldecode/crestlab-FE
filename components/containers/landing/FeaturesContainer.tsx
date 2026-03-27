import SectionTitle from '@/components/ui/SectionTitle';
import styles from './FeaturesContainer.module.scss';

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

const iconMap: Record<string, string> = {
  chart: '📊',
  shield: '🛡️',
  portfolio: '💼',
  report: '📋',
};

export default function FeaturesContainer({ messages, data }: FeaturesContainerProps) {
  return (
    <section className={styles.features}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} theme="dark" />
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
