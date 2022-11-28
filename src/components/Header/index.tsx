import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { CreateBoardData, DataFromEditForm } from 'types/types';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import { createBoardAction } from 'store/boardsSlice/boardsThunk';
import { authService } from 'api/authService';
import AppRoutes, { publicRoutes } from 'constants/routes';

import Logo from 'components/Logo';
import User from 'components/User';
import Button from 'components/Button/Button';
import Switcher from 'components/Switcher';
import { PlusIcon } from 'components/Icons/Icons';
import Modal from 'components/Modal';
import EditingModal from 'components/Modal/EditingModal';
import WelcomeHeaderNavigation from './WelcomeHeaderNavigation';

import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';

const { header, container, btnContainer, sticky } = styles;

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation');

  const changeHeaderStyle = () => {
    window.scrollY > 0
      ? headerRef.current?.classList.add(sticky)
      : headerRef.current?.classList.remove(sticky);
  };

  const handleCreateClick = (formData: DataFromEditForm) => {
    dispatch(
      createBoardAction({
        ...(formData as CreateBoardData),
      })
    );
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderStyle);

    return () => window.removeEventListener('scroll', changeHeaderStyle);
  }, []);

  return (
    <>
      <header className={classNames(header, className)} ref={headerRef}>
        <div className={container}>
          <Logo />
          <div className={btnContainer}>
            {!publicRoutes.includes(pathname) && (
              <Button kind="fillBackground" icon={<PlusIcon />} onClick={toggleModal}>
                {t('header.new-board')}
              </Button>
            )}
            <WelcomeHeaderNavigation />
            <Switcher optionLabels={['ru', 'en']} />
            {pathname !== AppRoutes.AUTH && authService.isUserLogged() && <User />}
          </div>
        </div>
      </header>
      <Modal kind="confirmation" onClose={toggleModal} isOpen={isOpen}>
        <EditingModal
          entity="board"
          onConfirm={handleCreateClick}
          onCancel={toggleModal}
          operation={'create'}
          isOpen={false}
        />
      </Modal>
    </>
  );
};

export default Header;
