const jwt = require('jsonwebtoken')
const config = require('config')

// 注意：校验用户身份是，在 middleware/auth （校验用户登录态）之后执行
module.exports = function auth(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  // 校验用户身份角色
  if (!req.user.isAdmin) return res.status(403).send('Access denied.')

  next()
}
