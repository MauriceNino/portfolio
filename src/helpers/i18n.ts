import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { DE_DE } from '../assets/i18n/de-DE';
import { EN_US } from '../assets/i18n/en-US';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    supportedLngs: ['en-US', 'de-DE'],
    resources: {
      'en-US': { translation: EN_US },
      'de-DE': { translation: DE_DE }
    }
  });

export default i18n;
