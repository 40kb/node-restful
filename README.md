## Node Module System

## NPM

## Building RESTful APIs with Express

## Asynchronous JavaScript

## Storing Data in MongoDB

## Authentication and Authorization

## Handling and Logging Errors

## Unit and Integration Testing

## Test-driven Development(TDD)

## Deployment

## Node Module System

os, fs, events, http

### global object

browser -- window
node -- global

in browser var message = ''; 会被丢到 window object (added to global scope)
// window.message

但是在 node 里，你定义一个 var message = '';
不会被丢到 gloabl object 里!!!

**every file in node system is a module!**
**every function/variable define in that file are scope to this module**

like private
outside this file want visit function/variable inside this file
you should explity export it!!!

通常 app.js/main.js 也叫 main module

```js
console.log(module)
```

[](./images/nodemodule.png)

#### create a module

module.exports.log = log

#### loading a module

require('./logger.js')
require('./logger') // node asume this javascript file

`require()` function return an object that module/file export it

#### os module

https://nodejs.org/api/os.html

#### file module

https://nodejs.org/api/fs.html

#### event module

https://nodejs.org/api/events.html

#### http module

## Node Package Manager(NPM)

### Advance Express Tips

#### middleware

```js
// add middleware
app.use(express.json()) // req.body

// route handler 也是一个 middleware (buildin middleware)
app.get('/api/courses', (req, res) => {
  res.send('HELLO WORLD')
})
```

#### building custom middleware

```js
app.use(function(req, res, next) {
  console.log('Logging...')
  next() // next() -- 这个 fn 完了，你继续下一个middle, 这一行一定要写！！！ 要不然会一直卡主在这里
})

app.use(function(req, res, next) {
  console.log('Authenticating...')
  next()
})

// 注意 middleware 的顺序很重要！它执行也是有先后顺序的！
```

#### buildin middleware

```js
app.use(express.json())

app.use(express.urlencoded({ extended: true })) // key=value&key=value
// 你发请求时候使用 x-www-form-urlencoded 的时候，它会帮你处理成 json(req.body)
// http://127.0.0.1:3000/api/courses/1?key=value&key=value
//
// 但是通常我们都会使用 json 格式的 body，使用 `app.use(express.json())`

app.use(express.static('folder')) // server static assets
```

#### Third-party middleware

http://expressjs.com/en/resources/middleware.html

### Environments

development env
production env
staging env

process.env.NODE_ENV // if not set will be 'undefined'

### Configuration

https://www.npmjs.com/package/rc
https://www.npmjs.com/package/config (better)
`npm install config`

### Debug

console.log() 会经常用到，特别是在开发的时候
但是放在生产环境你就不希望它出现，所以发生产之前经常会去把 console.log() 删掉
就怕你删错东西了造成错误，一上生产就崩盘了！

所以，应该通过一个 "环境变量（配置）" 来控制 console.log() 是否起作用
`npm install debug`

### Templating Engines (gen HTML)

有时候你需要返回 HTML 给前端

- Pug
- Mustache
- EJS

```js
// you don't need to load this package
// express 在内部会帮你去加载
app.set('view engine', 'pug')

app.set('view', './view') // 你的模板放在那里？默认在 `./view`
```

### Database Integration

http://expressjs.com/en/guide/database-integration.html

### Asynchronous JavaScript

现实中经常会从数据库取数据、从网络取数据、从硬盘取数据、等等...

#### ASYNC PATTERNS

- Callbacks
- Promises
- Async/await

#### 对比一下两种 patterns

// Asynchronous

```js
console.log('Before')
getUser(1, user => {
  getRepos(user.username, repos => {
    getCommits(repo, commits => {
      // code here~
    })
  })
})
console.log('After')
```

// Synchronous

```js
console.log('Before')
const user = getUser(1)
const repos = getRepos(user.username)
const commits = getCommits(repos[0])
console.log('After')
```

### Authentication & authorization
// Register: POST /api/users
// Login: POST /api/logins