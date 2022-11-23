import i18n from '../../translations/i18n';

export const nameOptions = {
  required: i18n.t('auth.errors.enter-your-name'),
  pattern: {
    value: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    message: i18n.t('auth.errors.name-letters-numbers-only'),
  },
};

export const loginOptions = {
  required: i18n.t('auth.errors.login-required'),
  minLength: {
    value: 3,
    message: i18n.t('auth.errors.login-3-char'),
  },
  pattern: {
    value: /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: i18n.t('auth.errors.login-letters-numbers-only'),
  },
};

export const passwordOptions = {
  required: i18n.t('auth.errors.password-required'),
  minLength: {
    value: 8,
    message: i18n.t('auth.errors.password-8-char'),
  },
  pattern: {
    value: /^[A-Za-z0-9~\\!@#$%^&*()_+|}{:"?><=-]*$/,
    message: i18n.t('auth.errors.password-letters-numbers-symbols-only'),
  },
};
