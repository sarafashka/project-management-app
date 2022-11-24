import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectTasksList } from 'store/selectors/selectors';
import styles from './TaskCard.module.scss';
import { deleteTask } from 'store/taskSlice/taskThunk';
import { OpenModalEvent, GetBoardByIdTaskData, RequestDeleteTask } from 'types/types';
import { selectUser } from 'store/selectors/selectors';
import { findTask } from 'utils/utils';
import Modal from 'components/Modal';
import TaskDelete from '../TaskDelete';
import EditingModal from 'components/Modal/EditingModal';
import { useTranslation } from 'react-i18next';

type Props = {
  taskId: string;
  columnId: string;
};

const TaskCard: React.FC<Props> = (props) => {
  const { taskId, columnId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'board' });

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

  const openModal = (event: OpenModalEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <li className={styles.item}>
        {/* onClick={openModal}> */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <TaskDelete taskId={taskId} columnId={columnId} title={title} />
        </div>
        <div className={styles.description}>{currentTask?.description}</div>
        {isOwner() && <div className={styles.owner}>{t('my-task')}</div>}
      </li>
      <Modal kind="editing" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="task"
          onConfirm={handleClick}
          onCancel={closeModal}
          operation={'edit'}
          isOpen={false}
          currentValue={{ title: 'task', description: 'smth' }}
        />
      </Modal>
    </>
  );
};
export default TaskCard;
