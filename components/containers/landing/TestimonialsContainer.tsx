import styles from '@/assets/styles/components/containers/landing/TestimonialsContainer.module.scss';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsContainerProps {
  messages: { title: string };
  data: { items: TestimonialItem[] };
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className={styles.card}>
      <div className={styles['card-header']}>
        <span className={styles.avatar} aria-hidden="true" />
        <div className={styles['card-meta']}>
          <span className={styles.name}>{item.author}</span>
          <span className={styles.role}>{item.role}</span>
        </div>
      </div>
      <blockquote className={styles.quote}>
        <p className={styles.text}>&ldquo;{item.quote}&rdquo;</p>
      </blockquote>
    </article>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: TestimonialItem[];
  direction: 'left' | 'right';
}) {
  const className =
    direction === 'left' ? styles['track-left'] : styles['track-right'];

  return (
    <div className={styles.row}>
      <div className={className}>
        {Array.from({ length: 4 }).map((_, setIdx) => (
          <div key={setIdx} className={styles.slide}>
            {items.map((item, i) => (
              <TestimonialCard key={`${setIdx}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsContainer({
  data,
}: TestimonialsContainerProps) {
  return (
    <section className={styles.testimonials} aria-hidden="true">
      <MarqueeRow items={data.items} direction="left" />
      <MarqueeRow items={data.items} direction="right" />
    </section>
  );
}
