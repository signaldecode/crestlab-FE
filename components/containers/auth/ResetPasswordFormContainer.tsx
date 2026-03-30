'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

interface ResetPasswordMessages {
  title: string;
  subtitle: string;
  phone: string;
  phonePlaceholder: string;
  verificationCode: string;
  verificationCodePlaceholder: string;
  sendCode: string;
  resendCode: string;
  verifyCode: string;
  phoneVerified: string;
  userId: string;
  userIdPlaceholder: string;
  newPassword: string;
  newPasswordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  submit: string;
  submitAriaLabel: string;
  successTitle: string;
  successMessage: string;
  goLogin: string;
  errors: {
    phoneRequired: string;
    phoneInvalid: string;
    codeSendFailed: string;
    codeRequired: string;
    codeInvalid: string;
    userIdRequired: string;
    passwordRequired: string;
    passwordMin: string;
    passwordMismatch: string;
    resetFailed: string;
  };
}

interface ResetPasswordFormContainerProps {
  messages: ResetPasswordMessages;
}

export default function ResetPasswordFormContainer({ messages }: ResetPasswordFormContainerProps) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

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
    console.log('send code for reset-password', phone);
    setCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      setErrors((prev) => ({ ...prev, verificationCode: messages.errors.codeRequired }));
      return;
    }

    // TODO: API 연동 (POST /api/auth/verify-code)
    console.log('verify code', verificationCode);
    setPhoneVerified(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.verificationCode;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!userId.trim()) {
      newErrors.userId = messages.errors.userIdRequired;
    }

    if (!newPassword) {
      newErrors.newPassword = messages.errors.passwordRequired;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = messages.errors.passwordMin;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = messages.errors.passwordMismatch;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: API 연동 (POST /api/auth/reset-password)
    console.log('reset password', { phone, verificationCode, userId, newPassword });
    setSuccess(true);
  };

  if (success) {
    return (
      <section className={styles.auth}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{messages.successTitle}</h1>
            <p className={styles.subtitle}>{messages.successMessage}</p>
          </div>

          <div className={styles.actions}>
            <Link href="/login">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
              >
                {messages.goLogin}
              </Button>
            </Link>
          </div>
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
            htmlFor="reset-pw-phone"
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
                disabled={phoneVerified}
              />
              <Button
                type="button"
                variant={phoneVerified ? 'ghost' : 'secondary'}
                size="md"
                onClick={handleSendCode}
                disabled={phoneVerified}
              >
                {codeSent ? messages.resendCode : messages.sendCode}
              </Button>
            </div>
          </FormField>

          {codeSent && !phoneVerified && (
            <FormField
              label={messages.verificationCode}
              htmlFor="reset-pw-verification-code"
              required
              error={errors.verificationCode}
            >
              <div className={styles['verify-row']}>
                <Input
                  type="text"
                  placeholder={messages.verificationCodePlaceholder}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  inputMode="numeric"
                  maxLength={6}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleVerifyCode}
                >
                  {messages.verifyCode}
                </Button>
              </div>
            </FormField>
          )}

          {phoneVerified && (
            <>
              <p className={styles['success-text']} role="status">
                {messages.phoneVerified}
              </p>

              <FormField
                label={messages.userId}
                htmlFor="reset-pw-userid"
                required
                error={errors.userId}
              >
                <Input
                  type="text"
                  placeholder={messages.userIdPlaceholder}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  autoComplete="username"
                />
              </FormField>

              <FormField
                label={messages.newPassword}
                htmlFor="reset-pw-new-password"
                required
                error={errors.newPassword}
              >
                <Input
                  type="password"
                  placeholder={messages.newPasswordPlaceholder}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </FormField>

              <FormField
                label={messages.confirmPassword}
                htmlFor="reset-pw-confirm-password"
                required
                error={errors.confirmPassword}
              >
                <Input
                  type="password"
                  placeholder={messages.confirmPasswordPlaceholder}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </FormField>
            </>
          )}

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              aria-label={messages.submitAriaLabel}
              disabled={!phoneVerified}
            >
              {messages.submit}
            </Button>
          </div>
        </form>

        <p className={styles['link-row']}>
          <Link href="/login" className={styles.link}>{messages.goLogin}</Link>
        </p>
      </div>
    </section>
  );
}
