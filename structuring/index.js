const express = require('express')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')
const app = express()

// TEMPLATE ENGINE
app.set('view engine', 'pug')
app.set('views', './views')

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(morgan('tiny'))
app.use(helmet())

// USE ROUTER
// any matched "/api/courses" handle by "couses"
// 所以你可以到 courses/index.js 里把 "/api/courses/" 替换为 "/"
app.use('/api/courses', courses)
// any matched "/" handle by home
app.use('/', home)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port http://127.0.0.1:${port} ...`)
})
