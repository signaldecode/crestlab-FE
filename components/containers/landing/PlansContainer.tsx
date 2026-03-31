import Image from 'next/image';
import styles from '@/assets/styles/components/containers/landing/PlansContainer.module.scss';

interface MockupCard {
  icon: string;
  name: string;
  amount: string;
  value: string;
}

interface PlanItem {
  tag: string;
  title: string;
  description: string;
  image: string;
  mockupCard: MockupCard;
}

interface PlansData {
  icon: string;
  items: PlanItem[];
}

interface PlansContainerProps {
  messages: { title: string };
  data: PlansData;
}

export default function PlansContainer({ messages, data }: PlansContainerProps) {
  const titleLines = messages.title.split('\n');

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 아이콘 + 제목 */}
        <div className={styles.icon} aria-hidden="true">{data.icon}</div>
        <h2 className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        {/* 지그재그 카드 리스트 */}
        <div className={styles.list}>
          {data.items.map((item, i) => (
            <article
              key={i}
              className={`${styles.row} ${i % 2 !== 0 ? styles['row--reverse'] : ''}`}
            >
              {/* 텍스트 영역 */}
              <div className={styles['row-text']}>
                <span className={styles.tag}>{item.tag}</span>
                <h3 className={styles['row-title']}>
                  {item.title.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < item.title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className={styles['row-desc']}>{item.description}</p>
              </div>

              {/* 이미지 영역 — 다크 앱 스크린 + 플로팅 카드 */}
              <div className={styles['row-image']}>
                <div className={styles.mockup}>
                  {/* 브라우저 도트 */}
                  <div className={styles['mockup-dots']} aria-hidden="true">
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  {/* 앱 스크린 */}
                  <div className={styles['mockup-screen']}>
                    <Image
                      src={item.image}
                      alt=""
                      width={400}
                      height={280}
                      className={styles['mockup-img']}
                    />
                  </div>
                  {/* 플로팅 카드 */}
                  <div className={styles['floating-card']}>
                    <div className={styles['floating-left']}>
                      <Image
                        src={item.mockupCard.icon}
                        alt=""
                        width={32}
                        height={32}
                        className={styles['floating-icon']}
                      />
                      <div className={styles['floating-info']}>
                        <span className={styles['floating-name']}>{item.mockupCard.name}</span>
                        <span className={styles['floating-amount']}>{item.mockupCard.amount}</span>
                      </div>
                    </div>
                    <span className={styles['floating-value']}>{item.mockupCard.value}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
