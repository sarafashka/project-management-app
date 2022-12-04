import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { BoardData, CreateBoardData, DataFromEditForm, OpenModalEvent } from 'types/types';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';

import { deleteBoardAction, updateBoardAction } from 'store/boardsSlice/boardsThunk';
import { resetSearch, selectBoard } from '../../store/boardsSlice/boardsSlice';

import { DeleteIcon, EditIcon } from 'components/Icons/Icons';
import EditingModal from 'components/Modal/EditingModal';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

import styles from './BoardCard.module.scss';

const {
  card,
  header,
  cardTitle,
  link,
  cardDescription,
  icon,
  content,
  btnContainer,
  btn,
  btnIcon,
} = styles;

type BoardCardProps = {
  className?: string;
  boardData: BoardData;
};

const BoardCard: React.FC<BoardCardProps> = ({ className, boardData }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [modalKind, setModalKind] = useState('');

  const { id, title, description } = boardData;

  const handleDeleteClick = () => {
    dispatch(deleteBoardAction(id));
    closeModal();
  };

  const handleSelectBoard = () => {
    dispatch(selectBoard);
  };

  const handleUpdateClick = (formData: DataFromEditForm) => {
    dispatch(
      updateBoardAction({
        id,
        body: { ...(formData as CreateBoardData) },
      })
    );
    dispatch(resetSearch());
    closeModal();
  };

  const openModal = (event: OpenModalEvent) => {
    event.preventDefault();
    const kind = event.currentTarget.className;

    setIsOpen(true);
    kind && setModalKind(kind);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Link to={`${id}`} state="boardId" className={link} onClick={handleSelectBoard}>
        <div className={classNames(card, className)}>
          <div className={header}>
            <span className={icon}></span>
            <div className={btnContainer}>
              <Button
                className={btn}
                onClick={openModal}
                icon={<EditIcon className={btnIcon} />}
                kind="edit"
              />
              <Button
                className={btn}
                onClick={openModal}
                icon={<DeleteIcon className={btnIcon} />}
                kind="deleteBtn"
              />
            </div>
          </div>
          <div className={content}>
            <h3 className={cardTitle}>{title}</h3>
            <p className={cardDescription}>{description}</p>
          </div>
        </div>
      </Link>
      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        {modalKind.includes('edit') && (
          <EditingModal
            entity="board"
            onConfirm={handleUpdateClick}
            onCancel={closeModal}
            operation={'edit'}
            currentValue={{ title, description }}
          />
        )}
        {modalKind.includes('delete') && (
          <ConfirmationModal
            entity="board"
            value={title}
            onConfirm={handleDeleteClick}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  );
};

export default BoardCard;
