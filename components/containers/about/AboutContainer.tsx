import styles from '@/assets/styles/components/containers/about/AboutContainer.module.scss';

interface AboutContainerProps {
  messages: {
    title: string;
    description: string;
    missionTitle: string;
    missionDescription: string;
    visionTitle: string;
    visionDescription: string;
  };
}

export default function AboutContainer({ messages }: AboutContainerProps) {
  return (
    <section className={styles['about']} aria-labelledby="about-title">
      <h2 id="about-title" className={styles['about__title']}>
        {messages.title}
      </h2>
      <p className={styles['about__description']}>{messages.description}</p>

      <div className={styles['about__grid']}>
        <div className={styles['about__card']}>
          <h3 className={styles['about__card-title']}>{messages.missionTitle}</h3>
          <p>{messages.missionDescription}</p>
        </div>
        <div className={styles['about__card']}>
          <h3 className={styles['about__card-title']}>{messages.visionTitle}</h3>
          <p>{messages.visionDescription}</p>
        </div>
      </div>
    </section>
  );
}
