import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import Button from 'components/Button/Button';

import styles from './Modal.module.scss';

const { overlay, popup, closeBtn, container, openModal, closeModal, hidden } = styles;

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  kind?: 'confirmation' | 'dropDown' | 'editing' | 'loader';
  onClose?: () => void;
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
  onCloseByDocument,
  onCloseByScroll,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { current } = useRef(document.createElement('div'));

  useEffect(() => {
    if (isOpen && !current?.classList.contains(closeModal)) {
      modalRoot?.appendChild(current);
      current?.classList.add(openModal);
      setIsOpenModal(true);

      if (kind !== 'dropDown') {
        const scrollHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );

        if (document.documentElement.clientHeight !== scrollHeight) {
          document.body.style.top = `${window.pageYOffset}px`;
          document.body.classList.add(hidden);
        }
      }
    } else if (current?.classList.contains(openModal)) {
      current?.classList.remove(openModal);
      current?.classList.add(closeModal);

      const timerId = setTimeout(() => {
        kind !== 'dropDown' && document.body.classList.remove(hidden);
        current?.classList.remove(closeModal);
        modalRoot?.removeChild(current);
        setIsOpenModal(false);
        clearTimeout(timerId);
      }, 300);
    }
  }, [current, isOpen, kind]);

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

  const modalContent = <div className={container}>{children}</div>;
  const wrapper = isOpenModal && (
    <>
      {kind !== 'dropDown' && <div className={overlay} onClick={onClose} />}
      {kind !== 'loader' ? (
        <div
          className={classNames(popup, { [`${styles[kind || '']}`]: kind }, className)}
          style={{ ...coords }}
        >
          {kind !== 'dropDown' && <Button className={closeBtn} onClick={onClose} kind="close" />}
          {modalContent}
        </div>
      ) : (
        modalContent
      )}
    </>
  );

  return createPortal(wrapper, current);
};

export default Modal;
