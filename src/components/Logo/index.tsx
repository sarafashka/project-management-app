import React from 'react';
import { Link } from 'react-router-dom';

import LogoIcon from 'components/Icons/LogoIcon';

import styles from './Logo.module.scss';

const { logo, logoIcon } = styles;

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={className}>
      <Link className={logo} to={'/'}>
        <LogoIcon contentClassName={logoIcon} /> Project Management System
      </Link>
    </h1>
  );
};

export default Logo;
