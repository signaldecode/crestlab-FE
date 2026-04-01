import Accordion from '@/components/ui/Accordion';
import styles from '@/assets/styles/components/containers/landing/FaqContainer.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqContainerProps {
  messages: { caption: string; title: string; subtitle: string };
  data: { items: FaqItem[] };
}

export default function FaqContainer({ messages, data }: FaqContainerProps) {
  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        <div className={styles['text-block']}>
          <span className={styles.caption}>{messages.caption}</span>
          <h2 className={styles.title}>{messages.title}</h2>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>
        <div className={styles['accordion-block']}>
          <Accordion items={data.items} />
        </div>
      </div>
    </section>
  );
}
