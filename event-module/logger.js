/*
// 你经常会遇到一个问题，在你 logger.js 里面：
const EventEmitter = require('events')
const emitter = new EventEmitter();

log() {
    emitter.emit('messageLogged')
}

// 你想在 app.js 里面去监听，然后你会发现这样是不起作用的！因为logger.js 和 app.js 使用的不是同一个 emitter
// EventEmitter -- CLASS，emitter -- OBJECT
const EventEmitter = require('events')
const emitter = new EventEmitter();

emitter.on('messageLogged', function() {
  console.log('Listener called')
})
*/

// 所以，通常你都不会直接使用 emitter
// 你会去创建一个 module 来处理 emitter, 然后整个项目都是用同一个 emitter
const EventEmitter = require('events')
const emitter = new EventEmitter()

class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP Request
    console.log(message)

    // Raise an event
    // emitter.emit('messageLogged', { id: 1, url: 'http://' })
    this.emit('messageLogged', { id: 1, url: 'http://' })
  }
}

module.exports = Logger
