const resolve = require('path').resolve

const optionConfig = {
  https: true,
  redirection: true,
  redirectUrl: '404.html',
  onlyGET: true
}

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['~/../../lib/module'],
  'nuxt-apache-config': optionConfig,
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production'
}
