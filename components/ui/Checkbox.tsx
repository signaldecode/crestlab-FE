import { forwardRef } from 'react';
import styles from '@/assets/styles/components/ui/Checkbox.module.scss';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, disabled, className, ...rest }, ref) => {
    const labelClasses = [
      styles.label,
      disabled ? styles['label--disabled'] : '',
    ].filter(Boolean).join(' ');

    return (
      <label className={styles.wrap} htmlFor={id}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          disabled={disabled}
          className={[styles.checkbox, className].filter(Boolean).join(' ')}
          {...rest}
        />
        <span className={labelClasses}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
