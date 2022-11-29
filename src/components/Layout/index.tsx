import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import styles from './Layout.module.scss';

const { layout, wrapper } = styles;

const Layout = (): JSX.Element => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const changeHeaderStyle = () => {
    const scrollTop = layoutRef.current?.scrollTop;
    scrollTop !== undefined && setIsSticky(scrollTop > 0);
  };

  useEffect(() => {
    const layoutEl = layoutRef.current;
    layoutEl?.addEventListener('scroll', changeHeaderStyle);

    return () => layoutEl?.removeEventListener('scroll', changeHeaderStyle);
  }, []);

  return (
    <div className={wrapper} ref={layoutRef}>
      <div className={layout}>
        <Header isSticky={isSticky} />
        <main>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
