import React, { useState } from 'react';
import styles from './ColumnAddTask.module.scss';
import Button from 'components/Button/Button';
import { useAppDispatch } from 'hooks/reduxTypedHooks';
import { DataFromEditForm, OpenModalEvent } from 'types/types';
import Modal from 'components/Modal';
import EditingModal from 'components/Modal/EditingModal';
import { createTask } from 'store/taskSlice/taskThunk';

type Props = {
  columnId: string;
  userId: string;
  boardId: string;
};

const ColumnAddTask: React.FC<Props> = (column) => {
  const [isOpen, setIsOpen] = useState(false);
  const { columnId, userId, boardId } = column;
  const dispatch = useAppDispatch();

  const handleClick = (formData: DataFromEditForm) => {
    const { title, description } = formData;
    const dataForCreateTask = {
      boardId: boardId,
      columnId: columnId,
      body: {
        title: title,
        description: description as string,
        userId: userId,
      },
    };
    dispatch(createTask(dataForCreateTask));
    closeModal();
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
      <Button className={styles.newTask} onClick={openModal}>
        + Add a task
      </Button>

      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="task"
          onConfirm={handleClick}
          onCancel={closeModal}
          operation={'create'}
          isOpen={isOpen}
        />
      </Modal>
    </>
  );
};

export default ColumnAddTask;
