RESTful Services/RESTful API

REST -- Representational State Transfer

## APP actructure

Client --HTTP-- Server

## CURD Operations

```
    Create          |
    Read            |    ---- Server
    Update          |
    Delete          |
```

### EXAMPLE

```
    http(s)://vidly.com/api/customers

    HTTP METHODS
        GET, POST, PUT, DELETE

    GET CUSTOMERS
        Request GET /api/customers
        Response [{ id: 1, name: '', id: 2, name: '', ... }]

    GET A CUSTOMER
        Request GET /api/customers/1
        Response { id: 1, name: '' }

    UPDATE A CUSTOMER
        Request PUT /api/customers/1
                PUT body { id: 1, name: '' }
        Response { id: 1, name: '' }

    CREATE A CUSTOMER
        Request POST /api/customers
                POST body { id: 1, name: '' }
        Response { id: 1, name: '' }

    所有的操作如下：
        GET /api/customers
        GET /api/customers/1
        PUT /api/customers/1
        DELETE /api/customers/1
        POST /api/customers

    SO, RESTful 有哪些好处？坏处？
```

## Express

```js
const express = require('express')
const app = express()

// app.get() //  HTTP GET
// app.post() // HTTP POST
// app.put() // HTTP PUT
// app.delete() // HTTP DELETE
// SYNTAX app.get/post/put/delete('path/route', callback()/routeHandle)
// docs: https://expressjs.com
```

## Env Variable

```js
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port http://127.0.0.1:${port} ...`)
})
```

怎么去设置 evn variable?
window: set PORT=5000
mac: export PORT=5000

## req.params VS req.query

```js
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

// 有两种 params
// 一种是 "route params" -- using “route params” for require value
// http://127.0.0.1:3000/api/posts/2018/3
//
// 另外一种叫做 "query string params" to provide aditinail data for backend services
// http://127.0.0.1:3000/api/posts/2018/3?soryBy=name
```
