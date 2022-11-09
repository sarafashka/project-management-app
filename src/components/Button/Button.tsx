import React from 'react';
import './Button.scss';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  className?: string;
  isDisabled?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  isDisabled = false,
  handleClick,
  type = 'button',
  children,
}) => {
  return (
    <button
      className={`button ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
