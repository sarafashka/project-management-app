import React, { useEffect, useState } from 'react';
import styles from './Forms.module.scss';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { deleteUser, logout, resetLoadingStatus, updateUser } from '../../store/userSlice';
import { SignUpResponse } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import Modal from '../Modal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import modalStyles from '../Modal/ConfirmationModal/ConfirmationModal.module.scss';
import {
  selectUser,
  selectUserLoadingStatus,
  selectUserUpdatingStatus,
} from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation('translation');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const userUpdatingStatus = useAppSelector(selectUserUpdatingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const isLoading = userLoadingStatus === 'loading' || userUpdatingStatus === 'loading';

  useEffect(() => {
    return () => {
      dispatch(resetLoadingStatus());
    };
  }, []);

  const nameOptions = {
    required: t('errors.enter-your-name'),
    pattern: {
      value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
      message: t('errors.name-letters-numbers-only'),
    },
  };

  const loginOptions = {
    required: t('errors.login-required'),
    minLength: {
      value: 3,
      message: t('errors.login-3-char'),
    },
    pattern: {
      value: /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/,
      message: t('errors.login-letters-numbers-only'),
    },
  };

  const passwordOptions = {
    required: t('errors.password-required'),
    minLength: {
      value: 8,
      message: t('errors.password-8-char'),
    },
    pattern: {
      value: /^[A-Za-z0-9~\\!@#$%^&*()_+|}{:"?><=-]*$/,
      message: t('errors.password-letters-numbers-symbols-only'),
    },
  };

  const nameInputParams = {
    ...register('name', nameOptions),
  };
  const loginInputParams = {
    ...register('login', loginOptions),
  };
  const passwordInputParams = {
    ...register('password', passwordOptions),
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const args = {
      id: user.id,
      userData: data as SignUpResponse,
    };
    dispatch(updateUser(args)).then((response) => {
      if (response.type === 'user/updateUser/rejected') {
        setErrorMessage(response.payload as string);
      }
    });
  };

  const handleDeleteUserClick = async () => {
    await dispatch(deleteUser(user.id));
    navigate('/auth');
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('auth.form.enterYourName')}
        defaultValue={user.name}
        reactHookFormProps={nameInputParams}
      />
      {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
      <Input
        label={t('auth.form.enterLogin')}
        defaultValue={user.login}
        reactHookFormProps={loginInputParams}
      />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input
        label={t('auth.form.choosePassword')}
        type="password"
        reactHookFormProps={passwordInputParams}
      />
      {errors.password && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      <div className={styles.buttons}>
        <Button className={styles.sign} type="submit" disabled={isLoading}>
          {t('profile.button.update')}
        </Button>
        <Button
          className={styles.back}
          type="button"
          onClick={handleLogoutClick}
          disabled={isLoading}
        >
          {t('profile.button.logout')}
        </Button>
        <Button
          className={styles.delete}
          type="button"
          onClick={() => {
            setIsModalOpened(true);
          }}
          disabled={isLoading}
        >
          {t('profile.button.delete')}
        </Button>
      </div>
      {isLoading && <Loader />}
      {(userLoadingStatus === 'failed' || userUpdatingStatus === 'failed') && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      {userUpdatingStatus === 'succeeded' && (
        <ErrorMessage>{t('profile.message.updated')}</ErrorMessage>
      )}
      <Modal
        kind={'confirmation'}
        onClose={() => {
          setIsModalOpened(false);
        }}
        isOpen={isModalOpened}
      >
        <p className={modalStyles.content}>{t('profile.message.warning')}</p>
        <ConfirmationModal
          entity="user"
          onCancel={() => {
            setIsModalOpened(false);
          }}
          onConfirm={handleDeleteUserClick}
        />
      </Modal>
    </form>
  );
};

export default ProfileForm;
