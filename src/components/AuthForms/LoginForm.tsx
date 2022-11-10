import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

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
  //
  // useEffect(() => {
  //   reset();
  // }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, errors);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter login:" reactHookFormProps={loginInputParams} />
      {errors.login && <p className={styles.error}>{errors.login.message as string}</p>}
      <Input label="Enter password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <p className={styles.error}>{errors.password.message as string}</p>}
      <div className={styles.buttons}>
        <Button className={styles.back} type="button">
          Back to main
        </Button>
        <Button className={styles.sign} type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
