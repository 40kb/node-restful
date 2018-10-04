// ASYNC PATTERNS
// - Callbacks
// - Promises
//    Holds the eventual result of an asynchronous operation
//    执行 promise 后状态会变为 Pending, 等 async operation 接受之后，会有两种状态 `Fulfilled` `Rejected`
const promise = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...
  // resolve() -- everything is OK, sending value back: pending => resolved, fulfilled
  // reject(new Error('message)) -- something wrong, sending error back: pending => rejected

  // resolve(1)

  // 模拟 async
  // setTimeout(() => {
  //   resolve(1)
  // }, 2000)

  // 模拟 async
  setTimeout(() => {
    reject(new Error('message'))
  }, 2000)
})

// consumer (consuming promise)
promise.then(result => {
  console.log(result)
})

promise.catch(err => {
  console.log(err)
})
// - Async/await
