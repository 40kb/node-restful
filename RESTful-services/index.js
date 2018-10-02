const express = require('express')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const app = express()

// ENV -- `process.env.NODE_ENV` variable (系统变量)
// 实际项目中你需要不同的环境例如：production、development、staging
// 如果没有设 process.env.NODE_ENV 这个变量，默认会是 development
// 有两种方法可以拿到这个值：
console.log(`NODE_ENV:  ${process.env.NODE_ENV}`)
console.log(app.get('env'))

// app.get() //  HTTP GET
// app.post() // HTTP POST
// app.put() // HTTP PUT
// app.delete() // HTTP DELETE
// SYNTAX app.get/post/put/delete('path/route', callback()/routeHandle)
// docs: https://expressjs.com

// buildin middleware -- what is middleware?
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// third-part middleware
app.use(helmet())

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  console.log('Morgan enabled...')
}

// Configuration
// 不要放敏感信息在这里, 你可以放在 evn variable "ex: export app_mailpassword=1234"
// 然后在 config 里做一个 map:
// {
//    "name": "Express App",
//    "mail": {
//      "password": "app_mailpassword"
//    }
// }
//
// 改变一下 NODE_ENV 看看结果
// `export NODE_ENV=production`, `export NODE_ENV=development`, `export NODE_ENV=staging`
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))

// DEBUGGER
// 改变 `DEBUG` 环境变量来看一下结果
// `export DEBUG=app:start`
// `export DEBUG=app:db`
// `export DEBUG=app:*` -- 打开所有 debugs
//
// 另外一种方式是，在启动之前指定 debug 类型，例如：
// DEBUG=app:db nodemon index.js
// DEBUG=app:startup npm start
startupDebugger('message form debugger')
dbDebugger('db message from debugger')

// TEMPLATE ENGINE
app.set('view engine', 'pug')
app.set('views', './views') // default

// custom middleware
app.use(function(req, res, next) {
  console.log('Logging...')
  next() // next() -- 这个 fn 完了，你继续下一个middle, 这一行一定要写！！！ 要不然会一直卡主在这里
})

app.use(function(req, res, next) {
  console.log('Authenticating...')
  next()
})

// 把 custom middleware 写在单独的文件/Module
const logger = require('./logger-middleware')
app.use(logger)

const courses = [
  {
    id: 1,
    name: 'Learn Flutter & Dart to Build iOS & Android Apps',
  },
  {
    id: 2,
    name: 'Flutter - Beginners Course',
  },
  {
    id: 3,
    name: "Dart and Flutter: The Complete Developer's Guide",
  },
  {
    id: 4,
    name: 'Flutter - Advanced Course',
  },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// sending HTML to Client
app.get('/html', (req, res) => {
  res.render('index', {
    title: 'Express App',
    message: 'Hello World',
  })
})

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

// get single course
app.get('/api/courses/:id', (req, res) => {
  // res.send(req.params)
  const course = courses.find(c => c.id === +req.params.id)

  if (!course)
    return res.status(404).send('The course with the given ID was not found!') // 404

  res.send(course)
})

// ADD Courses
app.post('/api/courses', (req, res) => {
  // input validation
  // 现实当中校验会比这严格多了

  // 手工校验
  // if (!req.body.name || req.body.name.length < 3) {
  //   // 404 Bad Request
  //   res.send(400).send('Name is required and should be minimum 3 charactars')
  //   return
  // }

  // 使用校验插件
  // use validation plugin https://github.com/hapijs/joi
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  }

  const result = Joi.validate(req.body, schema)
  console.log(result) // 看看 result 提供了哪些信息
  if (result.error) {
    // res.status(400).send(result.error) // 把整个 error 给前端，太重了
    res.status(400).send(result.error.details[0].message)
    return
  }

  // add course
  const course = {
    id: courses.length + 1, // hardcode, not using database now
    name: req.body.name,
  }
  courses.push(course)

  // 通常你更新一条记录，会把这条记录返回回去
  res.send(course)
})

// UPDATE Course
app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find(c => c.id === +req.params.id)

  if (!course)
    return res.status(404).send('The course with the given ID was not found!') // 404

  // Validate
  // If invalid, return 400 - Bad request
  // const schema = {
  //   name: Joi.string()
  //     .min(3)
  //     .required(),
  // }

  // const result = Joi.validate(req.body, schema)
  // 上面这段校验多处用到，extract 出来单独成一个函数
  // const result = validateCourse(req.body) // `result.error`
  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message)
  //   return
  // }

  // 上面多次用到了 `result.error` 可以使用 ES6 的 object destructring 进行优化
  const { error } = validateCourse(req.body) // 我们只需要 `error`
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }

  // Update course
  course.name = req.body.name
  // Return the updated course
  res.send(course)
})

// 多个 params 情况 http://127.0.0.1:3000/api/posts/2018/3
app.get('/api/posts/:year/:month', (req, res) => {
  // read route params
  const year = req.params.year
  const month = req.params.month

  // read queryString params
  const sortBy = req.query.sortBy

  //  console.log(req.params)
  //  console.log(req.query)

  res.send({
    year,
    month,
    sortBy,
  })
})

// DELETE Course
app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find(c => c.id === +req.params.id)
  if (!course)
    return res.status(404).send('The course with the given ID was not found!') // 404

  // Delete
  const index = courses.indexOf(course)
  courses.splice(index, 1)

  // Return the same course
  res.send(course)
})

// extract validation
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  }

  return Joi.validate(course, schema)
}

// 有两种 params
// 一种是 "route params" -- using “route params” for require value
// http://127.0.0.1:3000/api/posts/2018/3
//
// 另外一种叫做 "query string params" to provide aditinail data for backend services
// http://127.0.0.1:3000/api/posts/2018/3?soryBy=name

// ENV Variable
// if you have set env PORT, then use that, otherwise use 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port http://127.0.0.1:${port} ...`)
})
