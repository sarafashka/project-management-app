import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  reactHookFormProps?: Record<string, unknown>;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', reactHookFormProps, ...rest }) => {
  return (
    <label className={`${styles.label} ${className}`}>
      {label}
      <input className={styles.input} {...rest} {...reactHookFormProps} />
    </label>
  );
};

export default Input;
