// 有时候你可能需要一个已经是 resolve 状态的 Promise
// 特别是在 Unit Test 的时候

const p = Promise.resolve({ id: 1 })
p.then(res => {
  console.log(res)
})

// 同样的，有时候你可能需要一个已经被 reject 状态的 Promise
const p1 = Promise.reject('reason for rejection...')
p1.catch(err => {
  console.log(err)
})
