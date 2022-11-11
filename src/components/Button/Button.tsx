import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  isDisabled = false,
  children,
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${className}`} disabled={isDisabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
