import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import { logout } from 'store/userSlice';
import { userService } from '../../api/userService';

import AppRoutes from 'constants/routes';

import Modal from 'components/Modal';
import Button from 'components/Button/Button';
import { DropDownIcon, SignOutIcon, EditIcon } from 'components/Icons/Icons';
import UserActions from './UserActions';

import styles from './User.module.scss';

const { avatar, btn, img, dropDownBtn, open, btnIcon } = styles;

type UserProps = {
  className?: string;
};

const User: React.FC<UserProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { login } = userService.getUserData();

  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

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
    toggleModal();
  };

  const handleCloseByDocument = (e: Event) => {
    const { target } = e;

    if (
      isOpen &&
      (target instanceof HTMLElement || target instanceof SVGElement) &&
      !target.closest('#userBtn')
    ) {
      toggleModal();
    }
  };

  const userActions = [
    {
      name: 'Edit profile',
      Icon: EditIcon,
      onClick: toggleModal,
      path: AppRoutes.PROFILE,
    },
    {
      name: 'Sign Out',
      Icon: SignOutIcon,
      onClick: handleSignOut,
      path: AppRoutes.AUTH,
    },
  ];

  return (
    <div id="userBtn" ref={userRef}>
      <Button
        className={classNames(btn, className)}
        iconClassName={btnIcon}
        icon={<DropDownIcon className={dropDownBtn} />}
        onClick={handleClick}
      >
        <div className={avatar}>
          <img className={img} src={require(`../../assets/img/1.jpg`)} alt={`${login} avatar`} />
        </div>
        {login}
      </Button>
      <Modal
        kind="dropDown"
        isOpen={isOpen}
        onCloseByScroll={toggleModal}
        onCloseByDocument={handleCloseByDocument}
        coords={coords}
      >
        <UserActions data={userActions} />
      </Modal>
    </div>
  );
};

export default User;
