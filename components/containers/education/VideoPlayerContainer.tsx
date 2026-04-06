import styles from '@/assets/styles/components/containers/education/VideoPlayerContainer.module.scss';
import type { VideoItem } from '@/types/finance';

interface VideoPlayerContainerProps {
  messages: {
    backToList: string;
  };
  data: VideoItem;
}

export default function VideoPlayerContainer({ messages, data }: VideoPlayerContainerProps) {
  return (
    <article className={styles['video-player']}>
      <a href="/education" className={styles['video-player__back']}>
        {messages.backToList}
      </a>
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
      <p className={styles['video-player__description']}>{data.description}</p>
    </article>
  );
}
