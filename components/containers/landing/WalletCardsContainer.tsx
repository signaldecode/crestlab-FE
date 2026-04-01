import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/WalletCardsContainer.module.scss';

interface WalletCardsContainerProps {
  messages: { title: string; subtitle: string };
}

export default function WalletCardsContainer({ messages }: WalletCardsContainerProps) {
  return (
    <section className={styles.wallets}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <p className={styles.subtitle}>{messages.subtitle}</p>
        <div className={styles.visual}>
          <Image src="/images/landing/wallet-chart.png" alt="" width={482} height={626} className={styles.image} sizes="(max-width: 768px) 100vw, 500px" />
        </div>
      </div>
    </section>
  );
}
