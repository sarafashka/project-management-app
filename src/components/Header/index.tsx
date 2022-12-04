import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CreateBoardData, DataFromEditForm } from 'types/types';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import { resetSearch } from 'store/boardsSlice/boardsSlice';
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

const { header, container, btnContainer, sticky, link, btn, icon } = styles;

type HeaderProps = {
  className?: string;
  isScroll: boolean;
};

const Header: React.FC<HeaderProps> = ({ className, isScroll }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation');

  const handleCreateClick = (formData: DataFromEditForm) => {
    dispatch(
      createBoardAction({
        ...(formData as CreateBoardData),
      })
    );
    dispatch(resetSearch());
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className={classNames(header, { [`${sticky}`]: isScroll }, className)}>
        <div className={container}>
          <Logo />
          <div className={btnContainer}>
            {!publicRoutes.includes(pathname) && (
              <Link to={AppRoutes.BOARDS} onClick={toggleModal} className={link}>
                <Button
                  className={btn}
                  iconClassName={icon}
                  kind="fillBackground"
                  icon={<PlusIcon />}
                >
                  {t('header.new-board')}
                </Button>
              </Link>
            )}
            {pathname === AppRoutes.WELCOME && <WelcomeHeaderNavigation />}
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
        />
      </Modal>
    </>
  );
};

export default Header;
