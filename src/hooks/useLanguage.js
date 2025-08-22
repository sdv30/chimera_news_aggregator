import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'sah', name: 'Саха тыла', flag: '🏴' }
  ];

  const changeLanguage = (languageCode) => {
    i18n?.changeLanguage(languageCode);
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === i18n?.language) || languages?.[0];
  };

  // Set document language attribute
  useEffect(() => {
    document.documentElement.lang = i18n?.language;
  }, [i18n?.language]);

  return {
    t,
    currentLanguage: i18n?.language,
    languages,
    changeLanguage,
    getCurrentLanguage
  };
};

export default useLanguage;