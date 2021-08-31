const prodEnv = {
  isProd: true
};

const devEnv = {
  isProd: false
};

module.exports = {
  env: process.env.NODE_ENV === 'production' ? prodEnv : devEnv
};
