const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true // 保证数据库里不能有两个 email 相同的用户
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  // 这里只有一个角色，所以就直接 isAdmin
  // 实际项目中你可能有很多角色，或者可以做一些相应的操作 del、modify、add
  // 这些的实现逻辑是一样的：
  // 1. 把相应的 attribute 在生成TOKEN的时候放到payload里，请求接口时候把TOKEN带过来
  // 2. 解压TOKEN，看看有没有相应的 attribute
  // 3. 在路由哪里做多个 middleware 拦截（注意先后顺序：[auth, admin, ...]）
  // roles: []
  // operations: []
})

userSchema.methods.generateAuthToken = function() {
  // const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))

  // 有些接口是需要 Admin 才允许操作的！
  // 我们在生成 TOKEN 的时候，在 PAYLOAD（user public attributes） 里把用户的角色也放进去
  // (用户访问的时候带着 TOKEN 过来，我们 decode TOKEN 就可以知道用户的身份，是否可以做相应的操作)
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))

  return token
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),

    // 这里的 password 校验很简单，如果你想要复杂的校验
    // 可以试一下 "joi-password-complexity" package
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;