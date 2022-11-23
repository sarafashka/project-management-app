import React from 'react';
import { Link } from 'react-router-dom';

import LogoIcon from 'components/Icons/LogoIcon';

import styles from './Logo.module.scss';
import AppRoutes from 'constants/routes';

const { logo, logoIconContent, logoIcon } = styles;

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={className}>
      <Link className={logo} to={AppRoutes.WELCOME}>
        <LogoIcon contentClassName={logoIconContent} className={logoIcon} /> Project Management
        System
      </Link>
    </h1>
  );
};

export default Logo;
