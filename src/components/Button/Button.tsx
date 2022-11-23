import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const { button, btnIcon } = styles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'close' | 'confirm' | 'cancel' | 'boardBtn' | 'delete' | 'fillBackground';
  icon?: React.ReactNode;
  iconClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  kind,
  icon,
  iconClassName,
  ...rest
}) => {
  return (
    <button
      className={classNames(button, { [`${styles[kind || '']}`]: kind }, className)}
      {...rest}
    >
      {icon && <span className={classNames(btnIcon, iconClassName)}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
