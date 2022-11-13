import React, { useState } from 'react';
import styles from './Forms.module.scss';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { loginOptions, nameOptions, passwordOptions } from './formInputOptions';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectUser, selectUserLoadingStatus, updateUser } from '../../store/userSlice';
import { SignUpResponse } from '../../types/types';

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserLoadingStatus);
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
    const args = {
      id: user.id,
      userData: data as SignUpResponse,
    };
    console.log(userLoadingStatus);
    dispatch(updateUser(args)).then((response) => {
      console.log(response, userLoadingStatus);
      if (response.type === 'user/updateUser/rejected') {
        setErrorMessage(response.payload as string);
      }
      console.log(data);
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Enter your name:"
        defaultValue={user.name}
        reactHookFormProps={nameInputParams}
      />
      {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
      <Input
        label="Enter your login:"
        defaultValue={user.login}
        reactHookFormProps={loginInputParams}
      />
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
      {userLoadingStatus === 'loading' && <p className={styles.loading}>Please wait...</p>}
      {userLoadingStatus === 'failed' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {userLoadingStatus === 'succeeded' && <ErrorMessage>User data updated</ErrorMessage>}
      {/*{loginStatus === 'loading' && <p className={styles.loading}>Loading...</p>}*/}
    </form>
  );
};

export default ProfileForm;
