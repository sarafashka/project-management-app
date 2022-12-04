import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import { resetSearch } from 'store/boardsSlice/boardsSlice';
import { authService } from 'api/authService';
import AppRoutes from 'constants/routes';

import Button from 'components/Button/Button';
import { ArrowRightIcon, SignInIcon, SignUpIcon } from 'components/Icons/Icons';

import styles from './WelcomeHeaderNavigation.module.scss';

const { container, btn, arrowIcon, iconContent, linkBtn, mainBtn, mainIcon, icon } = styles;

type HeaderProps = {
  className?: string;
};

const WelcomeHeaderNavigation: React.FC<HeaderProps> = ({ className }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'welcome' });

  const buttons = {
    false: [
      {
        link: { to: AppRoutes.AUTH },
        btn: {
          name: t('button.signIn'),
          icon: <SignInIcon contentClassName={iconContent} />,
          className: btn,
          iconClassName: icon,
        },
      },
      {
        link: { to: AppRoutes.AUTH, state: 'reg' },
        btn: {
          name: t('button.signUp'),
          icon: <SignUpIcon contentClassName={iconContent} />,
          className: btn,
          iconClassName: icon,
        },
      },
    ],
    true: [
      {
        link: { to: AppRoutes.BOARDS, onClick: () => dispatch(resetSearch()) },
        btn: {
          name: t('button.main-page'),
          icon: <ArrowRightIcon className={arrowIcon} />,
          iconClassName: classNames(mainIcon, icon),
          className: classNames(btn, mainBtn),
        },
      },
    ],
  };

  return (
    <div className={classNames(container, className)}>
      {pathname === AppRoutes.WELCOME &&
        buttons[`${authService.isUserLogged()}`].map(({ link, btn: { name, ...other } }) => (
          <Link {...link} className={linkBtn} key={name}>
            <Button kind="fillBackground" {...other}>
              {name}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default WelcomeHeaderNavigation;
