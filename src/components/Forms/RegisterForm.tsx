import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { registerUser, selectLoginStatus, selectRegisterStatus } from '../../store/authSlice';
import { NewUser } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { loginOptions, nameOptions, passwordOptions } from './formInputOptions';

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
        navigate('/profile');
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
        <Button className={styles.back} type="button" kind="close">
          Back
        </Button>
        <Button className={styles.sign} type="submit" kind="close">
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
