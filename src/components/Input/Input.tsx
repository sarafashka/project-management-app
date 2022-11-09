import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  reactHookFormProps?: {};
}

const Input: React.FC<InputProps> = ({ label, reactHookFormProps, ...rest }) => {
  return (
    <label>
      {label}
      <input {...rest} {...reactHookFormProps} />
    </label>
  );
};

export default Input;
