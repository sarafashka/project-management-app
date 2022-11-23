import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Icon } from 'types/types';

import Button from 'components/Button/Button';
import { SignOutIcon } from 'components/Icons/Icons';

import styles from './UserActions.module.scss';

const { item, btn, icon, signOutIcon, btnIcon } = styles;

type UserProps = {
  className?: string;
  data: {
    name: string;
    Icon?: ({ className }: Icon) => JSX.Element;
    path?: string;
    onClick?: () => void;
  }[];
};

const UserActions: React.FC<UserProps> = ({ className, data }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default UserActions;
