const svgCaptcha = require('svg-captcha')

function getCaptcha(size = 4) {
  const captcha = svgCaptcha.create({
    size,
    noise: 3,
    fontSize: 40,
    width: 80,
    height: 40,
    background: '#fff',
    color: true,
  });
  return captcha
}

module.exports = getCaptcha