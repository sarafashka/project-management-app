import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';

import styles from './Layout.module.scss';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const { layout } = styles;

const Layout = (): JSX.Element => {
  return (
    <div className={layout}>
      <main className={main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
