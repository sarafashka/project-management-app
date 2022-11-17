import React from 'react';
import classNames from 'classnames';

import { CONTACTS_BASE_URLS } from 'constants/contacts';
import { About } from 'types/types';

import GithubIcon from 'components/Icons/ContactsIcons';

import styles from './GitHubLinks.module.scss';

const { list, icon, purple, red, pink } = styles;

type GitHubLinksProps = {
  contacts: About[];
};

const GitHubLinks: React.FC<GitHubLinksProps> = ({ contacts }) => {
  const modifiers = [purple, red, pink];

  return (
    <address>
      <ul className={list}>
        {contacts.map(({ id, contacts: { github } }) => (
          <li key={id}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${CONTACTS_BASE_URLS.github}${github}`}
            >
              <GithubIcon className={classNames(icon, modifiers[id - 1])} />
            </a>
          </li>
        ))}
      </ul>
    </address>
  );
};

export default GitHubLinks;
