import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  reactHookFormProps?: Record<string, unknown>;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', reactHookFormProps, ...rest }) => {
  return (
    <label className={cn(styles.label, className)}>
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
