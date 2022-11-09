import React from 'react';

import { ABOUT } from 'constants/contacts';

import GithubIcon from 'components/Icons/ContactsIcons';
import RSShoolIcon from 'components/Icons/RSSchoolIcon';
import GitHubLinks from './GitHubLinks';

import './Footer.scss';

const footerIconClassName = 'footer__icon';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
          <RSShoolIcon className={footerIconClassName} />
        </a>
        <span className="footer__column">
          Project
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Aliseiko/project-management-app/"
          >
            <GithubIcon className={footerIconClassName} />
          </a>
        </span>
        <span className="footer__column">
          Developers
          <GitHubLinks contacts={ABOUT} />
        </span>
        <span className="footer__year">© 2022</span>
      </div>
    </footer>
  );
};

export default Footer;
