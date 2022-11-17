import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'components/Footer';

import styles from './Layout.module.scss';

const { layout, main, footer } = styles;

const Layout = (): JSX.Element => {
  return (
    <div className={layout}>
      <main className={main}>
        <Outlet />
      </main>
      <Footer className={footer} />
    </div>
  );
};

export default Layout;
