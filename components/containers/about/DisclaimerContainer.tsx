import styles from '@/assets/styles/components/containers/about/DisclaimerContainer.module.scss';

interface DisclaimerContainerProps {
  messages: {
    title: string;
    content: string;
    registrationTitle: string;
    registrationNumber: string;
  };
}

export default function DisclaimerContainer({ messages }: DisclaimerContainerProps) {
  return (
    <section className={styles['disclaimer']} aria-labelledby="disclaimer-title">
      <h1 id="disclaimer-title" className={styles['disclaimer__title']}>
        {messages.title}
      </h1>
      <div className={styles['disclaimer__content']}>
        <p>{messages.content}</p>
      </div>
      <div className={styles['disclaimer__registration']}>
        <h2 className={styles['disclaimer__registration-title']}>
          {messages.registrationTitle}
        </h2>
        <p>{messages.registrationNumber}</p>
      </div>
    </section>
  );
}
