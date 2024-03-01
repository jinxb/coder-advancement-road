const app = require('./app/index')
const { SERVER_PORT } = require('./config/server')

console.log(SERVER_PORT)
app.listen(SERVER_PORT, () => {
  console.log("服务启动成功@！");
})