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
import { loginOptions, nameOptions, passwordOptions } from './inputOptions';
import { getErrorMessage } from '../../utils/utils';
import { resetSearch } from 'store/boardsSlice/boardsSlice';

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t, i18n } = useTranslation('translation');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const userUpdatingStatus = useAppSelector(selectUserUpdatingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(i18n.language);

  i18n.on('languageChanged', () => {
    setLang(i18n.language);
  });

  const isLoading = userLoadingStatus === 'loading' || userUpdatingStatus === 'loading';

  useEffect(() => {
    return () => {
      dispatch(resetLoadingStatus());
    };
  }, [dispatch]);

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
    dispatch(resetSearch());
    navigate('/auth');
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(resetSearch());
    navigate('/auth');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('auth.form.enterYourName')}
        defaultValue={user.name}
        reactHookFormProps={nameInputParams}
        className="edit"
      />
      {errors.name && (
        <ErrorMessage>{getErrorMessage(errors.name.message as string, lang)}</ErrorMessage>
      )}
      <Input
        label={t('auth.form.enterLogin')}
        defaultValue={user.login}
        reactHookFormProps={loginInputParams}
        className="edit"
      />
      {errors.login && (
        <ErrorMessage>{getErrorMessage(errors.login.message as string, lang)}</ErrorMessage>
      )}
      <Input
        label={t('profile.newPassword')}
        type="password"
        reactHookFormProps={passwordInputParams}
      />
      {errors.password && (
        <ErrorMessage>{getErrorMessage(errors.password.message as string, lang)}</ErrorMessage>
      )}
      <div className={styles.formButtons}>
        <Button className={styles.formBtn} kind="confirm" type="submit" disabled={isLoading}>
          {t('profile.button.update')}
        </Button>
        <Button
          className={styles.formBtn}
          kind="confirm"
          type="button"
          onClick={() => {
            setIsModalOpened(true);
          }}
          disabled={isLoading}
        >
          {t('profile.button.delete')}
        </Button>
        <Button
          className={styles.formBtn}
          kind="confirm"
          type="button"
          onClick={() => {
            navigate('/boards');
            dispatch(resetSearch());
          }}
          disabled={isLoading}
        >
          {t('profile.button.to-boards')}
        </Button>
        <Button
          className={styles.formBtn}
          kind="cancel"
          type="button"
          onClick={handleLogoutClick}
          disabled={isLoading}
        >
          {t('profile.button.sign-out')}
        </Button>
      </div>
      <Loader isOpen={isLoading} />
      {(userLoadingStatus === 'failed' || userUpdatingStatus === 'failed') && (
        <ErrorMessage>{getErrorMessage(errorMessage, lang)}</ErrorMessage>
      )}
      {userUpdatingStatus === 'succeeded' && (
        <ErrorMessage className={styles.green}>{t('profile.message.updated')}</ErrorMessage>
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
