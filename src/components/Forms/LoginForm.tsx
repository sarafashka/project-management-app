import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { login } from '../../store/authSlice';
import { UserLogin } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader';
import { selectLoginStatus, selectUserLoadingStatus } from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(selectLoginStatus);
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

  const loginInputErrorText = t('errors.login-required');
  const loginInputParams = {
    ...register('login', {
      required: loginInputErrorText,
    }),
  };

  const passwordInputErrorText = t('errors.password-required');
  const passwordInputParams = {
    ...register('password', {
      required: passwordInputErrorText,
    }),
  };

  useEffect(() => {
    if (loginStatus === 'failed') {
      reset();
    }
  }, [isSubmitSuccessful, loginStatus, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(login(data as UserLogin)).then((response) => {
      if (response.meta.requestStatus === 'rejected') {
        setErrorMessage(response.payload as string);
      } else {
        navigate('/boards');
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label={t('form.enterLogin')} reactHookFormProps={loginInputParams} />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input
        label={t('form.enterPassword')}
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
          {t('button.signIn')}
        </Button>
      </div>
      {(loginStatus === 'loading' || userLoadingStatus === 'loading') && <Loader />}
      {(loginStatus === 'failed' || userLoadingStatus === 'failed') && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </form>
  );
};

export default LoginForm;
