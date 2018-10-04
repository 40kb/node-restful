### Authentication & Authorization
// Register: POST /api/users
// Login: POST /api/logins (思考一下为什么 Login 需要使用 POST)

// Logout: 注意 server 不存放这个 TOKEN，所以如果要logout前端把 TOKEN 清掉就可以了！
// 因为 TOKEN 是给到前端的钥匙来访问API时候需要提供的，我不需要保存你的钥匙
// 如果你把 TOKEN 存放在数据库里（假如被黑客爆库了）他就得到了所有的TOKEN，压根不需要用户的密码来做校验！
// 如果真的要想存放在数据库（记得加密它/Hashing）
// 这就像把所有的密码/钥匙/驾照存放在一个中心地方，如果有一天这个中心地方蹦掉了...那所有的这些资料就崩掉了
// 还不如给用户自己拿着（每次来做 login 的时候我给你一把钥匙）
//
// 而且...使用HTTPS

#### 密码不能明文存放！
```js

const bcrypt = require('bcrypt')

// hashing we need source -- random charts added before or end to the password
// 1234 ==> abcd

```

// Information Expert Principle