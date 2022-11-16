import React from 'react';
import classNames from 'classnames';

import { ABOUT } from 'constants/contacts';

import GithubIcon from 'components/Icons/ContactsIcons';
import RSShoolIcon from 'components/Icons/RSSchoolIcon';
import GitHubLinks from './GitHubLinks';

import styles from './Footer.module.scss';

const { footer, container, column, icon } = styles;
type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames(footer, className)}>
      <div className={container}>
        <a target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
          <RSShoolIcon className={icon} />
        </a>
        <span className={column}>
          Project
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Aliseiko/project-management-app/"
          >
            <GithubIcon className={icon} />
          </a>
        </span>
        <span className={column}>
          Developers
          <GitHubLinks contacts={ABOUT} />
        </span>
        © 2022
      </div>
    </footer>
  );
};

export default Footer;