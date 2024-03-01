const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router/index')

const app = new koa()
app.use(bodyParser())
registerRouters(app)

module.exports = app