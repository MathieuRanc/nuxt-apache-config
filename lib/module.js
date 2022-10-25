// import { createMiddleware } from './module.middleware'
// import plugin from './module.plugin'
import path from 'path'

import fs from 'fs-extra'

const optionName = 'nuxt-apache-config'

module.exports = async function (moduleOptions) {
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
  // consola.info('Add nuxt-apache-config module to server middleware')

  const xmlGeneratePath = path.resolve(
    this.options.srcDir,
    path.join('static', '/.htaccess')
  )

  fs.removeSync(xmlGeneratePath)

  const htaccess = createHtaccess(options)

  await fs.writeFile(xmlGeneratePath, htaccess)

  return true
}

module.exports.meta = require('../package.json')

function createHtaccess(options) {
  var htaccessConfig = ''

  if (options.https) {
    htaccessConfig +=
      'RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R,L]\n\n'
  }

  if (typeof options.redirect == 'undefined' || options.redirect) {
    htaccessConfig += 'ErrorDocument 404 https://%{HTTP_HOST}/'
    if (options.redirectUrl) {
      htaccessConfig += options.redirectUrl
    }
    htaccessConfig += '\n\n'
  }

  if (options.indexes) {
    htaccessConfig += 'Options -Indexes\n\n'
  }

  if (options.onlyGET) {
    htaccessConfig +=
      '<LimitExcept GET>\nRequire valid-user\n</LimitExcept>\n\n'
  }

  if (options.port) {
    htaccessConfig += `Options +FollowSymLinks -Indexes DirectoryIndex <IfModule mod_rewrite.c> RewriteEngine on RewriteRule ^(.*)$ http://localhost:${options.port}/$1 [P] </IfModule>\n\n`
  }

  return htaccessConfig
}
