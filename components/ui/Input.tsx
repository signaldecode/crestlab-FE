import { forwardRef } from 'react';
import styles from '@/assets/styles/components/ui/Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize = 'md', className, ...rest }, ref) => {
    const sizeClass = inputSize !== 'md' ? styles[`input--${inputSize}`] : '';
    const classes = [styles.input, sizeClass, className].filter(Boolean).join(' ');

    return <input ref={ref} className={classes} {...rest} />;
  }
);

Input.displayName = 'Input';

export default Input;
