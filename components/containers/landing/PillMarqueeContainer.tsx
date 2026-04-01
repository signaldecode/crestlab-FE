import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PillMarqueeContainer.module.scss';

interface PillItem {
  label: string;
  image: string;
  bgColor: string;
}

interface PillMarqueeContainerProps {
  data: { items: PillItem[] };
}

function PillSlide({ items }: { items: PillItem[] }) {
  return (
    <div className={styles.slide}>
      {items.map((item, index) => (
        <div key={index} className={styles.pill}>
          <div className={styles['pill-bg']} style={{ backgroundColor: item.bgColor }}>
            <Image
              src={item.image}
              alt=""
              width={160}
              height={120}
              className={styles['pill-image']}
              sizes="160px"
            />
          </div>
          <span className={styles['pill-label']}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PillMarqueeContainer({ data }: PillMarqueeContainerProps) {
  return (
    <section className={styles['pill-marquee']} aria-hidden="true">
      <div className={styles.track}>
        <PillSlide items={data.items} />
        <PillSlide items={data.items} />
        <PillSlide items={data.items} />
        <PillSlide items={data.items} />
      </div>
    </section>
  );
}
