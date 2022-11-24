import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { registerUser } from '../../store/authSlice';
import { NewUser } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader';
import { selectLoginStatus, selectRegisterStatus } from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerStatus = useAppSelector(selectRegisterStatus);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

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
    dispatch(registerUser(data as NewUser)).then((response) => {
      if (response.meta.requestStatus === 'rejected') {
        setErrorMessage(response.payload as string);
      } else {
        navigate('/profile');
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label={t('form.enterYourName')} reactHookFormProps={nameInputParams} />
      {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
      <Input label={t('form.enterLogin')} reactHookFormProps={loginInputParams} />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input
        label={t('form.choosePassword')}
        type="password"
        reactHookFormProps={passwordInputParams}
      />
      {errors.password && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      <div className={styles.buttons}>
        <Button
          className={styles.back}
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          {t('button.back-to-main')}
        </Button>
        <Button className={styles.sign} type="submit">
          {t('button.signUp')}
        </Button>
      </div>
      {registerStatus === 'loading' && <Loader />}
      {registerStatus === 'failed' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}
    </form>
  );
};

export default RegisterForm;
