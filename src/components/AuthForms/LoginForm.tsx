import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { logging, selectLoginStatus } from '../../store/authSlice';
import { SignInResponse, User, UserLogin } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getUserById, logout, selectUserLoadingStatus, setUser } from '../../store/userSlice';
import { authService } from '../../api/authService';

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(logging(data as UserLogin)).then((response) => {
      if (response.type === 'auth/logging/rejected') {
        setErrorMessage(response.payload as string);
      } else {
        const id = authService.getUserId((response.payload as SignInResponse).token);
        dispatch(getUserById(id)).then((res) => {
          dispatch(setUser(res.payload as User));
          navigate('/');
        });
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
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <Button className={styles.sign} type="submit">
          Sign In
        </Button>
      </div>
      {(loginStatus === 'loading' || userLoadingStatus === 'loading') && (
        <p className={styles.loading}>Loading...</p>
      )}
      {(loginStatus === 'failed' || userLoadingStatus === 'failed') && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </form>
  );
};

export default LoginForm;
