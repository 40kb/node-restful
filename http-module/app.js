const http = require('http')

// const server = http.createServer()
// server.on('connection', socket => {
//   console.log('New connection...')
//   console.log(socket)
// })

const server = http.createServer((req, res) => {
  console.log(req)
  console.log(res)

  if (req.url === '/') {
    res.write('Hello World')
    res.end()
  }

  // 现实中，通常都需要处理各种 route
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3, 4, 5]))
    res.end()
  }
})

// Registering an Event
server.listen(3000)

console.log('Listening on port http://127.0.0.1:3000 ...')

// 现实项目中很少会直接用 http Module，一般都会用 Express, KOA... （在 http Module 进行封装的framework）
