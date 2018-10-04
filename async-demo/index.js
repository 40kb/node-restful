/*
console.log('Before')
// Blocking ?
// Non-blocking ?

// 模拟 异步(async) 取数据
// note: setTimeout are Non-blocking async function
// setTimeout(() => {
//   console.log('Reading a user from a database...')
// }, 2000)

// 把 setTimeout 挪到 getUser()
const user = getUser(1)
console.log(user) // undefined -- why?

console.log('After')

function getUser(id) {
  setTimeout(() => {
    console.log('Reading a user from a database...')
    return { id: id, gitHubUsername: 'mosh' }
  }, 2000)
}
*/

// ASYNC PATTERNS
// -- Callbacks
console.log('Before')
getUser_callback(1, function(user) {
  console.log(user)

  // Get the repos (在一个异步的 cb，里面执行另外一个同样是异步的 fn)
  // 到目前为止还没有很大的问题
  getRepos(user.gitHubUsername, repos => {
    console.log('Repos: ', repos)

    // 但是，如果这里面再执行一个异步的 fn
    // 你就会发现你的代码需要嵌套很多层！-- Callback Hell
    // "callback pattern" 会遇到的问题就是 callback hell!!!
  })
})
console.log('After')

function getUser_callback(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...')
    callback({ id: id, gitHubUsername: 'mosh' })
  }, 2000)
}

// 假如你另外一个 fn, 也是需要异步
function getRepos(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...')

    // return ['repo1', 'repo2', 'repo3']
    callback(['repo1', 'repo2', 'repo3'])
  }, 2000)
}

// -- Promises
// -- Async/await

// 对比一下两种 patterns
//
// Asynchronous
//
// console.log('Before')
// getUser(1, user => {
//   getRepos(user.username, repos => {
//     getCommits(repo, commits => {
//       // code here~
//     })
//   })
// })
// console.log('After')

// Synchronous
//
// console.log('Before')
// const user = getUser(1)
// const repos = getRepos(user.username)
// const commits = getCommits(repos[0])
// console.log('After')
