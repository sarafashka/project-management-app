import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { logging, logout, selectLoginStatus } from '../../store/authSlice';
import { User } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
    if (loginStatus === 'succeeded') {
      navigate('/');
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(logging(data as User)).then((response) => {
      setErrorMessage(response.payload as string);
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
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <Button className={styles.sign} type="submit">
          Sign In
        </Button>
      </div>
      {loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}
      {loginStatus === 'failed' && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
};

export default LoginForm;
