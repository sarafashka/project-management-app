import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  className?: string;
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className = '', children }) => {
  return <p className={`${styles.error} ${className}`}>{children}</p>;
};

export default ErrorMessage;
