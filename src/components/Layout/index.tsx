import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import styles from './Layout.module.scss';

const { layout } = styles;

const Layout = (): JSX.Element => {
  return (
    <div className={layout}>
      <Header />
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
