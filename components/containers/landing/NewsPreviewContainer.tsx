import styles from '@/assets/styles/components/containers/landing/NewsPreviewContainer.module.scss';
import SectionTitle from '@/components/ui/SectionTitle';
import type { NewsItem } from '@/types/finance';

interface NewsPreviewContainerProps {
  messages: {
    title: string;
    viewAll: string;
  };
  data: NewsItem[];
}

export default function NewsPreviewContainer({ messages, data }: NewsPreviewContainerProps) {
  return (
    <section className={styles['news-preview']} aria-labelledby="news-preview-title">
      <SectionTitle title={messages.title} />
      <div className={styles['news-preview__list']}>
        {data.slice(0, 4).map((item) => (
          <article key={item.id} className={styles['news-preview__item']}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['news-preview__link']}
            >
              <span className={styles['news-preview__category']}>{item.category}</span>
              <h3 className={styles['news-preview__title']}>{item.title}</h3>
              <p className={styles['news-preview__summary']}>{item.summary}</p>
              <div className={styles['news-preview__meta']}>
                <span>{item.source}</span>
                <time dateTime={item.publishedAt}>
                  {new Date(item.publishedAt).toLocaleDateString()}
                </time>
              </div>
            </a>
          </article>
        ))}
      </div>
      <a href="/news" className={styles['news-preview__view-all']}>
        {messages.viewAll}
      </a>
    </section>
  );
}
