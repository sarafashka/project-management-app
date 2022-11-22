import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import User from 'components/User';
import Button from 'components/Button/Button';
import Switcher from 'components/Switcher';

import styles from './Header.module.scss';
import Logo from 'components/Logo';

const { header, container, btnContainer, sticky } = styles;

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
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
            <Button kind="fillBackground">New Board</Button>
            <Switcher optionLabels={['ru', 'en']} />
            <User />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
