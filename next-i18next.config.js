const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeDetection: false
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'de'],
  nonExplicitSupportedLngs: true,
  load: 'all',
  reloadOnPrerender: !isProd
};
