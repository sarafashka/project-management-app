import React from 'react';
import Button from '../components/Button/Button';
import './Auth.scss';

const Auth: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="forms-frame">
        <div className="buttons-block">
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
        <div className="auth-forms"></div>
      </div>
    </div>
  );
};

export default Auth;
