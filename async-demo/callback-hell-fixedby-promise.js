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

console.log('After')

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
