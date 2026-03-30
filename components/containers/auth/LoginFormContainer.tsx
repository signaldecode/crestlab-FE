import LoginForm from './LoginForm';
import type { LoginMessages } from './LoginForm';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

interface LoginFormContainerProps {
  messages: LoginMessages;
}

export default function LoginFormContainer({ messages }: LoginFormContainerProps) {
  return (
    <section className={styles.auth}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{messages.title}</h1>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>
        <LoginForm messages={messages} />
      </div>
    </section>
  );
}
