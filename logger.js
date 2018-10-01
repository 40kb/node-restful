var url = 'http://mylogger.io/log'

function log(message) {
  // send an http request
  console.log('message')
}

// before "export"
console.log(module)

// `url` `log` are scope to this logger module
// now "app.js" want to use this `log` function
// you need to export `log`

// 可以 export an object
//
// 使用的时候：
// const logger = require('./logger')
// logger.log('message')
// module.exports.log = log;

// 也可以 export a function
//
// 使用的时候：
// const log = require('./logger');
// log('message')
module.exports = log

// 注意你也可以用 exports
// exports.log = log
// 但是有一点你要注意！你不能重置 exports , 因为 "exports" is reference "module.exports"
// exports = log （不允许注意，会报错）

// after "export"
console.log(module)

// run "node logger.js" see what happen

// 同样你可以拿到 __filename, __dirname
console.log(__filename)
console.log(__dirname)

// how node implement module?
// 会把你写在 file 里面的代码包一层（包成module），像下面这样：
/**
(function(exports, require, module, __filename, __dirname) {
  var url = 'http://mylogger.io/log'

  function log(message) {
    // send an http request
    console.log('message')
  }

  console.log(module)
  module.exports = log
  console.log(module)
})
**/
