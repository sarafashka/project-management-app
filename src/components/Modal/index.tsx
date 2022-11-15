import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import Button from 'components/Button/Button';

import styles from './Modal.module.scss';

const { overlay, popup, closeBtn, container, openModal, closeModal } = styles;

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  kind: 'form' | 'confirmation';
  onClose: () => void;
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

  const wrapper = (
    <div>
      <div className={overlay} onClick={onClose} />
      <div className={classNames(popup, { [`${styles[kind || '']}`]: kind }, className)}>
        <Button className={closeBtn} onClick={onClose} kind="close" />
        <div className={container}>{children}</div>
      </div>
    </div>
  );

  return createPortal(wrapper, current);
};

export default Modal;
