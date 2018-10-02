const express = require('express')
const Joi = require('joi')
const app = express()

// app.get() //  HTTP GET
// app.post() // HTTP POST
// app.put() // HTTP PUT
// app.delete() // HTTP DELETE
// SYNTAX app.get/post/put/delete('path/route', callback()/routeHandle)
// docs: https://expressjs.com

// adding middleware -- what is middleware?
app.use(express.json())

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
