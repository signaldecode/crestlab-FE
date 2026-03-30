'use client';

import { useEffect, useRef } from 'react';
import useUIStore from '@/stores/useUIStore';
import LoginForm from '@/components/containers/auth/LoginForm';
import type { LoginMessages } from '@/components/containers/auth/LoginForm';
import styles from '@/assets/styles/components/common/LoginModal.module.scss';

interface LoginModalProps {
  messages: LoginMessages;
  closeAriaLabel: string;
}

export default function LoginModal({ messages, closeAriaLabel }: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isLoginModalOpen, closeLoginModal } = useUIStore();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isLoginModalOpen) {
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      dialog.close();
      document.body.classList.remove('modal-open');
    }
  }, [isLoginModalOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      closeLoginModal();
      document.body.classList.remove('modal-open');
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [closeLoginModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeLoginModal();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="login-modal-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <div className={styles['modal-header']}>
          <div className={styles['header-text']}>
            <h2 id="login-modal-title" className={styles.title}>
              {messages.title}
            </h2>
            <p className={styles.subtitle}>{messages.subtitle}</p>
          </div>
          <button
            type="button"
            className={styles['close-button']}
            onClick={closeLoginModal}
            aria-label={closeAriaLabel}
          >
            ✕
          </button>
        </div>

        <LoginForm
          messages={messages}
          onSuccess={closeLoginModal}
          idPrefix="modal-login"
        />
      </div>
    </dialog>
  );
}
