import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
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
      <input
        className={cn(styles.input, { [`${styles[className || '']}`]: className })}
        {...rest}
        {...reactHookFormProps}
        autoComplete="off"
      />
    </label>
  );
};

export default Input;

{
  /* <label className={cn(styles.label, className)}>
      {label}
      <input
        className={cn(styles.input, { [`${styles[className || '']}`]: className })} */
}
