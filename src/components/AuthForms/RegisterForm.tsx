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
import { NewUser, User } from '../../types/types';
import { useNavigate } from 'react-router-dom';

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
        dispatch(logging(userData as User)).then(() => navigate('/'));
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter your name:" reactHookFormProps={nameInputParams} />
      {errors.name && <p className={styles.error}>{errors.name.message as string}</p>}
      <Input label="Enter your login:" reactHookFormProps={loginInputParams} />
      {errors.login && <p className={styles.error}>{errors.login.message as string}</p>}
      <Input label="Choose password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <p className={styles.error}>{errors.password.message as string}</p>}
      <div className={styles.buttons}>
        <Button className={styles.back} type="button">
          Back
        </Button>
        <Button className={styles.sign} type="submit">
          Sign Up
        </Button>
      </div>
      {registerStatus === 'loading' && <p>Loading</p>}
      {registerStatus === 'failed' && <p>{errorMessage}</p>}
      {loginStatus === 'loading' && <p>Loading</p>}
    </form>
  );
};

export default RegisterForm;
