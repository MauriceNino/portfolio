const { i18n } = require('./next-i18next.config');
const isProd = process.env.NODE_ENV === 'production';

const prodEnv = {
  isProd: true,
  gtmId: 'GTM-PJ9RHMK',
  hotjarSiteId: '2606583'
};

const devEnv = {
  isProd: false
};

module.exports = {
  i18n: i18n,
  env: isProd ? prodEnv : devEnv
};
