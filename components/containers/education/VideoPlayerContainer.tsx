import Image from 'next/image';
import Link from 'next/link';
import styles from '@/assets/styles/components/containers/education/VideoPlayerContainer.module.scss';
import type { VideoItem, VideoCategory } from '@/types/finance';

interface VideoPlayerContainerProps {
  messages: {
    backToList: string;
    relatedTitle: string;
    categoryLabel: string;
    disclaimer: string;
    categories: Record<VideoCategory, string>;
  };
  data: VideoItem;
  related: VideoItem[];
}

export default function VideoPlayerContainer({
  messages,
  data,
  related,
}: VideoPlayerContainerProps) {
  return (
    <article className={styles['video-player']}>
      <Link href="/education" className={styles['video-player__back']}>
        {messages.backToList}
      </Link>

      <div className={styles['video-player__layout']}>
        <div className={styles['video-player__main']}>
          <div className={styles['video-player__embed']}>
            <iframe
              src={`https://www.youtube.com/embed/${data.youtubeId}`}
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles['video-player__iframe']}
            />
          </div>

          <h1 className={styles['video-player__title']}>{data.title}</h1>

          <div className={styles['video-player__meta']}>
            <span className={styles['video-player__category-tag']}>
              {messages.categories[data.category]}
            </span>
          </div>

          <p className={styles['video-player__description']}>{data.description}</p>

          <p className={styles['video-player__disclaimer']}>{messages.disclaimer}</p>
        </div>

        {related.length > 0 && (
          <aside
            className={styles['video-player__sidebar']}
            aria-labelledby="related-videos-title"
          >
            <h2
              id="related-videos-title"
              className={styles['video-player__sidebar-title']}
            >
              {messages.relatedTitle}
            </h2>
            <ul className={styles['video-player__related-list']}>
              {related.map((video) => (
                <li key={video.slug} className={styles['video-player__related-item']}>
                  <Link
                    href={`/education/${video.slug}`}
                    className={styles['video-player__related-link']}
                  >
                    <div className={styles['video-player__related-thumb']}>
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="160px"
                        unoptimized
                      />
                      <span className={styles['video-player__related-duration']}>
                        {video.duration}
                      </span>
                    </div>
                    <div className={styles['video-player__related-body']}>
                      <h3 className={styles['video-player__related-title']}>
                        {video.title}
                      </h3>
                      <span className={styles['video-player__related-category']}>
                        {messages.categories[video.category]}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
