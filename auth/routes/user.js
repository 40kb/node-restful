const _ = require('lodash')
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  // const userId = req.user._id // user id from JWT
  // 所以为什么在 middleware/auth.js 里面需要写这一行 `req.user = decoded`

  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // check is user registered
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  // store user
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // })

  // 上面的 new User() 也可以用 _.pick() 来优化
  user = new User(_.pick(req.body, ['name', 'email', 'password']))

  // HASHING PASSWORD
  // 密码是不能明文存数据库的
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  // res.send(user);

  // 注册成功后，肯定不能把 password 返回给 client
  // 两种方式来 modify return object
  // 第一种方式是自定义返回：
  // res.send({
  //   name: user.name,
  //   email: user.email
  // })

  // 第二种方式是用 lodash 提供的一些方法来处理自定义返回
  // res.send(_.pick(user, ['_id', 'name', 'email']))


  // == WITH JWT ==
  // why set token to the http header?
  // 
  // 有时候你想用户注册之后，就马上能拥有登录态了，不需要重新登录！
  // 所以用户注册的时候，也把 JWT 返回给 client!
  // 但是呢，JWT 并不数据用户注册信息的一部分！所以你把JWT放到 response body 里面显得不合理！
  // 所以你可以把它放在 response header 里面！
  // 前端从 response header 里取到 JWT 把它存下来，下次发请求时候把它带过来！
  // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))

  // 上面 generateAuthToken 这行代码在别的地方也用到，而且是一模一样的功能
  // 项目久了，如果需要改动这一块的逻辑 容易忘掉有多处在使用，所以把它抽出来
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
});

module.exports = router
