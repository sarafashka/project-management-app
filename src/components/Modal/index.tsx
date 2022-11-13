import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import Button from 'components/Button/Button';

import styles from './Modal.module.scss';

const { overlay, popup, closeBtn } = styles;
const modalClassName = 'open-modal';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, className, onClose }) => {
  const { current } = useRef(document.createElement('div'));

  useEffect(() => {
    modalRoot?.appendChild(current);
    modalRoot?.classList.add(modalClassName);

    return () => {
      modalRoot?.removeChild(current);
      modalRoot?.classList.remove(modalClassName);
    };
  }, [current]);

  const handleClose = () => {
    onClose();
  };

  const wrapper = (
    <div>
      <div className={overlay} onClick={handleClose} />
      <div className={classNames(popup, className)}>
        <Button className={closeBtn} onClick={handleClose} kind="close" />
        {children}
      </div>
    </div>
  );

  return createPortal(wrapper, current);
};

export default Modal;
