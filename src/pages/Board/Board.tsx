import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import Column from 'components/Column';
import { createColumn } from 'store/taskSlice/columnThunk';
import { selectBoard } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import { OpenModalEvent, DataFromEditForm, RequestCreateColumn } from 'types/types';
import styles from './Board.module.scss';
import { getAllTasks } from 'store/taskSlice/taskThunk';
import Loader from 'components/Loader';
import { resetTasksList } from 'store/taskSlice/taskSlice';
import EditingModal from 'components/Modal/EditingModal';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';

const Board: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation('translation', { keyPrefix: 'board' });

  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const { isLoading, error, tasksList } = board;
  const { id, title, columns } = tasksList;

  const boardId = params.boardId as string;

  const goToBoards = () => {
    navigate('/boards/');
    dispatch(resetTasksList());
  };

  useEffect(() => {
    if (boardId) {
      dispatch(getAllTasks(boardId));
    }
  }, [boardId, dispatch]);

  const handleClick = (formData: DataFromEditForm) => {
    const dataForUpdateColumn: RequestCreateColumn = {
      boardId: id,
      body: {
        title: formData.title,
      },
    };
    dispatch(createColumn(dataForUpdateColumn));
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
    <div className={styles.container}>
      {isLoading && <Loader />}
      {error && (
        <div>
          {error.statusCode} {error.message}
        </div>
      )}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button className={styles.button} type="button" onClick={openModal} kind="boardBtn" />
      </div>
      <Button className={styles.allBoards} onClick={goToBoards}>
        &#8592; {t('all-boards')}
      </Button>
      <div>{columns.length === 0 && t('add-column')}</div>

      <div className={styles.list}>
        {columns.map((item) => (
          <Column key={item.id} id={item.id} />
        ))}
      </div>

      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="column"
          operation="create"
          value={title}
          onConfirm={handleClick}
          onCancel={closeModal}
          isOpen={isOpen}
        />
      </Modal>
    </div>
  );
};

export default Board;
