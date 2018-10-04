## Monogdb

安装
brew install mongodb

需要创建一个文件夹来存放数据
`sudo mkdir -p /data/db`

保证这个文件夹有权限
sudo chown -R `id -un` /data/db

启动
mongod

可以去连接数据库了

### 安装 mongoose

`npm install mongoose` （提供了更简单的 API 来连接数据库）

Mongoose 提供了一个 schema (定义了数据长什么样)

Schema -- define the sharp of document in MongoDB
Models


### 导入数据
```bash
mongoimport --db mongo-exercises --collection courses --file exercise-data.json --jsonArray

## --jsonArray 是 exercise-data.json 的文件类型
```
