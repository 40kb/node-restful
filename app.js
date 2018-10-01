// console.log(global)
console.log(module)

const logger = require('./logger')
console.log(logger)

// == OS Module
const os = require('os')
const totalMemory = os.totalmem()
const freeMemory = os.freemem()

console.log(`Total Memory: ${totalMemory}`)
console.log(`Free Memory: ${freeMemory}`)

// == File Module (alway use ASYNC methods)
const fs = require('fs')
const files = fs.readdirSync('./') // SYNC methods
console.log(files)

// ASYNC methods
const files2 = fs.readdir('./', function(err, files) {
  if (err) console.log('Error', err)
  else console.log('Result', files)
})

// == Event Module
// OOP -- Class vs Object?
// what emit mean? -- Making a noise, produce -- signalling
const EventEmitter = require('events') // Class
const emitter = new EventEmitter() // Object

// 注意这里顺序很重要！Raise an Event 之前必须要先去监听它！！！
// Register a listener -- listen an event raise
emitter.on('messageLogged', function() {
  console.log('Listener called')
})

// (when to)Raise an event -- where to listen it?
emitter.emit('messageLogged')

// 注意这里顺序很重要！Raise an Event 之前必须要先去监听它！！！
// Register a listener -- listen an event raise
emitter.on('messageLogged2', function(arg) {
  console.log('Listener called')
  console.log(arg)
})

// 通常你都会需要知道关于 event 的一些详情（event argument)
emitter.emit('messageLogged2', { id: 1, url: 'url' })
