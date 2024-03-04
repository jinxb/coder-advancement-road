const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'), 'utf8')
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'), 'utf8')

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}