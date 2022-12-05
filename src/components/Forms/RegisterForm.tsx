import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import AppRoutes from 'constants/routes';
import { registerUser } from '../../store/authSlice';
import { NewUser } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader';
import { selectLoginStatus, selectRegisterStatus } from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '../../utils/utils';
import { loginOptions, nameOptions, passwordOptions } from './inputOptions';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerStatus = useAppSelector(selectRegisterStatus);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [lang, setLang] = useState<string>(i18n.language);

  i18n.on('languageChanged', () => {
    setLang(i18n.language);
  });

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
        navigate(AppRoutes.BOARDS);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label={t('form.enterYourName')} reactHookFormProps={nameInputParams} />
      {errors.name && (
        <ErrorMessage>{getErrorMessage(errors.name.message as string, lang)}</ErrorMessage>
      )}
      <Input label={t('form.enterLogin')} reactHookFormProps={loginInputParams} />
      {errors.login && (
        <ErrorMessage>{getErrorMessage(errors.login.message as string, lang)}</ErrorMessage>
      )}
      <Input
        label={t('form.choosePassword')}
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
          {t('button.signUp')}
        </Button>
      </div>
      <Loader isOpen={registerStatus === 'loading'} />
      {registerStatus === 'failed' && (
        <ErrorMessage>{getErrorMessage(errorMessage, lang)}</ErrorMessage>
      )}
      {loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}
    </form>
  );
};

export default RegisterForm;
