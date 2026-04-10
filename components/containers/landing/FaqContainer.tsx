'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/landing/FaqContainer.module.scss';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqMessages {
  title: string;
}

interface FaqContainerProps {
  messages: FaqMessages;
  data: { items: FaqItem[] };
}

export default function FaqContainer({ messages, data }: FaqContainerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleLines = messages.title.split('\n');

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className={styles.list}>
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div key={index} className={`${styles.item} ${isOpen ? styles['item--open'] : ''}`}>
                <button
                  type="button"
                  id={headerId}
                  className={styles.trigger}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles['question-wrap']}>
                    <span className={styles['q-mark']}>Q.</span>
                    <span className={styles.question}>{item.question}</span>
                  </span>
                  <span className={styles.chevron} aria-hidden="true">&#9662;</span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={styles.panel}
                  hidden={!isOpen}
                >
                  <div className={styles['answer-wrap']}>
                    <span className={styles['a-mark']}>A.</span>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
