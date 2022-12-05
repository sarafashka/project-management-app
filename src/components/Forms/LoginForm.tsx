import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { login } from '../../store/authSlice';
import AppRoutes from 'constants/routes';
import { UserLogin } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader';
import { selectLoginStatus, selectUserLoadingStatus } from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '../../utils/utils';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(selectLoginStatus);
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [lang, setLang] = useState<string>(i18n.language);

  i18n.on('languageChanged', () => {
    setLang(i18n.language);
  });

  const loginInputParams = {
    ...register('login', {
      required: 'Login is required',
    }),
  };

  const passwordInputParams = {
    ...register('password', {
      required: 'Password is required',
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
        navigate(AppRoutes.BOARDS);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label={t('form.enterLogin')} reactHookFormProps={loginInputParams} />
      {errors.login && (
        <ErrorMessage>{getErrorMessage(errors.login.message as string, lang)}</ErrorMessage>
      )}
      <Input
        label={t('form.enterPassword')}
        type="password"
        reactHookFormProps={passwordInputParams}
      />
      {errors.password && (
        <ErrorMessage>{getErrorMessage(errors.password.message as string, lang)}</ErrorMessage>
      )}
      <div className={styles.buttons}>
        <Button
          className={styles.authBtn}
          kind="cancel"
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          {t('button.back-to-main')}
        </Button>
        <Button className={styles.authBtn} kind="confirm" type="submit">
          {t('button.signIn')}
        </Button>
      </div>
      <Loader isOpen={loginStatus === 'loading' || userLoadingStatus === 'loading'} />
      {(loginStatus === 'failed' || userLoadingStatus === 'failed') && (
        <ErrorMessage>{getErrorMessage(errorMessage, lang)}</ErrorMessage>
      )}
    </form>
  );
};

export default LoginForm;
