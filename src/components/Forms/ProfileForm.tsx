import React from 'react';
import styles from './Forms.module.scss';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { loginOptions, nameOptions, passwordOptions } from './formInputOptions';

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    console.log(data);
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
        <Button className={styles.sign} type="submit">
          Update profile
        </Button>
        <Button className={styles.back} type="button">
          Back
        </Button>
      </div>
      {/*{registerStatus === 'loading' && <p className={styles.loading}>Loading...</p>}*/}
      {/*{registerStatus === 'failed' && <ErrorMessage>{errorMessage}</ErrorMessage>}*/}
      {/*{loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}*/}
    </form>
  );
};

export default ProfileForm;
