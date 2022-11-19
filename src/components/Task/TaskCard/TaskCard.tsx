import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTasksList } from 'store/selectors/selectors';
import styles from './TaskCard.module.scss';
import Button from 'components/Button/Button';
import { deleteTask } from 'store/taskSlice/taskThunk';
import { CloseModalEvent, GetBoardByIdTaskData, RequestDeleteTask } from 'types/types';
import { selectUser } from 'store/selectors/selectors';
import { findTask } from 'utils/utils';
import Modal from 'components/Modal';
import ConfirmationModal from 'components/Modal/ConfirmationModal';

type Props = {
  taskId: string;
  columnId: string;
};

const TaskCard: React.FC<Props> = (props) => {
  const { taskId, columnId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const tasksList = useAppSelector(selectTasksList);

  const currentTask = findTask(tasksList, columnId, taskId) as GetBoardByIdTaskData;
  const { userId, title } = currentTask;

  const isOwner = () => userId === user.id;

  const handleClick = () => {
    const dataForDeleteTask: RequestDeleteTask = {
      taskId: taskId,
      boardId: tasksList.id,
      columnId: columnId,
    };
    dispatch(deleteTask(dataForDeleteTask));
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
      <li className={styles.item}>
        <div className={styles.header}>
          <h2 className={styles.title}>{currentTask?.title}</h2>
          <Button
            type="button"
            className={styles.delete}
            kind="delete"
            onClick={openModal}
          ></Button>
        </div>
        <div className={styles.description}>{currentTask?.description}</div>
        {isOwner() && <div className={styles.owner}>My task</div>}
      </li>
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
export default TaskCard;
