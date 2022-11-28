import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  reactHookFormProps?: Record<string, unknown>;
  className?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className = '',
  inputClassName,
  reactHookFormProps,
  ...rest
}) => {
  return (
    <label className={cn(styles.label, className)}>
      {label}
      <input
        className={cn(styles.input, { [`${styles[className || '']}`]: className }, inputClassName)}
        {...rest}
        {...reactHookFormProps}
        autoComplete="off"
      />
    </label>
  );
};

export default Input;
