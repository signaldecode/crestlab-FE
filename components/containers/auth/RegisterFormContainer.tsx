'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

interface RegisterMessages {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  userId: string;
  userIdPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  verificationCode: string;
  verificationCodePlaceholder: string;
  sendCode: string;
  resendCode: string;
  verifyCode: string;
  phoneVerified: string;
  password: string;
  passwordPlaceholder: string;
  passwordConfirm: string;
  passwordConfirmPlaceholder: string;
  termsAgree: string;
  submit: string;
  submitAriaLabel: string;
  hasAccount: string;
  goLogin: string;
  errors: {
    nameRequired: string;
    userIdRequired: string;
    userIdInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
    codeSendFailed: string;
    codeRequired: string;
    codeInvalid: string;
    phoneNotVerified: string;
    passwordRequired: string;
    passwordMin: string;
    passwordMismatch: string;
    termsRequired: string;
  };
}

interface RegisterFormContainerProps {
  messages: RegisterMessages;
}

export default function RegisterFormContainer({ messages }: RegisterFormContainerProps) {
  const [form, setForm] = useState({
    name: '',
    userId: '',
    phone: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [codeSent, setCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendCode = () => {
    const phoneErrors: Record<string, string> = {};

    if (!form.phone.trim()) {
      phoneErrors.phone = messages.errors.phoneRequired;
    } else if (!/^01[016789]\d{7,8}$/.test(form.phone.replace(/-/g, ''))) {
      phoneErrors.phone = messages.errors.phoneInvalid;
    }

    if (Object.keys(phoneErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...phoneErrors }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.phone;
      return next;
    });

    // TODO: API 연동 (POST /api/auth/send-code)
    console.log('send code', form.phone);
    setCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (!form.verificationCode.trim()) {
      setErrors((prev) => ({ ...prev, verificationCode: messages.errors.codeRequired }));
      return;
    }

    // TODO: API 연동 (POST /api/auth/verify-code)
    console.log('verify code', form.verificationCode);
    setPhoneVerified(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.verificationCode;
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = messages.errors.nameRequired;

    if (!form.userId.trim()) {
      e.userId = messages.errors.userIdRequired;
    } else if (!/^[a-zA-Z0-9]{4,20}$/.test(form.userId)) {
      e.userId = messages.errors.userIdInvalid;
    }

    if (!form.phone.trim()) {
      e.phone = messages.errors.phoneRequired;
    } else if (!/^01[016789]\d{7,8}$/.test(form.phone.replace(/-/g, ''))) {
      e.phone = messages.errors.phoneInvalid;
    }

    if (!phoneVerified) {
      e.phoneVerification = messages.errors.phoneNotVerified;
    }

    if (!form.password) {
      e.password = messages.errors.passwordRequired;
    } else if (form.password.length < 8) {
      e.password = messages.errors.passwordMin;
    }

    if (form.password !== form.passwordConfirm) {
      e.passwordConfirm = messages.errors.passwordMismatch;
    }

    if (!form.terms) e.terms = messages.errors.termsRequired;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    // TODO: API 연동 (POST /api/auth/register)
    console.log('register', form);
  };

  return (
    <section className={styles.auth}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{messages.title}</h1>
          <p className={styles.subtitle}>{messages.subtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <FormField
            label={messages.name}
            htmlFor="register-name"
            required
            error={errors.name}
          >
            <Input
              type="text"
              placeholder={messages.namePlaceholder}
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="name"
            />
          </FormField>

          <FormField
            label={messages.userId}
            htmlFor="register-userid"
            required
            error={errors.userId}
          >
            <Input
              type="text"
              placeholder={messages.userIdPlaceholder}
              value={form.userId}
              onChange={(e) => update('userId', e.target.value)}
              autoComplete="username"
            />
          </FormField>

          <FormField
            label={messages.phone}
            htmlFor="register-phone"
            required
            error={errors.phone}
          >
            <div className={styles['verify-row']}>
              <Input
                type="tel"
                placeholder={messages.phonePlaceholder}
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
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
              htmlFor="register-verification-code"
              required
              error={errors.verificationCode}
            >
              <div className={styles['verify-row']}>
                <Input
                  type="text"
                  placeholder={messages.verificationCodePlaceholder}
                  value={form.verificationCode}
                  onChange={(e) => update('verificationCode', e.target.value)}
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
            <p className={styles['success-text']} role="status">
              {messages.phoneVerified}
            </p>
          )}

          {errors.phoneVerification && (
            <p className={styles['field-error']} role="alert">
              {errors.phoneVerification}
            </p>
          )}

          <FormField
            label={messages.password}
            htmlFor="register-password"
            required
            error={errors.password}
            hint={!errors.password ? messages.passwordPlaceholder : undefined}
          >
            <Input
              type="password"
              placeholder={messages.passwordPlaceholder}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              autoComplete="new-password"
            />
          </FormField>

          <FormField
            label={messages.passwordConfirm}
            htmlFor="register-password-confirm"
            required
            error={errors.passwordConfirm}
          >
            <Input
              type="password"
              placeholder={messages.passwordConfirmPlaceholder}
              value={form.passwordConfirm}
              onChange={(e) => update('passwordConfirm', e.target.value)}
              autoComplete="new-password"
            />
          </FormField>

          <div>
            <Checkbox
              id="register-terms"
              label={messages.termsAgree}
              checked={form.terms}
              onChange={(e) => update('terms', e.target.checked)}
            />
            {errors.terms && (
              <p className={styles['field-error']} role="alert">
                {errors.terms}
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              aria-label={messages.submitAriaLabel}
            >
              {messages.submit}
            </Button>
          </div>
        </form>

        <p className={styles['link-row']}>
          <span>{messages.hasAccount}</span>
          <Link href="/login" className={styles.link}>{messages.goLogin}</Link>
        </p>
      </div>
    </section>
  );
}
