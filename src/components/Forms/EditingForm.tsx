import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Input from 'components/Input/Input';
import Textarea from 'components/Textarea/Textarea';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { OpenModalEvent, DataFromEditForm } from 'types/types';
import styles from './Forms.module.scss';
import { useTranslation } from 'react-i18next';

type EditingFormProps = {
  onConfirm: (data: DataFromEditForm) => void;
  onCancel: (event: OpenModalEvent) => void;
  currentValue?: DataFromEditForm;
  operation: 'edit' | 'create';
};

const EditingForm: React.FC<EditingFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { onCancel, onConfirm, currentValue, operation } = props;
  const { t } = useTranslation('translation');

  const titleInputParams = {
    ...register('title', {
      required: t('editingForm.title-required') as string,
      minLength: {
        value: 2,
        message: t('editingForm.title-2-chars') as string,
      },
      maxLength: {
        value: 40,
        message: t('editingForm.title-40-chars') as string,
      },
    }),
  };
  const descriptionTextareaParams = {
    ...register('description', {
      required: t('editingForm.description-required') as string,
      maxLength: {
        value: 200,
        message: t('editingForm.description-200-chars') as string,
      },
    }),
  };

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
      <Input
        className={operation}
        label={t('editingForm.title')}
        reactHookFormProps={titleInputParams}
      />
      {errors.title && <ErrorMessage>{errors.title.message as string}</ErrorMessage>}
      <Textarea
        className={operation}
        label={t('editingForm.description')}
        reactHookFormProps={descriptionTextareaParams}
      />
      {errors.description && <ErrorMessage>{errors.description.message as string}</ErrorMessage>}

      <div className={styles.container}>
        <Button type="button" className={styles.btn} kind="cancel" onClick={onCancel}>
          {t('button.cancel')}
        </Button>
        <Button type="submit" className={styles.btn} kind="confirm">
          {t('button.confirm')}
        </Button>
      </div>
    </form>
  );
};

export default EditingForm;
