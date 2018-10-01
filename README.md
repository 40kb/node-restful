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
