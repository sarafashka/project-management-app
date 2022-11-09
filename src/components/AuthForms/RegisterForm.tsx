import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form className={styles.form} /*onSubmit={handleSubmit(onSubmit)}*/>
      <Input label="Enter your name:" />
      <Input label="Enter your login:" />
      <Input label="Choose password:" type="password" />
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
