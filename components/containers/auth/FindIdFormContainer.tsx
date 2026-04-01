'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/useUIStore';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

interface FindIdMessages {
  title: string;
  subtitle: string;
  phone: string;
  phonePlaceholder: string;
  verificationCode: string;
  verificationCodePlaceholder: string;
  sendCode: string;
  resendCode: string;
  submit: string;
  submitAriaLabel: string;
  resultTitle: string;
  resultMessage: string;
  goLogin: string;
  goResetPassword: string;
  errors: {
    phoneRequired: string;
    phoneInvalid: string;
    codeSendFailed: string;
    codeRequired: string;
    codeInvalid: string;
    notFound: string;
  };
}

interface FindIdFormContainerProps {
  messages: FindIdMessages;
}

export default function FindIdFormContainer({ messages }: FindIdFormContainerProps) {
  const openLoginModal = useUIStore((s) => s.openLoginModal);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [codeSent, setCodeSent] = useState(false);
  const [foundUserId, setFoundUserId] = useState<string | null>(null);

  const handleSendCode = () => {
    const newErrors: Record<string, string> = {};

    if (!phone.trim()) {
      newErrors.phone = messages.errors.phoneRequired;
    } else if (!/^01[016789]\d{7,8}$/.test(phone.replace(/-/g, ''))) {
      newErrors.phone = messages.errors.phoneInvalid;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: API 연동 (POST /api/auth/send-code)
    console.log('send code for find-id', phone);
    setCodeSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!phone.trim()) {
      newErrors.phone = messages.errors.phoneRequired;
    }

    if (!verificationCode.trim()) {
      newErrors.verificationCode = messages.errors.codeRequired;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: API 연동 (POST /api/auth/find-id)
    console.log('find id', { phone, verificationCode });

    // 임시: 결과 표시 시뮬레이션
    setFoundUserId('sampleUser123');
  };

  if (foundUserId) {
    return (
      <section className={styles.auth}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{messages.resultTitle}</h1>
            <p className={styles.subtitle}>{messages.resultMessage}</p>
          </div>

          <div className={styles['result-box']}>
            <span className={styles['result-value']}>{foundUserId}</span>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={openLoginModal}
            >
              {messages.goLogin}
            </Button>
          </div>

          <p className={styles['link-row']}>
            <Link href="/reset-password" className={styles.link}>
              {messages.goResetPassword}
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.auth}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{messages.title}</h1>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <FormField
            label={messages.phone}
            htmlFor="find-id-phone"
            required
            error={errors.phone}
          >
            <div className={styles['verify-row']}>
              <Input
                type="tel"
                placeholder={messages.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleSendCode}
              >
                {codeSent ? messages.resendCode : messages.sendCode}
              </Button>
            </div>
          </FormField>

          {codeSent && (
            <FormField
              label={messages.verificationCode}
              htmlFor="find-id-verification-code"
              required
              error={errors.verificationCode}
            >
              <Input
                type="text"
                placeholder={messages.verificationCodePlaceholder}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                inputMode="numeric"
                maxLength={6}
              />
            </FormField>
          )}

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              aria-label={messages.submitAriaLabel}
              disabled={!codeSent}
            >
              {messages.submit}
            </Button>
          </div>
        </form>

        <p className={styles['link-row']}>
          <button type="button" className={styles.link} onClick={openLoginModal}>{messages.goLogin}</button>
          <span className={styles.link}>　|　</span>
          <Link href="/reset-password" className={styles.link}>{messages.goResetPassword}</Link>
        </p>
      </div>
    </section>
  );
}
