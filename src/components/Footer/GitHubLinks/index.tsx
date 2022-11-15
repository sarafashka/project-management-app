import React from 'react';

import { CONTACTS_BASE_URLS } from 'constants/contacts';
import { About } from 'types/types';

import GithubIcon from 'components/Icons/ContactsIcons';

import './GitHubLinks.scss';

type GitHubLinksProps = {
  contacts: About[];
};

const GitHubLinks: React.FC<GitHubLinksProps> = ({ contacts }) => {
  const modifiers = ['purple', 'red', 'pink'];

  return (
    <address className="github-links">
      <ul className="github-links__list">
        {contacts.map(({ id, contacts: { github } }) => (
          <li key={id}>
            <a
              className="github-links__item"
              target="_blank"
              rel="noopener noreferrer"
              href={`${CONTACTS_BASE_URLS.github}${github}`}
            >
              <GithubIcon
                className={`github-links__contact-icon github-links__contact-icon--${
                  modifiers[id - 1]
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </address>
  );
};

export default GitHubLinks;
