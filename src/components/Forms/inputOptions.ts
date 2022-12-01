export const nameOptions = {
  required: 'Please enter your name',
  maxLength: {
    value: 25,
    message: 'Max name length is 25 characters',
  },
  pattern: {
    value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    message: 'The name can only contain letters (eng) and numbers',
  },
};

export const loginOptions = {
  required: 'Login is required',
  minLength: {
    value: 3,
    message: 'Login must be at least 3 characters',
  },
  pattern: {
    value: /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: 'Login can only contain letters (eng) and numbers',
  },
};

export const passwordOptions = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  pattern: {
    value: /^[A-Za-z0-9~\\!@#$%^&*()_+|}{:"?><=-]*$/,
    message: 'Password can only contain letters (eng), numbers and symbols',
  },
};
