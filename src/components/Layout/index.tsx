import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import styles from './Layout.module.scss';

const { layout } = styles;

const Layout = (): JSX.Element => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const changeHeaderStyle = () => {
      setIsScroll(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', changeHeaderStyle);

    return () => window.removeEventListener('scroll', changeHeaderStyle);
  }, []);

  return (
    <div className={layout}>
      <Header isScroll={isScroll} />
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
