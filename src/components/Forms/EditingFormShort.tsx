import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Input from 'components/Input/Input';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CloseModalEvent, DataFromEditForm } from 'types/types';
import styles from './Forms.module.scss';

type EditingFormProps = {
  onConfirm: (data: DataFromEditForm) => void;
  onCancel: (event: CloseModalEvent) => void;
  isOpen: boolean;
  currentValue?: DataFromEditForm;
  operation: 'edit' | 'create';
};

const EditingFormShort: React.FC<EditingFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const { onCancel, onConfirm, isOpen, currentValue, operation } = props;

  const titleInputParams = {
    ...register('title', {
      required: 'Title is required',
      minLength: {
        value: 2,
        message: 'Title must be at least 2 characters',
      },
      maxLength: {
        value: 40,
        message: 'Title must contain a maximum of 40 characters',
      },
    }),
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (currentValue?.title) {
      setValue('title', currentValue.title);
    }
  }, [currentValue, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dataFromEditForm = data as DataFromEditForm;
    onConfirm(dataFromEditForm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input className={operation} label="Title" reactHookFormProps={titleInputParams} />
      {errors.title && <ErrorMessage>{errors.title.message as string}</ErrorMessage>}
      <div className={styles.container}>
        <Button type="button" className={styles.btn} kind="cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className={styles.btn} kind="confirm">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default EditingFormShort;
