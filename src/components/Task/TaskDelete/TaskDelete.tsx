import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTasksList } from 'store/selectors/selectors';
import styles from './TaskDelete.module.scss';
import Button from 'components/Button/Button';
import { deleteTask } from 'store/taskSlice/taskThunk';
import { OpenModalEvent, RequestDeleteTask } from 'types/types';

import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

type Props = {
  taskId: string;
  columnId: string;
  title: string;
};

const TaskDelete: React.FC<Props> = (props) => {
  const { taskId, columnId, title } = props;
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const tasksList = useAppSelector(selectTasksList);

  const handleClick = () => {
    const dataForDeleteTask: RequestDeleteTask = {
      taskId: taskId,
      boardId: tasksList.id,
      columnId: columnId,
    };
    dispatch(deleteTask(dataForDeleteTask));
  };

  const openModal = (event: OpenModalEvent) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button type="button" className={styles.delete} kind="delete" onClick={openModal}></Button>

      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <ConfirmationModal
          entity="task"
          value={title}
          onConfirm={handleClick}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};
export default TaskDelete;
