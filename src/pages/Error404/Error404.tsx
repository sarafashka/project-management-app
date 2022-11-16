import React from 'react';
import './Error404.scss';
import Error404Svg from './Error404svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="error404">
      <Error404Svg />
      <div className="message-box">
        <h1>404</h1>
        <p>Page not found</p>
        <Button onClick={() => navigate('/')}>To main page</Button>
      </div>
    </div>
  );
};

export default Error404;