// import { createMiddleware } from './module.middleware'
// import plugin from './module.plugin'
import path from 'path'

import fs from 'fs-extra'

const optionName = 'nuxt-apache-config'

module.exports = async function(moduleOptions) {
  const consola = require('consola')
  const options = Object.assign(
    {},
    this.options[optionName],
    moduleOptions || {}
  )
  const { enabled } = options
  if (enabled === false) {
    consola.info('Skip activation of nuxt-apache-config module')
    return false
  }
  consola.info('Add nuxt-apache-config module to server middleware')

  const xmlGeneratePath = path.resolve(
    this.options.srcDir,
    path.join('static', '/.htaccess')
  )

  fs.removeSync(xmlGeneratePath)

  const htaccess = createHtaccess(options)

  await fs.writeFile(xmlGeneratePath, htaccess)

  console.log(this.options.srcDir)

  return true
}

module.exports.meta = require('../package.json')

function createHtaccess(options) {
  var htaccessConfig = ''

  if (options.https) {
    htaccessConfig +=
      'RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R,L]\n\n'
  }

  if (typeof options.redirection == 'undefined' || options.redirection) {
    htaccessConfig +=
      'ErrorDocument 400 401 402 403 404 405 406 407 408 409 410 411 412 413 414 415 500 501 502 503 504 505 http://%{HTTP_HOST}/'
    if (options.redirectUrl) {
      htaccessConfig += options.redirectUrl
    }
    htaccessConfig += '\n\n'
  }

  if (options.onlyGET) {
    htaccessConfig +=
      '<LimitExcept GET>\nRequire valid-user\n</LimitExcept>\n\n'
  }

  return htaccessConfig
}
