import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PartnersContainer.module.scss';

interface PartnersData {
  logos: string[];
}

interface PartnersContainerProps {
  messages: { title: string };
  data: PartnersData;
}

export default function PartnersContainer({ messages, data }: PartnersContainerProps) {
  return (
    <section className={styles.partners}>
      <div className={styles.inner}>
        <p className={styles.title}>{messages.title}</p>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {[...data.logos, ...data.logos].map((logo, i) => (
              <div key={i} className={styles['logo-item']}>
                <Image src={logo} alt="" width={200} height={80} className={styles['logo-img']} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
