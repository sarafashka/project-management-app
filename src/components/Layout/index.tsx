import React from 'react';
import { Outlet } from 'react-router-dom';

import Main from 'pages/Main';
import Footer from 'components/Footer';

import styles from './Layout.module.scss';

const { layout, main, footer } = styles;

const Layout = (): JSX.Element => {
  return (
    <div className={layout}>
      <main className={main}>
        <Main />
        <Outlet />
      </main>
      <Footer className={footer} />
    </div>
  );
};

export default Layout;
