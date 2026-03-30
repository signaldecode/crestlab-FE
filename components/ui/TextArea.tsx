import { forwardRef } from 'react';
import styles from '@/assets/styles/components/ui/TextArea.module.scss';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...rest }, ref) => {
    const classes = [styles.textarea, className].filter(Boolean).join(' ');

    return <textarea ref={ref} className={classes} {...rest} />;
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
