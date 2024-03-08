const { v4 : uuidv4 } = require('uuid')

function getUUid() {
  return uuidv4()
}
module.exports = getUUid