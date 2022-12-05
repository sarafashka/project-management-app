import styles from './Board.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { selectBoard } from 'store/selectors/selectors';
import { resetSearch } from 'store/boardsSlice/boardsSlice';
import Button from 'components/Button/Button';
import { getAllTasks, updateOrderTask } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';
import { resetTasksList } from 'store/taskSlice/taskSlice';
import CreateColumn from './BoardCreateColumn';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import {
  GetBoardByIdColumnData,
  GetBoardByIdTaskData,
  RequestUpdateColumn,
  RequestUpdateTask,
} from 'types/types';
import { findColumn, findTask, getErrorMessage } from 'utils/utils';
import { updateOrderColumn } from 'store/taskSlice/columnThunk';
import { useTranslation } from 'react-i18next';
import MemoizedColumn from 'components/Column';

const Board: React.FC = () => {
  const [columnsList, setColumnList] = useState<GetBoardByIdColumnData[]>([]);

  const navigate = useNavigate();
  const params = useParams();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'board' });
  const [lang, setLang] = useState<string>(i18n.language);
  const errorText = 'Sorry. This board does not exist.';

  i18n.on('languageChanged', () => {
    setLang(i18n.language);
  });

  const dispatch = useAppDispatch();

  const boardId = params.boardId as string;

  const goToBoards = () => {
    navigate('/boards/');
    dispatch(resetTasksList());
    dispatch(resetSearch());
  };

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks(boardId));
    }
  }, [boardId, dispatch]);

  const board = useAppSelector(selectBoard);
  const { isLoading, error, tasksList } = board;
  const { id, title, columns } = tasksList;

  useEffect(() => {
    const columnsSorting = [...columns].sort((a, b) => a.order - b.order);
    const columnsAndTaskSorting = columnsSorting.map((column) => {
      const tasksSorting = [...column.tasks];
      return {
        ...column,
        tasks: tasksSorting.sort((a, b) => a.order - b.order),
      };
    });
    setColumnList(columnsAndTaskSorting);
  }, [columns]);

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const items = [...columnsList];
      const [reorderedItem] = items.splice(source.index, 1);
      if (destination) {
        items.splice(destination.index, 0, reorderedItem);
        setColumnList(items);
      }

      const currentColumn = findColumn(tasksList, draggableId) as GetBoardByIdColumnData;
      const { order, title } = currentColumn;
      const distance = source.index - destination.index;

      const dataForUpdateColumn: RequestUpdateColumn = {
        boardId: id,
        columnId: draggableId,
        body: {
          title: title,
          order: order - distance,
        },
      };
      await dispatch(updateOrderColumn(dataForUpdateColumn));
    }

    if (type === 'task') {
      const items: GetBoardByIdColumnData[] = JSON.parse(JSON.stringify(columnsList));
      const columnIndexSource = items.findIndex((column) => column.id === source.droppableId);
      const [reorderedItem] = items[columnIndexSource].tasks.splice(source.index, 1);
      const columnIndexDestination = items.findIndex(
        (column) => column.id === destination.droppableId
      );
      items[columnIndexDestination].tasks.splice(destination.index, 0, reorderedItem);
      setColumnList(items);

      const currentTask = findTask(
        tasksList,
        source.droppableId,
        draggableId
      ) as GetBoardByIdTaskData;

      const { title, order, description, userId } = currentTask;
      const distance = source.index - destination.index;

      const dataForUpdateTask: RequestUpdateTask = {
        boardId: id,
        columnId: source.droppableId,
        taskId: draggableId,
        body: {
          title: title,
          order: order - distance,
          description: description,
          userId: userId,
          boardId: id,
          columnId: destination.droppableId,
        },
      };
      await dispatch(updateOrderTask(dataForUpdateTask));
    }
  };

  return (
    <div className={styles.container}>
      <Loader isOpen={isLoading} />
      {error && (
        <div className={styles.error}>
          {error.statusCode === 400
            ? getErrorMessage(errorText, lang)
            : `${error.statusCode} ${error.message}`}
        </div>
      )}

      {id && (
        <>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <CreateColumn boardId={id} />
          </div>
        </>
      )}
      <Button className={styles.allBoards} onClick={goToBoards}>
        &#8592; {t('all-boards')}
      </Button>
      <div>{columnsList.length === 0 && id && t('add-column')}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {columnsList.map((item, index) => (
                <MemoizedColumn key={item.id} id={item.id} index={index} column={item} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
