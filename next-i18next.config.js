const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de']
  },
  reloadOnPrerender: !isProd
};
