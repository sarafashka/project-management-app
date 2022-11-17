import React from 'react';
import classNames from 'classnames';

import styles from './Loader.module.scss';

type LoaderProps = {
  className?: string;
};

const Loader = (props: LoaderProps) => {
  const { className } = props;

  return <div className={classNames(styles.loader, className)} />;
};

export default Loader;
