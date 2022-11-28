import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import Button from 'components/Button/Button';

import styles from './Modal.module.scss';
import { OpenModalEvent } from 'types/types';

const { overlay, popup, closeBtn, container, openModal, closeModal } = styles;

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  kind?: 'form' | 'confirmation' | 'dropDown' | 'editing';
  onClose?: (e: OpenModalEvent) => void;
  onCloseByScroll?: () => void;
  onCloseByDocument?: (e: Event) => void;
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
  onCloseByScroll,
  onCloseByDocument,
}) => {
  const { current } = useRef(document.createElement('div'));

  useEffect(() => {
    if (isOpen && !current?.classList.contains(closeModal)) {
      modalRoot?.appendChild(current);
      current?.classList.add(openModal);
    } else if (current?.classList.contains(openModal)) {
      current?.classList.remove(openModal);
      current?.classList.add(closeModal);

      const timerId = setTimeout(() => {
        current?.classList.remove(closeModal);
        modalRoot?.removeChild(current);
        clearTimeout(timerId);
      }, 400);
    }
  }, [current, isOpen]);

  useEffect(() => {
    if (kind === 'dropDown') {
      const handleCloseByScroll = () => {
        isOpen && window.scrollY > 0 && onCloseByScroll?.();
      };

      window.addEventListener('scroll', handleCloseByScroll);
      onCloseByDocument && document.body.addEventListener('click', onCloseByDocument);

      return () => {
        window.removeEventListener('scroll', handleCloseByScroll);
        onCloseByDocument && document.body.removeEventListener('click', onCloseByDocument);
      };
    }
  }, [isOpen, kind, onCloseByDocument, onCloseByScroll]);

  const wrapper = (
    <>
      {kind !== 'dropDown' && <div className={overlay} onClick={onClose} />}
      <div
        className={classNames(popup, { [`${styles[kind || '']}`]: kind }, className)}
        style={{ ...coords }}
      >
        {kind !== 'dropDown' && <Button className={closeBtn} onClick={onClose} kind="close" />}
        <div className={container}>{children}</div>
      </div>
    </>
  );

  return createPortal(wrapper, current);
};

export default Modal;
