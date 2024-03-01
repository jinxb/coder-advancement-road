const fs = require('fs')
const path = require('path')

function registerRouters(app) {
  const files = fs.readdirSync(__dirname)
  for (const file of files) {
    if (!file.endsWith('.router.js')) {
      continue
    }
    const router = require(path.resolve(__dirname, file))
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters