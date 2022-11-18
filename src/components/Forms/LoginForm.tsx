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

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginStatus = useAppSelector(selectLoginStatus);
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

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
        navigate('/profile');
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter login:" reactHookFormProps={loginInputParams} />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input label="Enter password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      <div className={styles.buttons}>
        <Button
          className={styles.back}
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Main
        </Button>
        <Button className={styles.sign} type="submit">
          Sign In
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
