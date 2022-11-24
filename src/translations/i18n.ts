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
import welcome_ru from './ru/welcome.json';
import welcome_en from './en/welcome.json';
import button_ru from './ru/button.json';
import button_en from './en/button.json';

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
          welcome: welcome_en,
          button: button_en,
        },
      },
      ru: {
        translation: {
          auth: auth_ru,
          footer: footer_ru,
          profile: profile_ru,
          error404: error404_ru,
          welcome: welcome_ru,
          button: button_ru,
        },
      },
    },
  });

export default i18n;
