import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { OpenModalEvent } from 'types/types';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { BoardData } from 'types/types';

import { deleteBoardAction } from 'store/boardsSlice/boardsThunk';
import { selectBoard } from '../../store/boardsSlice/boardsSlice';

import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

import styles from './BoardCard.module.scss';
import { useTranslation } from 'react-i18next';

const { card, cardTitle, link, cardDescription, icon, content, deleteBtn } = styles;

type BoardCardProps = {
  className?: string;
  boardData: BoardData;
};

const BoardCard: React.FC<BoardCardProps> = ({ className, boardData }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'button' });

  const { id, title, description } = boardData;

  const handleClick = () => {
    dispatch(deleteBoardAction(id));
    closeModal();
  };

  const openModal = (event: OpenModalEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          <Button className={deleteBtn} onClick={openModal} kind="confirm">
            {t('delete')}
          </Button>
        </div>
      </Link>
      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <ConfirmationModal
          entity="board"
          value={title}
          onConfirm={handleClick}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default BoardCard;
