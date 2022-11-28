import React from 'react';
import styles from './Column.module.scss';
import Button from 'components/Button/Button';
import { updateColumn } from 'store/taskSlice/columnThunk';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { GetBoardByIdColumnData } from 'types/types';
import ColumnTitle from './ColumnTitle/ColumnTitle';
import Task from 'components/Task';
import { createTask } from 'store/taskSlice/taskThunk';
import { selectUser } from 'store/selectors/selectors';
import { selectTasksList } from 'store/selectors/selectors';
import { findColumn } from 'utils/utils';
import ColumnDelete from './ColumnDelete';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
};

const Column: React.FC<Props> = (column) => {
  const { id } = column;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const board = useAppSelector(selectTasksList);
  const currentColumn = findColumn(board, id) as GetBoardByIdColumnData;
  const { title, tasks } = currentColumn;
  const { t } = useTranslation('translation', { keyPrefix: 'board' });

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

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <p className={styles.count}>({tasks.length})</p>
        <ColumnTitle title={title} submit={handleSubmit} />
        <ColumnDelete columnId={id} boardId={board.id} title={title} />
      </div>
      {<Task columnId={id} />}
      <Button className={styles.newTask} onClick={() => dispatch(createTask(dataForCreateTask))}>
        + {t('add-task')}
      </Button>
    </div>
  );
};

export default Column;
