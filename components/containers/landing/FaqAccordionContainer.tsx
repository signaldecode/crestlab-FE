'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/containers/landing/FaqAccordionContainer.module.scss';

interface FaqItem { question: string; answer: string; }

interface FaqAccordionContainerProps {
  messages: { title: string };
  data: { items: FaqItem[] };
}

export default function FaqAccordionContainer({ messages, data }: FaqAccordionContainerProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{messages.title}</h2>
        <div className={styles.list}>
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <div className={styles['trigger-left']}>
                    <span className={styles['q-label']}>Q.</span>
                    <span className={`${styles.question} ${isOpen ? styles['question--active'] : ''}`}>{item.question}</span>
                  </div>
                  <svg className={`${styles.arrow} ${isOpen ? styles['arrow--open'] : ''}`} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <path d="M12 15L18 21L24 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${i}`} className={styles.panel} role="region">
                    <span className={styles['a-label']}>A.</span>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
