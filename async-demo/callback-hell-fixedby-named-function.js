// ASYNC PATTERNS
// -- Callbacks
console.log('Before')
// getUser_callback(1, function(user) {
//   console.log(user)
//   // getRepos(user.gitHubUsername, repos => {
//   //   console.log('Repos: ', repos)
//   //   getCommits(repo, displayCommits
//   //   // 注意不是：getCommits(repo, displayCommits())
//   //   // 是 passing fn, not execute fn()
//   // })
//   getRepos(user.gitHubUsername, getCommits) 
getUser_callback(1, getRepos)

console.log('After')

// crate named function
function displayCommits(commits) {
  console.log(commits)
})

function getCommits(repos) {
  getCommits(repo, displayCommits)
}

function getRepos(user) {
  getRepos(user.username, getCommits)
}

function getUser_callback(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...')
    callback({ id: id, gitHubUsername: 'mosh' })
  }, 2000)
}

function getRepos(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...')
    callback(['repo1', 'repo2', 'repo3'])
  }, 2000)
}

// -- Promises
// -- Async/await
