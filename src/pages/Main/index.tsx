import React from 'react';

import BoardCard from 'components/BoardCard';

import styles from './Main.module.scss';

const { container, list, item } = styles;

const data = [
  {
    id: 'aaa',
    title: 'My board',
    description: 'Jdjkvfsdh sdhkdjfh njdsfkjs nfdjgsfjv jvhdgfhvk[sfd l',
  },
  {
    id: 'fff',
    title: 'My board',
    description: 'Jdjkvfsdh sdhkdjfh njdsfkjs nfdjgsfjv jvhdgfhvk[sfd l',
  },
  {
    id: 'ggg',
    title: 'My board',
    description: 'Jdjkvfsdh sdhkdjfh njdsfkjs nfdjgsfjv jvhdgfhvk[sfd l',
  },
];

const Main: React.FC = () => {
  return (
    <div className={container}>
      <ul className={list}>
        {data.map((cardData) => (
          <li key={cardData.id} className={item}>
            <BoardCard boardData={cardData} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
