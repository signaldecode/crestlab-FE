'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from '@/assets/styles/components/containers/auth/AuthFormContainer.module.scss';

export interface LoginMessages {
  title: string;
  subtitle: string;
  userId: string;
  userIdPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  submit: string;
  submitAriaLabel: string;
  forgotPassword: string;
  findId: string;
  noAccount: string;
  goRegister: string;
  errors: {
    userIdRequired: string;
    passwordRequired: string;
    loginFailed: string;
  };
}

interface LoginFormProps {
  messages: LoginMessages;
  onSuccess?: () => void;
  idPrefix?: string;
}

export default function LoginForm({ messages, onSuccess, idPrefix = 'login' }: LoginFormProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!userId.trim()) {
      newErrors.userId = messages.errors.userIdRequired;
    }

    if (!password) {
      newErrors.password = messages.errors.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    // TODO: API 연동 (POST /api/auth/login)
    console.log('login', { userId, password });
    onSuccess?.();
  };

  return (
    <>
      {serverError && (
        <p className={styles['error-banner']} role="alert">{serverError}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          label={messages.userId}
          htmlFor={`${idPrefix}-userid`}
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
          label={messages.password}
          htmlFor={`${idPrefix}-password`}
          required
          error={errors.password}
        >
          <Input
            type="password"
            placeholder={messages.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>

        <div className={styles['forgot-link-row']}>
          <Link href="/find-id" className={styles['forgot-link']}>
            {messages.findId}
          </Link>
          <Link href="/reset-password" className={styles['forgot-link']}>
            {messages.forgotPassword}
          </Link>
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
        <span>{messages.noAccount}</span>
        <Link href="/register" className={styles.link}>{messages.goRegister}</Link>
      </p>
    </>
  );
}
