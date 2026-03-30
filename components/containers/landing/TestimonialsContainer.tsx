import SectionTitle from '@/components/ui/SectionTitle';
import styles from '@/assets/styles/components/containers/landing/TestimonialsContainer.module.scss';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  highlight: string;
}

interface TestimonialsMessages {
  title: string;
}

interface TestimonialsContainerProps {
  messages: TestimonialsMessages;
  data: { items: TestimonialItem[] };
}

export default function TestimonialsContainer({ messages, data }: TestimonialsContainerProps) {
  return (
    <section className={styles.testimonials}>
      <div className={styles.inner}>
        <SectionTitle title={messages.title} />
        <ul className={styles.grid}>
          {data.items.map((item, index) => (
            <li key={index} className={styles.card}>
              <blockquote className={styles.quote}>
                <p className={styles.text}>
                  {item.quote.split(item.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <strong className={styles.highlight}>{item.highlight}</strong>
                      )}
                    </span>
                  ))}
                </p>
                <footer className={styles.author}>
                  <span className={styles.name}>{item.author}</span>
                  <span className={styles.role}>{item.role}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
