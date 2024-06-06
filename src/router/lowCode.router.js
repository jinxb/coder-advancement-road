const koaRouter = require('@koa/router')
const { update, getLocalProjectInfo } = require('../controller/lowCode.controller')
const lowCodeRouter = new koaRouter({prefix: '/low-code'})

// 关联项目
lowCodeRouter.post('/correlation', update)

// 获取本地项目启动信息
lowCodeRouter.get('/local-project-info', getLocalProjectInfo)

module.exports = lowCodeRouter
