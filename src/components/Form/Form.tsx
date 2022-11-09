import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
  className?: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ className = '', children }) => {
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
    <form className={`form ${className}`} /*onSubmit={handleSubmit(onSubmit)}*/>
      {children}
      <label>
        Character name:
        <input
          type="text"
          {...register('name', {
            required: 'Enter character name',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            pattern: {
              value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
              message: 'The name can only contain letters (eng) and numbers',
            },
          })}
        />
      </label>
      {errors.name && <p className="error">{errors.name.message as string}</p>}

      <label>
        Character name:
        <input
          type="email"
          {...register('name', {
            required: 'Enter character name',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            pattern: {
              value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
              message: 'The name can only contain letters (eng) and numbers',
            },
          })}
        />
      </label>

      <input className="button" type="submit" value="Create" />
    </form>
  );
};

export default Form;
