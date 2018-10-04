const _ = require('lodash')
const config = require('config')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // 是否找到 User
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password.') // 注意：这里返回给client的是要模糊的提示，不应该是精确的提示

  // 密码是否正确
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.') // 注意：这里返回给client的是要模糊的提示，不应该是精确的提示
  
  // 真实项目肯定不能返回 true
  // res.send(true)


  // 返回给前端的数据（返回 JSON Web Token）
  // 用户登录的时候生成一个驾照(JWT)，返回给前端（client）
  // 用户接着操作请求API的时候，要把驾照(JWT)带过来（所以前端要把驾照放好存起来）
  // https://jwt.io
  // JWT
  //  -- HEADER
  //  -- PAYLOAD (public user attributes)
  //  -- digit sign

  // gen token
  // const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey') // privateKey 肯定不可以写在代码里面！！！
  
  // 把 privateKey 存在 env variable 里，然后通过 config.get() 取过来
  // 有一点需要注意的，在 app.js/index.js (app entry point) 里需要检查是否有设置这个变量
  // 因为如果没有设置这个变量，Auth 服务就提供不了了！
  // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))

  // 上面 generateAuthToken 这行代码在别的地方也用到，而且是一模一样的功能
  // 项目久了，如果需要改动这一块的逻辑 容易忘掉有多处在使用，所以把它抽出来
  const token = user.generateAuthToken();
  console.log('token: ', token)
  res.send(token)
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router
