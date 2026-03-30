import SectionTitle from '@/components/ui/SectionTitle';
import Accordion from '@/components/ui/Accordion';
import styles from '@/assets/styles/components/containers/landing/FaqContainer.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqMessages {
  title: string;
  subtitle: string;
}

interface FaqContainerProps {
  messages: FaqMessages;
  data: { items: FaqItem[] };
}

export default function FaqContainer({ messages, data }: FaqContainerProps) {
  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} subtitle={messages.subtitle} />
        <Accordion items={data.items} />
      </div>
    </section>
  );
}
