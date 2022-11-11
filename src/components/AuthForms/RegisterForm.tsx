import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { registration } from '../../store/authSlice';
import { NewUser } from '../../types/types';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const dispatch = useAppDispatch();

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
    dispatch(registration(data as NewUser));
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

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
    </form>
  );
};

export default RegisterForm;
