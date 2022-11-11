import React, { useState } from 'react';
import Button from '../components/Button/Button';
import styles from './Auth.module.scss';
import LoginForm from '../components/AuthForms/LoginForm';
import RegisterForm from '../components/AuthForms/RegisterForm';

const Auth: React.FC = () => {
  const [isLoginFormActive, setIsLoginFormActive] = useState(true);
  const loginButtonStyle = !isLoginFormActive ? styles.deactivated : '';
  const registerButtonStyle = isLoginFormActive ? styles.deactivated : '';

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.buttons}>
          <Button
            className={`${styles.button} ${loginButtonStyle}`}
            onClick={() => setIsLoginFormActive(true)}
          >
            Login
          </Button>
          <Button
            className={`${styles.button} ${registerButtonStyle}`}
            onClick={() => setIsLoginFormActive(false)}
          >
            Register
          </Button>
        </div>
        <div className={styles.forms}>{isLoginFormActive ? <LoginForm /> : <RegisterForm />}</div>
      </div>
    </div>
  );
};

export default Auth;
