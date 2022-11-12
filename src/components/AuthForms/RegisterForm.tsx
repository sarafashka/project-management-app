import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import {
  logging,
  registration,
  selectLoginStatus,
  selectRegisterStatus,
} from '../../store/authSlice';
import { NewUser, SignInResponse, User, UserLogin } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { authService } from '../../api/authService';
import { getUserById, setUser } from '../../store/userSlice';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerStatus = useAppSelector(selectRegisterStatus);
  const loginStatus = useAppSelector(selectLoginStatus);
  const [errorMessage, setErrorMessage] = useState<string>();

  const nameInputParams = {
    ...register('name', {
      required: 'Please enter your name',
      pattern: {
        value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
        message: 'The name can only contain letters (eng) and numbers',
      },
    }),
  };
  const loginInputParams = {
    ...register('login', {
      required: 'Login is required',
      minLength: {
        value: 3,
        message: 'Login must be at least 3 characters',
      },
      pattern: {
        value: /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/,
        message: 'Login can only contain letters (eng) and numbers',
      },
    }),
  };
  const passwordInputParams = {
    ...register('password', {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
      pattern: {
        value: /^[A-Za-z0-9~\\!@#$%^&*()_+|}{:"?><=-]*$/,
        message: 'Login can only contain letters (eng) and numbers',
      },
    }),
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(registration(data as NewUser)).then((response) => {
      if (response.type === 'auth/registration/rejected') {
        setErrorMessage(response.payload as string);
      } else {
        const userData = { ...data };
        delete userData.name;
        dispatch(logging(userData as UserLogin)).then((res) => {
          const id = authService.getUserId((res.payload as SignInResponse).token);
          dispatch(getUserById(id)).then((res) => {
            dispatch(setUser(res.payload as User));
            navigate('/');
          });
        });
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter your name:" reactHookFormProps={nameInputParams} />
      {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
      <Input label="Enter your login:" reactHookFormProps={loginInputParams} />
      {errors.login && <ErrorMessage>{errors.login.message as string}</ErrorMessage>}
      <Input label="Choose password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <ErrorMessage>{errors.password.message as string}</ErrorMessage>}
      <div className={styles.buttons}>
        <Button className={styles.back} type="button">
          Back
        </Button>
        <Button className={styles.sign} type="submit">
          Sign Up
        </Button>
      </div>
      {registerStatus === 'loading' && <p className={styles.loading}>Loading...</p>}
      {registerStatus === 'failed' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}
    </form>
  );
};

export default RegisterForm;
