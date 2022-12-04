import React from 'react';
import classNames from 'classnames';

import Modal from 'components/Modal';

import styles from './Loader.module.scss';

type LoaderProps = {
  className?: string;
  isOpen: boolean;
};

const Loader: React.FC<LoaderProps> = ({ className, isOpen }) => {
  return (
    <Modal kind="loader" isOpen={isOpen}>
      <div className={classNames(styles.loader, className)} />
    </Modal>
  );
};

export default Loader;
