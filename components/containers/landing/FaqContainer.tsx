import SectionTitle from '@/components/ui/SectionTitle';
import Accordion from '@/components/ui/Accordion';
import styles from './FaqContainer.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

interface FaqContainerProps {
  data: FaqData;
}

export default function FaqContainer({ data }: FaqContainerProps) {
  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        <SectionTitle title={data.title} subtitle={data.subtitle} />
        <Accordion items={data.items} />
      </div>
    </section>
  );
}
