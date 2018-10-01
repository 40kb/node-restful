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
