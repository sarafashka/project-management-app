import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import styles from './Layout.module.scss';

const { layout, fixLayout, fixMain } = styles;

const Layout = (): JSX.Element => {
  const [isScroll, setIsScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const changeHeaderStyle = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener('scroll', changeHeaderStyle);

    return () => window.removeEventListener('scroll', changeHeaderStyle);
  }, []);

  return (
    <div className={classNames(layout, { [fixLayout]: location.state === 'boardId' })}>
      <Header isScroll={isScroll} />
      <main className={classNames({ [fixMain]: location.state === 'boardId' })}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
