import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

const { button, closeBtn } = styles;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'close';
}

const Button: React.FC<ButtonProps> = ({ children, className, kind, ...rest }) => {
  return (
    <button
      className={classNames(button, { [`${closeBtn}`]: kind === 'close' }, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
