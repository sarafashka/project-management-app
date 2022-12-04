import React from 'react';
import classNames from 'classnames';

import { ABOUT } from 'constants/contacts';

import GithubIcon from 'components/Icons/ContactsIcons';
import RSShoolIcon from 'components/Icons/RSSchoolIcon';
import GitHubLinks from './GitHubLinks';

import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

const { footer, container, column, icon, rssLogo, year } = styles;

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });

  return (
    <footer className={classNames(footer, className)}>
      <div className={container}>
        <a target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
          <RSShoolIcon className={classNames(icon, rssLogo)} />
        </a>
        <span className={column}>
          {t('project')}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Aliseiko/project-management-app/"
          >
            <GithubIcon className={icon} />
          </a>
        </span>
        <span className={column}>
          {t('developers')}
          <GitHubLinks contacts={ABOUT} />
        </span>
        <span className={year}>© 2022</span>
      </div>
    </footer>
  );
};

export default Footer;
