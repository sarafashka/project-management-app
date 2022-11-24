import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import auth_ru from './ru/auth.json';
import auth_en from './en/auth.json';
import footer_ru from './ru/footer.json';
import footer_en from './en/footer.json';
import profile_ru from './ru/profile.json';
import profile_en from './en/profile.json';
import error404_ru from './ru/error404.json';
import error404_en from './en/error404.json';

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
          profile: profile_en,
          error404: error404_en,
        },
      },
      ru: {
        translation: {
          auth: auth_ru,
          footer: footer_ru,
          profile: profile_ru,
          error404: error404_ru,
        },
      },
    },
  });

export default i18n;
