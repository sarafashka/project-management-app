import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'components/Footer';

import styles from './Layout.module.scss';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const { layout, main, footer } = styles;

const Layout = (): JSX.Element => {
  return (
    <div className={layout}>
      <main className={main}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer className={footer} />
    </div>
  );
};

export default Layout;
