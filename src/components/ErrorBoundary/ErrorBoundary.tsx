import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';
import { withTranslation, WithTranslation } from 'react-i18next';
import Button from 'components/Button/Button';

const { errorBoundary, btn, title, content, message } = styles;

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
          <Button
            className={btn}
            onClick={() => {
              window.location.replace('/');
            }}
          >
            {this.props.t('error404.to-welcome-page')}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
