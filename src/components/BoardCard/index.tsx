import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { BoardData } from 'types/boardTypes';

import styles from './BoardCard.module.scss';

const { card, cardTitle, link, cardDescription, icon, content, deleteBtn } = styles;

type BoardCardProps = {
  className?: string;
  boardData: BoardData;
};

const BoardCard: React.FC<BoardCardProps> = ({ className, boardData }) => {
  const { id, title, description } = boardData;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Link to={`board/${id}`} className={link}>
      <div className={classNames(card, className)}>
        <span className={icon}></span>
        <div className={content}>
          <h3 className={cardTitle}>{title}</h3>
          <p className={cardDescription}>{description}</p>
        </div>
        <div className={deleteBtn} onClick={handleClick}>
          Delete
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
