import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import styles from './Auth.module.scss';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';
import { authService } from '../../api/authService';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Auth: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const location = useLocation();
  const [isLoginFormActive, setIsLoginFormActive] = useState(location.state !== 'reg');
  const loginButtonStyle = !isLoginFormActive ? styles.deactivated : '';
  const registerButtonStyle = isLoginFormActive ? styles.deactivated : '';

  if (authService.isUserLogged()) {
    return <Navigate replace to="/boards" />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.buttons}>
          <Button
            className={`${styles.button} ${loginButtonStyle}`}
            onClick={() => setIsLoginFormActive(true)}
          >
            {t('button.login')}
          </Button>
          <Button
            className={`${styles.button} ${registerButtonStyle}`}
            onClick={() => setIsLoginFormActive(false)}
          >
            {t('button.register')}
          </Button>
        </div>
        <div className={styles.forms}>{isLoginFormActive ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
};

export default Auth;
