// 需要依赖几个 API 都完成之后才执行相应的动作

// calling FB API
const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async operation 1...')
    resolve(1)
  }, 2000)
})

// calling Google API
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async operation 2...')
    resolve(2)
  }, 2000)
})

// calling Google API
const p2a = new Promise(reject => {
  setTimeout(() => {
    console.log('Async operation 2-a...')
    reject(new Error(new Error('because something failed.')))
  }, 2000)
})

// calling Twitter API
const p3 = new Promise(resolve => {
  setTimeout(() => {
    console.log('Async operation 3...')
    resolve(3)
  }, 1000)
})

// Promise.all() // 入参必须是 []
// res 得到的也是一个 [], 顺序和入参的顺序一一对应
// Promise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// })

// 注意：JS 是单线程的！
// 所以（虽然叫parallel）但是是先执行 p1, 完了之后才会执行 p2, p3...

// 如果其中一个状态是 rejected, 那最后的结果就是 rejected
// Promise.all([p1, p2, p2a, p3])
//   .then(res => {
//     console.log('resolve')
//     console.log(res)
//   })
//   .catch(err => {
//     console.log('reject')
//     console.log('Error', err.message)
//   })

// 有时候你想，只要多个 promise 当中的只要有一个 promise 完成后（最先完成那个），就马上做相应的东西，不用等所有的都完成才做
// 返回的结果不再是 [], 而是最先完成那个 promise 返回回来的值
Promise.race([p1, p2, p3]).then(res => {
  console.log(res)
})
