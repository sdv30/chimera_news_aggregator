import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import sahTranslations from './locales/sah.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ru: {
    translation: ruTranslations
  },
  sah: {
    translation: sahTranslations
  }
};

i18n?.use(initReactI18next)?.init({
    resources,
    lng: localStorage.getItem('chimera_language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Listen for language changes and update localStorage
i18n?.on('languageChanged', (lng) => {
  localStorage.setItem('chimera_language', lng);
  document.documentElement.lang = lng;
});

export default i18n;