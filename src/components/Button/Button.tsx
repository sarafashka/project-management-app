import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

const { button } = styles;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind: 'close' | 'confirm' | 'cancel';
}

const Button: React.FC<ButtonProps> = ({ children, className, kind, ...rest }) => {
  return (
    <button className={classNames(button, { [`${styles[kind]}`]: kind }, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
