import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import auth_ru from './ru/auth.json';
import auth_en from './en/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          auth: auth_en,
        },
      },
      ru: {
        translation: {
          auth: auth_ru,
        },
      },
    },
  });

export default i18n;
