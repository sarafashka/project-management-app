import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

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
      required: 'Login is required',
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
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter your name:" reactHookFormProps={nameInputParams} />
      <Input label="Enter your login:" reactHookFormProps={loginInputParams} />
      <Input label="Choose password:" type="password" reactHookFormProps={passwordInputParams} />
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
