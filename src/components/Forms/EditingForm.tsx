import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { OpenModalEvent, DataFromEditForm } from 'types/types';
import styles from './Forms.module.scss';

type EditingFormProps = {
  onConfirm: (data: DataFromEditForm) => void;
  onCancel: (event: OpenModalEvent) => void;
  isOpen: boolean;
  currentValue?: DataFromEditForm;
  operation: 'edit' | 'create';
};

const EditingForm: React.FC<EditingFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
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
  const descriptionTextareaParams = {
    ...register('description', {
      required: 'Description is required',
      maxLength: {
        value: 200,
        message: 'Description must contain a maximum of 200 characters',
      },
    }),
  };

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (currentValue?.description && currentValue.title) {
      setValue('title', currentValue.title);
      setValue('description', currentValue.description);
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
      <Textarea
        className={operation}
        label="Description"
        reactHookFormProps={descriptionTextareaParams}
      />
      {errors.description && <ErrorMessage>{errors.description.message as string}</ErrorMessage>}

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

export default EditingForm;
