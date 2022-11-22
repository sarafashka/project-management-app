import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { authService } from 'api/authService';
import AppRoutes, { publicRoutes } from 'constants/routes';

import Logo from 'components/Logo';
import User from 'components/User';
import Button from 'components/Button/Button';
import Switcher from 'components/Switcher';

import styles from './Header.module.scss';

const { header, container, btnContainer, sticky } = styles;

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  const changeHeaderStyle = () => {
    window.scrollY > 0
      ? headerRef.current?.classList.add(sticky)
      : headerRef.current?.classList.remove(sticky);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderStyle);

    return () => window.removeEventListener('scroll', changeHeaderStyle);
  }, []);

  return (
    <>
      <header className={classNames(header, className)} ref={headerRef}>
        <div className={container}>
          <Logo />
          <div className={btnContainer}>
            {!publicRoutes.includes(pathname) && <Button kind="fillBackground">New Board</Button>}
            <Switcher optionLabels={['ru', 'en']} />
            {pathname !== AppRoutes.AUTH && authService.isUserLogged() && <User />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
