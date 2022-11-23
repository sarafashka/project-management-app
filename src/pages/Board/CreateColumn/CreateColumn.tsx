import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxTypedHooks';
import { createColumn } from 'store/taskSlice/columnThunk';
import { selectBoard } from 'store/selectors/selectors';
import Button from 'components/Button/Button';
import { CloseModalEvent, DataFromEditForm, RequestCreateColumn } from 'types/types';
import styles from './Board.module.scss';
import EditingModal from 'components/Modal/EditingModal';
import Modal from 'components/Modal';
import { Id } from '@reduxjs/toolkit/dist/tsHelpers';

type Props = {
  boardId: string;
};

const CreateColumn: React.FC<Props> = (props) => {
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

  const openModal = (event: CloseModalEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button className={styles.button} type="button" onClick={openModal} kind="boardBtn" />
      <Modal kind="confirmation" onClose={closeModal} isOpen={isOpen}>
        <EditingModal
          entity="column"
          operation="create"
          onConfirm={handleClick}
          onCancel={closeModal}
          isOpen={isOpen}
        />
      </Modal>
    </>
  );
};

export default CreateColumn;
