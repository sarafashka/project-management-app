import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import ELEMENTS_ID from 'constants/elementsId';
import { logout } from 'store/userSlice';
import { userService } from '../../api/userService';

import AppRoutes from 'constants/routes';

import Modal from 'components/Modal';
import Button from 'components/Button/Button';
import Avatar from './Avatar';
import { DropDownIcon, SignOutIcon, EditIcon } from 'components/Icons/Icons';
import UserActions from './UserActions';

import styles from './User.module.scss';
import { useTranslation } from 'react-i18next';
import { resetSearch } from 'store/boardsSlice/boardsSlice';

const { avatar, btn, dropDownBtn, open, btnIcon, content, userName } = styles;
const { userBtn, userInfo } = ELEMENTS_ID;

type UserProps = {
  className?: string;
};

const User: React.FC<UserProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { name } = userService.getUserData();

  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  const { t } = useTranslation('translation');

  const updateCoords = (btn: HTMLDivElement | null) => {
    if (btn) {
      const rect = btn.getBoundingClientRect();

      setCoords({
        top: rect.y + rect.height + 10,
        right: document.documentElement.clientWidth - rect.right,
      });
    }
  };

  const userRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
    userRef.current?.classList.toggle(open);
  };

  const handleClick = () => {
    toggleModal();

    updateCoords(userRef.current);
  };

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(resetSearch());
    toggleModal();
  };

  const handleCloseByDocument = (e: Event) => {
    const { target } = e;

    if (
      isOpen &&
      (target instanceof HTMLElement || target instanceof SVGElement) &&
      !target.closest(`#${userBtn}`) &&
      !target.closest(`#${userInfo}`)
    ) {
      toggleModal();
    }
  };

  const userActions = [
    {
      name: t('profile.edit-profile-btn'),
      Icon: EditIcon,
      onClick: toggleModal,
      path: AppRoutes.PROFILE,
    },
    {
      name: t('welcome.button.signOut'),
      Icon: SignOutIcon,
      onClick: handleSignOut,
      path: AppRoutes.WELCOME,
    },
  ];

  return (
    <div id={userBtn} ref={userRef}>
      <Button
        className={classNames(btn, className)}
        iconClassName={btnIcon}
        icon={<DropDownIcon className={dropDownBtn} />}
        onClick={handleClick}
      >
        <div className={content}>
          <Avatar className={avatar} name={name} />
          <span className={userName}>{name}</span>
        </div>
      </Button>
      <Modal
        kind="dropDown"
        isOpen={isOpen}
        onCloseByDocument={handleCloseByDocument}
        onCloseByScroll={toggleModal}
        coords={coords}
      >
        <UserActions data={userActions} userName={name} />
      </Modal>
    </div>
  );
};

export default User;
