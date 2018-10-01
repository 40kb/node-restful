npm init

npm i/npm install

npm install --save-dev sass
npm install sass -g

## use a module

const lodash = require('lodash')

// `require()` function
// Core module --> require('lodash)
// Files or folder --> require('./lodash')
// Files --> require('./lodash')
// Folder --> require('./action/') ==> ./action/index.js

## NPM and SCM

## SemVer

Major (break the existing API)
Minor (added features but don't break the API)
Patch (bug fix, x.x.0 -- 0 表示目前还有没有发 bug)

`^4.13.6` // 4.x
`~1.8.3` // 1.8.x
`1.8.3` // 1.8.3

```json
{
  "dependencies": {
    "mongoose": "^4.13.6" // Major.Minor.Patch(bug fix)
  }
}
```

## 查看安装了哪个版本？

- node_modules/XX/X 源文件
- npm list/npm list --depth=0

## 查看 package 依赖了哪些 packages

`npm view mongoose` 整个 package.json
`npm view mongoose dependencies` 仅关注依赖
`npm view mongoose versions` 查看 release 了哪些版本
`npm install mongoose@2.4.2` 安装指定版本
`npm outdated` 查看哪些版本更新了
`npm update` 更新包（只会更新 Minor, Patch）version

更新 project(not global) packages
`npm install -g npm-check-updates`
`ncu -u` upgrade package.json 里面的包到 Major/Leatst

更新 global packages
npm install -g 'package'

## dependencies/devDdependencies

devDdependencies 生产环境并需要这些包（仅是开发环境需要）
dependencies 生产环境需要依赖的包

## uninstall package

npm un/uninstall lodash
npm un/uninstall lodash --save-

## upgrade NPM

npm install -g npm

## depoly you own package

```bash
mkdir lion-lib/
npm init
touch index.js

npm adduser/login
npm publish  ## (有时候会报错，确保你的 package.json - "name" 唯一)


## publish newer version
## update package.json - version (by hand)
npm version minor/patch/major
npm publish
```

```js
// index.js
module.exports.add = function(a, b) {
  return a + b
}

// add feature
module.exports.multiply = function(a, b) {
  return a * b
}
```
