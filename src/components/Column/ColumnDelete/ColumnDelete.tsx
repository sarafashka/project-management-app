import React, { useState } from 'react';
import cn from 'classnames';
import styles from './ColumnDelete.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch } from 'hooks/reduxTypedHooks';
import { OpenModalEvent, RequestDeleteColumn } from 'types/types';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

type Props = {
  columnId: string;
  title: string;
  boardId: string;
};

const ColumnDelete: React.FC<Props> = (column) => {
  const [isOpen, setIsOpen] = useState(false);
  const { columnId, title, boardId } = column;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const dataForDeleteColumn: RequestDeleteColumn = {
      columnId: columnId,
      boardId: boardId,
    };
    dispatch(deleteColumn(dataForDeleteColumn));
  };

  const openModal = (event: OpenModalEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button className={cn(styles.button)} type="button" kind="delete" onClick={openModal} />
      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <ConfirmationModal
          entity="column"
          value={title}
          onConfirm={handleClick}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default ColumnDelete;
