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
  kind?: 'form' | 'confirmation' | 'userActions' | 'editing';
  onClose?: () => void;
  onCloseSimple?: (e: Event) => void;
  isOpen: boolean;
  coords?: {
    left?: number;
    top?: number;
    right?: number;
  };
};

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  kind,
  onClose,
  isOpen,
  coords,
  onCloseSimple,
}) => {
  const { current } = useRef(document.createElement('div'));

  useEffect(() => {
    if (isOpen && !current?.classList.contains(closeModal)) {
      modalRoot?.appendChild(current);
      current?.classList.add(openModal);

      if (kind === 'userActions' && onCloseSimple) {
        window.addEventListener('scroll', onCloseSimple);
        document.body.addEventListener('click', onCloseSimple);
      }
    } else if (current?.classList.contains(openModal)) {
      current?.classList.remove(openModal);
      current?.classList.add(closeModal);

      const timerId = setTimeout(() => {
        current?.classList.remove(closeModal);
        modalRoot?.removeChild(current);
        clearTimeout(timerId);
      }, 400);

      if (kind === 'userActions' && onCloseSimple) {
        return () => {
          window.removeEventListener('scroll', onCloseSimple);
          document.body.removeEventListener('click', onCloseSimple);
        };
      }
    }
  }, [current, isOpen, kind, onCloseSimple]);

  const wrapper = (
    <>
      {kind !== 'userActions' && <div className={overlay} onClick={onClose} />}
      <div
        className={classNames(popup, { [`${styles[kind || '']}`]: kind }, className)}
        style={{ ...coords }}
      >
        {kind !== 'userActions' && <Button className={closeBtn} onClick={onClose} kind="close" />}
        <div className={container}>{children}</div>
      </div>
    </>
  );

  return createPortal(wrapper, current);
};

export default Modal;
