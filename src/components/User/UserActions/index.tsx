import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Icon } from 'types/types';
import ELEMENTS_ID from 'constants/elementsId';

import Button from 'components/Button/Button';
import { SignOutIcon } from 'components/Icons/Icons';

import styles from './UserActions.module.scss';
import Avatar from '../Avatar';

const { menu, item, btn, icon, signOutIcon, btnIcon, user, avatar, name } = styles;

type UserProps = {
  className?: string;
  data: {
    name: string;
    Icon?: ({ className }: Icon) => JSX.Element;
    path?: string;
    onClick?: () => void;
  }[];
  userName: string;
};

const UserActions: React.FC<UserProps> = ({ className, data, userName }) => {
  const navigate = useNavigate();

  return (
    <div className={menu}>
      <div id={ELEMENTS_ID.userInfo} className={user}>
        <Avatar className={avatar} name={userName} />
        <span className={name}>{userName}</span>
      </div>
      <ul className={classNames(className)}>
        {data.map(({ name, Icon, path, onClick }) => {
          return (
            <li className={item} key={name}>
              <Button
                className={btn}
                iconClassName={btnIcon}
                icon={
                  Icon && (
                    <Icon
                      className={classNames({ [icon]: Icon !== SignOutIcon })}
                      contentClassName={classNames({ [signOutIcon]: Icon === SignOutIcon })}
                    />
                  )
                }
                onClick={async () => {
                  await onClick?.();
                  path && navigate(path);
                }}
              >
                {name}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserActions;
