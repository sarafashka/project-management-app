import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.scss';
import { withTranslation, WithTranslation } from 'react-i18next';
import AppRoutes from 'constants/routes';
import Button from 'components/Button/Button';

const { errorBoundary, link, btn, title, content, message } = styles;

interface Props extends WithTranslation {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={errorBoundary}>
          <div className={message}>
            <h2 className={title}>{this.props.t('error404.oopsTitle')}</h2>
            <p className={content}>{this.props.t('error404.oopsMessage')}</p>
          </div>
          <Link to={AppRoutes.WELCOME} className={link}>
            <Button className={btn}>{this.props.t('error404.to-welcome-page')}</Button>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
