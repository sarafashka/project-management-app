import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import auth_ru from './ru/auth.json';
import auth_en from './en/auth.json';
import footer_ru from './ru/footer.json';
import footer_en from './en/footer.json';

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
          footer: footer_en,
        },
      },
      ru: {
        translation: {
          auth: auth_ru,
          footer: footer_ru,
        },
      },
    },
  });

export default i18n;
