import React from 'react';
import styles from './Button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  className?: string;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  isDisabled = false,
  onClick,
  type = 'button',
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
