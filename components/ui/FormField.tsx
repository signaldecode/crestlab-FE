import { cloneElement, isValidElement } from 'react';
import styles from '@/assets/styles/components/ui/FormField.module.scss';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const hintId = hint && !error ? `${htmlFor}-hint` : undefined;
  const describedBy = errorId || hintId || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>

      {isValidElement<Record<string, unknown>>(children)
        ? cloneElement(children, {
            id: htmlFor,
            'aria-invalid': !!error || undefined,
            'aria-describedby': describedBy,
          })
        : children}

      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}
