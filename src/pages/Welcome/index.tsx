import React from 'react';

import Footer from 'components/Footer';

import styles from './Welcome.module.scss';

const Welcome: React.FC = () => {
  return (
    <div className={styles.welcome}>
      <div>RSS final task: Project management app</div>
      <Footer />
    </div>
  );
};

export default Welcome;
