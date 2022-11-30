import React, { useState } from 'react';
import { useAppDispatch } from 'hooks/reduxTypedHooks';
import { createColumn } from 'store/taskSlice/columnThunk';
import Button from 'components/Button/Button';
import { OpenModalEvent, DataFromEditForm, RequestCreateColumn } from 'types/types';
import styles from './BoardCreateColumn.module.scss';
import EditingModal from 'components/Modal/EditingModal';
import Modal from 'components/Modal';

type Props = {
  boardId: string;
};

const BoardCreateColumn: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { boardId } = props;

  const dispatch = useAppDispatch();

  const handleClick = (formData: DataFromEditForm) => {
    const dataForUpdateColumn: RequestCreateColumn = {
      boardId: boardId,
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
    <>
      <Button className={styles.button} type="button" onClick={openModal} />
      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="column"
          operation="create"
          onConfirm={handleClick}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default BoardCreateColumn;
