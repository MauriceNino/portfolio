const { i18n } = require('./next-i18next.config');
const isProd = process.env.NODE_ENV === 'production';

const prodEnv = {
  isProd: true,
  gtmId: 'GTM-PJ9RHMK'
};

const devEnv = {
  isProd: false,
  gtmId: 'GTM-PJ9RHMK'
};

module.exports = {
  i18n: i18n,
  env: isProd ? prodEnv : devEnv
};
