import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { CloseModalEvent } from 'types/types';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { BoardData } from 'types/types';

import { deleteBoardAction } from 'store/boardsSlice/boardsThunk';
import { selectBoard } from '../../store/boardsSlice/boardsSlice';

import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

import styles from './BoardCard.module.scss';

const { card, cardTitle, link, cardDescription, icon, content, deleteBtn } = styles;

type BoardCardProps = {
  className?: string;
  boardData: BoardData;
};

const BoardCard: React.FC<BoardCardProps> = ({ className, boardData }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { id, title, description } = boardData;

  const handleClick = () => {
    dispatch(deleteBoardAction(id));
  };

  const toggleModal = (event: CloseModalEvent) => {
    event.preventDefault();
    setIsOpen((prevState) => !prevState);
  };

  const handleSelectBoard = () => {
    dispatch(selectBoard);
  };

  return (
    <>
      <Link to={`${id}`} className={link} onClick={handleSelectBoard}>
        <div className={classNames(card, className)}>
          <span className={icon}></span>
          <div className={content}>
            <h3 className={cardTitle}>{title}</h3>
            <p className={cardDescription}>{description}</p>
          </div>
          <Button className={deleteBtn} onClick={toggleModal} kind="confirm">
            Delete
          </Button>
        </div>
      </Link>
      <Modal kind="confirmation" onClose={toggleModal} isOpen={isOpen}>
        <ConfirmationModal
          entity="board"
          value={title}
          onConfirm={handleClick}
          onCancel={toggleModal}
        />
      </Modal>
    </>
  );
};

export default BoardCard;
