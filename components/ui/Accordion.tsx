'use client';

import { useState } from 'react';
import styles from '@/assets/styles/components/ui/Accordion.module.scss';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        const headerId = `accordion-header-${index}`;

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
              <span className={styles.question}>{item.question}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
