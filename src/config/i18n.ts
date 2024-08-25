import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../../public/locales/en/translation.json';
import translationRU from '../../public/locales/ru/translation.json';

const getLanguage = () => {
  try {
    const userLanguage =
      window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;

    if (userLanguage) {
      return userLanguage === 'ru' ? 'ru' : 'en';
    }
    return 'en';
  } catch {
    return 'en';
  }
};

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { default } from 'i18next';
