// let you write async code look like sync code

// ASYNC PATTERNS
console.log('Before')
// getUser_callback(1, function(user) {
//   getRepos(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       // code here...
//     })
//   })
// })

// consuming promises
const p = new getUser_callback(1)
p.then(res => {
  console.log(res)
})

//  和上面 callback hell 对比
//
// getUser_callback(1)
//  .then(user => getRepos(user.username)) -- getRepos(user.username) => return promise
//        -----return value(promise)-----
//       .then(wrap the return value inside the promise)
//
// Promise-based approach
getUser_callback(1)
  .then(user => getRepos(user.username)) // getRepos(user.username) -- return a promise
  .then(repos => getCommits(repos[0])) // getCommits(repos[0]) -- return a promise
  .then(commits => {
    console.log(commits)
  })
  // 注意：上面 chaining 无论是哪一步出错，都会触发这个 catch() !!!
  .catch(err => {
    console.log(err)
  })

// Async and Await approach
// let you write async code look like sync code
// JS engine 会把它转换成 promise.then().then()...类似的
// **Async...Await is build on top of Promise** 只是让代码看起来像 sync ，执行的时候还是 async (syntax sugar)
//
// 注意：一个函数返回的是一个 promise 才可以用 await (不再需要像上面的 chaining .then())
// const user = await getUser_callback(1)
// const repos = await getRepos(user.username)
// const commits = await getCommits(repos[0])
// console.log(commits)

// 特别注意的是：await 需要放在 "async function() {}" 里面！！！
// 例如：async -- 告诉JS engine 这是一个 async Function, 里面包含有 await
// async function displayCommits() {
//   const user = await getUser_callback(1)
//   const repos = await getRepos(user.username)
//   const commits = await getCommits(repos[0])
//   console.log('async-await')
//   console.log(commits)
// }
// // 执行这个 async function
// displayCommits()

// 还有一点注意的：Async-await 是没有 catch() handle 的
// 只能通过 try...catch statement 来实现 error
async function displayCommits() {
  try {
    const user = await getUser_callback(1)
    const repos = await getRepos(user.username)
    const commits = await getCommits(repos[0])
    console.log('async-await')
    console.log(commits)
  } catch (err) {
    console.log('Error', err.message)
  }
}

// 执行这个 async function
displayCommits()

console.log('After')

// ===============================

function getUser_callback(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...')
      resolve({ id: id, gitHubUsername: 'mosh' })
    }, 2000)
  })
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...')
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000)
  })
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...')
      resolve(['commit'])
    }, 2000)
  })
}

// -- Promises
// -- Async/await
