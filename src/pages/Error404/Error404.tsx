import React from 'react';
import './Error404.scss';
import Error404Svg from './Error404svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import AppRoutes from 'constants/routes';

const Error404: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'error404' });
  const navigate = useNavigate();
  return (
    <div className={classNames('error404')}>
      <Error404Svg className="error-404-svg" />
      <div className="message-box">
        <h1>404</h1>
        <p>{t('page-not-found')}</p>
        <Button onClick={() => navigate(AppRoutes.BOARDS)}>{t('to-main-page')}</Button>
      </div>
    </div>
  );
};

export default Error404;
