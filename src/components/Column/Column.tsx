import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { deleteColumn, updateColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { CloseModalEvent, GetBoardByIdColumnData, RequestDeleteColumn } from 'types/types';
import ColumnTitle from './ColumnTitle';
import Task from 'components/Task';
import { createTask } from 'store/taskSlice/taskThunk';
import { selectUser } from 'store/selectors/selectors';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumn } from 'utils/utils';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

type Props = {
  id: string;
};

const Column: React.FC<Props> = (column) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = column;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const board = useAppSelector(selectTasksList);
  const currentColumn = findColumn(board, id) as GetBoardByIdColumnData;
  const { title, tasks } = currentColumn;

  const handleSubmit = (title: string) => {
    if (title) {
      const newTitle = title;
      const dataForUpdateColumn = {
        boardId: board.id,
        columnId: id,
        body: {
          title: newTitle,
          order: currentColumn?.order,
        },
      };
      dispatch(updateColumn(dataForUpdateColumn));
    }
  };

  const dataForCreateTask = {
    boardId: board.id,
    columnId: id,
    body: {
      title: 'task',
      description: 'Something descriprion here. It is very interisting and usefull task',
      userId: user.id,
    },
  }; // delete when modal will be finish

  const handleClick = () => {
    const dataForDeleteColumn: RequestDeleteColumn = {
      columnId: id,
      boardId: board.id,
    };
    dispatch(deleteColumn(dataForDeleteColumn));
  };

  const openModal = (event: CloseModalEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.header}>
          <p className={styles.count}>({tasks.length})</p>
          <ColumnTitle title={title} submit={handleSubmit} />
          <Button className={cn(styles.button)} type="button" kind="delete" onClick={openModal} />
        </div>

        {<Task columnId={id} />}

        <Button className={styles.newTask} onClick={() => dispatch(createTask(dataForCreateTask))}>
          + Add a task
        </Button>
      </div>
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

export default Column;
