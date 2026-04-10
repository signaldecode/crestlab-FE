import styles from '@/assets/styles/components/containers/news/NewsDetailContainer.module.scss';
import type { NewsItem } from '@/types/finance';

interface NewsDetailContainerProps {
  messages: {
    backToList: string;
    publishedOn: string;
    by: string;
    source: string;
    originalLink: string;
    relatedTitle: string;
    breadcrumbHome: string;
    breadcrumbNews: string;
    disclaimer: string;
    categories: Record<string, string>;
  };
  data: NewsItem;
  related: NewsItem[];
  locale: string;
}

function formatDate(iso: string) {
  // SSR/CSR 일관성을 위해 toLocaleDateString 대신 ISO slice 사용
  return iso.slice(0, 10);
}

export default function NewsDetailContainer({ messages, data, related, locale }: NewsDetailContainerProps) {
  const categoryLabel = messages.categories[data.category] ?? data.category;

  return (
    <main className={styles['news-detail']}>
      <nav className={styles['news-detail__breadcrumb']} aria-label="Breadcrumb">
        <ol className={styles['news-detail__breadcrumb-list']}>
          <li className={styles['news-detail__breadcrumb-item']}>
            <a href="/">{messages.breadcrumbHome}</a>
          </li>
          <li className={styles['news-detail__breadcrumb-item']} aria-hidden="true">/</li>
          <li className={styles['news-detail__breadcrumb-item']}>
            <a href="/news">{messages.breadcrumbNews}</a>
          </li>
          <li className={styles['news-detail__breadcrumb-item']} aria-hidden="true">/</li>
          <li className={styles['news-detail__breadcrumb-item']} aria-current="page">
            {data.title}
          </li>
        </ol>
      </nav>

      <a href="/news" className={styles['news-detail__back']}>
        {messages.backToList}
      </a>

      <article className={styles['news-detail__article']}>
        <header className={styles['news-detail__header']}>
          <span className={styles['news-detail__category']}>{categoryLabel}</span>
          <h1 className={styles['news-detail__title']}>{data.title}</h1>
          <p className={styles['news-detail__summary']}>{data.summary}</p>

          <div className={styles['news-detail__meta']}>
            <span className={styles['news-detail__meta-item']}>
              <span className={styles['news-detail__meta-label']}>{messages.source}</span>
              <span>{data.source}</span>
            </span>
            {data.author && (
              <span className={styles['news-detail__meta-item']}>
                <span className={styles['news-detail__meta-label']}>{messages.by}</span>
                <span>{data.author}</span>
              </span>
            )}
            <span className={styles['news-detail__meta-item']}>
              <span className={styles['news-detail__meta-label']}>{messages.publishedOn}</span>
              <time dateTime={data.publishedAt}>{formatDate(data.publishedAt)}</time>
            </span>
          </div>
        </header>

        <div className={styles['news-detail__body']}>
          {data.content?.map((paragraph, i) => (
            <p key={i} className={styles['news-detail__paragraph']}>
              {paragraph}
            </p>
          ))}
        </div>

        {data.url && data.url !== '#' && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['news-detail__original']}
          >
            {messages.originalLink}
          </a>
        )}

        <p className={styles['news-detail__disclaimer']}>{messages.disclaimer}</p>
      </article>

      {related.length > 0 && (
        <aside className={styles['news-detail__related']} aria-labelledby="news-related-title">
          <h2 id="news-related-title" className={styles['news-detail__related-title']}>
            {messages.relatedTitle}
          </h2>
          <ul className={styles['news-detail__related-list']}>
            {related.map((item) => (
              <li key={item.id} className={styles['news-detail__related-item']}>
                <a href={`/news/${item.slug}`} className={styles['news-detail__related-link']}>
                  <span className={styles['news-detail__related-category']}>
                    {messages.categories[item.category] ?? item.category}
                  </span>
                  <h3 className={styles['news-detail__related-name']}>{item.title}</h3>
                  <time
                    dateTime={item.publishedAt}
                    className={styles['news-detail__related-date']}
                  >
                    {formatDate(item.publishedAt)}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* JSON-LD: NewsArticle + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: data.title,
            description: data.summary,
            datePublished: data.publishedAt,
            inLanguage: locale,
            author: data.author ? { '@type': 'Person', name: data.author } : undefined,
            publisher: {
              '@type': 'Organization',
              name: data.source,
            },
            articleSection: categoryLabel,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: messages.breadcrumbHome, item: '/' },
              { '@type': 'ListItem', position: 2, name: messages.breadcrumbNews, item: '/news' },
              { '@type': 'ListItem', position: 3, name: data.title, item: `/news/${data.slug}` },
            ],
          }),
        }}
      />
    </main>
  );
}
