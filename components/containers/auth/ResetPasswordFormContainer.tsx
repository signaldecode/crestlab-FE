'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useUIStore from '@/stores/useUIStore';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

interface ResetPasswordMessages {
  title: string;
  subtitle: string;
  userId: string;
  userIdPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  verificationCode: string;
  verificationCodePlaceholder: string;
  sendCode: string;
  resendCode: string;
  verifyCode: string;
  verified: string;
  verifiedMessage: string;
  newPassword: string;
  newPasswordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  submit: string;
  submitAriaLabel: string;
  successTitle: string;
  successMessage: string;
  goLogin: string;
  goFindId: string;
  errors: {
    userIdRequired: string;
    phoneRequired: string;
    phoneInvalid: string;
    codeSendFailed: string;
    codeRequired: string;
    codeInvalid: string;
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
  const openLoginModal = useUIStore((s) => s.openLoginModal);
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSendCode = () => {
    const newErrors: Record<string, string> = {};

    if (!userId.trim()) {
      newErrors.userId = messages.errors.userIdRequired;
    }
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
    setCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      setErrors((prev) => ({ ...prev, verificationCode: messages.errors.codeRequired }));
      return;
    }

    // TODO: API 연동 (POST /api/auth/verify-code)
    setVerified(true);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!verified) return;

    const newErrors: Record<string, string> = {};

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
            <Button type="button" variant="primary" size="lg" fullWidth onClick={openLoginModal}>
              {messages.goLogin}
            </Button>
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
          {/* Step 1: 아이디 + 휴대폰 인증 */}
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
              disabled={verified}
            />
          </FormField>

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
                disabled={verified}
              />
              <Button
                type="button"
                variant={verified ? 'ghost' : 'secondary'}
                size="md"
                onClick={handleSendCode}
                disabled={verified}
              >
                {codeSent ? messages.resendCode : messages.sendCode}
              </Button>
            </div>
          </FormField>

          {codeSent && !verified && (
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

          {/* Step 2: 비밀번호 재설정 */}
          {verified && (
            <>
              <p className={styles['success-text']} role="status">
                {messages.verified}
              </p>
              <p className={styles['hint-text']}>
                {messages.verifiedMessage}
              </p>

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
              disabled={!verified}
            >
              {messages.submit}
            </Button>
          </div>
        </form>

        <p className={styles['link-row']}>
          <button type="button" className={styles.link} onClick={openLoginModal}>{messages.goLogin}</button>
          <span className={styles.link}>　|　</span>
          <Link href="/find-id" className={styles.link}>{messages.goFindId}</Link>
        </p>
      </div>
    </section>
  );
}
