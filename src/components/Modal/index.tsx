import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { CloseModalEvent } from 'types/types';

import Button from 'components/Button/Button';

import styles from './Modal.module.scss';

const { overlay, popup, closeBtn, container, openModal, closeModal } = styles;

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  kind: 'form' | 'confirmation';
  onClose: (e: CloseModalEvent) => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, className, kind, onClose, isOpen }) => {
  const { current } = useRef(document.createElement('div'));

  useEffect(() => {
    if (isOpen && !current.closest(`.${closeModal}`)) {
      modalRoot?.appendChild(current);
      modalRoot?.classList.add(openModal);
    } else if (current.closest(`.${openModal}`)) {
      modalRoot?.classList.remove(openModal);
      modalRoot?.classList.add(closeModal);

      const timerId = setTimeout(() => {
        modalRoot?.classList.remove(closeModal);
        modalRoot?.removeChild(current);
        clearTimeout(timerId);
      }, 500);
    }
  }, [current, isOpen]);

  const handleClose = (e: CloseModalEvent) => {
    if (isOpen) {
      onClose(e);
    }
  };

  const wrapper = (
    <div>
      <div className={overlay} onClick={handleClose} />
      <div className={classNames(popup, { [`${styles[kind || '']}`]: kind }, className)}>
        <Button className={closeBtn} onClick={handleClose} kind="close" />
        <div className={container}>{children}</div>
      </div>
    </div>
  );

  return createPortal(wrapper, current);
};

export default Modal;
