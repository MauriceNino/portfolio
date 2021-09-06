const prodEnv = {
  isProd: true
};

const devEnv = {
  isProd: false
};

module.exports = {
  env: process.env.NODE_ENV === 'production' ? prodEnv : devEnv,
  i18n: {
    locales: ['en-US', 'de-DE'],
    defaultLocale: 'en-US'
  }
};
