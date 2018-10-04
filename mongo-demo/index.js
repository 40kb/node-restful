const mongoose = require("mongoose");

// hardcode here, 实际项目中 mongodb://localhost 应该写在一个配置文件(前面介绍过 config)
//
// SYNTAX:
// mongodb://localhost/playground
// ------path-------- --database--
//
// 如果连接数据库报错：
// https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars
mongoose
  .connect(
    "mongodb://localhost/playground",
    { useNewUrlParser: true }
  ) // 如果没有这个数据库，MongoDB 会帮你创建它
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(err => {
    console.error("Could not connect to MongoDB...", err);
  });

// define schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Models
//
// 之前有介绍过
// Classes, objects
// Human, John
// Classes -- blueprint, objects -- are instance of Classes
//
// 所以这里类似的：
// Classes, objects
// Course, nodeCourse
//
// 我们要把 Schema 转换(Compile)成 Models（可以理解为和 Classes 一个概念）
const Course = mongoose.model("Course", courseSchema);

// 上一行我们得到了一个 Classes, 接着我们来创建一个 object
// const course = new Course({
//   name: 'Node.js Course',
//   author: 'Mosh',
//   tags: ['node', 'backend'],
//   isPublished: true,
// })

// 所以顺序是：
// 1. 创建 Schema
// 2. 把 schema 转换成 Model (得到一个 Class)
// 3. 然后创建这个 Class 的实例 (object)
// 4. save to database (注意这是异步操作)

// const result = await course.save()

// == CREATE COURSE ==
// 我们知道 await 需要带着 async fn 里面，所以我们来创建下面的 fn
async function createCourse() {
  const course = new Course({
    name: "React.js Course",
    author: "Dan",
    tags: ["react", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

// save to database
// 注意：每次执行一次都会去创建一次（所以不要用nodemon index.js）
// createCourse()

// 在数据库里你会得到：
//
// {  "_id": "5bb422442c7fd11e4ed18a5a",
//    "tags": ["node","backend"],
//    "name": "Node.js Course",
//    "author": "Mosh",
//    "isPublished": true,
//    "date": "2018-10-03T01:58:28.983Z",
//    "__v":0
// }

// == QUERY COURSES ==
async function getCourses() {
  let courses = await Course.find()

  // we can add filters
  let courses = await Course.find({ author: "Mosh", isPublished: true })

  // sort?
  let courses = await Course
    .find({ author: "Mosh", isPublished: true })
    .sort({ name: 1 }) // 1 => 升序, -1 => 降序

  // limit?
  let courses = await Course
    .find({ author: "Mosh", isPublished: true })
    .sort({ name: 1 }) // 1 => 升序, -1 => 降序
    .limit(10)

  // specify some properties?
  let courses = await Course
    .find({ author: "Mosh", isPublished: true })
    .sort({ name: 1 }) // 1 => 升序, -1 => 降序
    .limit(10)
    .select({ name: 1, tags: 1})


  // Comparison Query Operators
  // eq -- equal
  // ne -- not equal
  // gt -- greater than
  // gte -- greater than or equal to
  // lt -- less than
  // lte -- less than or equal to
  // in -- in
  // nin -- not in
  let courses = await Course
    // .find({ price: 10 }) // 现在筛选价格为 10 课程，那如何筛选价格大于 10 的课程？
    // .find({ price: { $gt: 10 } }) // 现在筛选的是价格大于 10 的课程，那如何筛选大于或等于 10 小于或等于 20 的课程？
    // .find({ price: { $gte: 10, $lte: 20 } }) // 大于或等于 10 小于或等于 20 的课程
    .find({ price: { $in: [10, 15, 20] } }) // 筛选价格为 10, 15, 20 的课程

    .sort({ name: 1 })
    .limit(10)
    .select({ name: 1, tags: 1})


  // Logical Query Operators
  // or
  // and
  let courses = await Course
    .find()
    .or([ { author: 'Mosh' }, { isPublished: true } ]) // 筛选作者为 Mosh, 或已经发布了的课程
    .sort({ name: 1 })
    .limit(10)
    .select({ name: 1, tags: 1})

  
  let courses = await Course
    .find()
    .and([ { author: 'Mosh' }, { isPublished: true } ]) // 筛选作者为 Mosh, 并且是已经发布了的课程
    .sort({ name: 1 })
    .limit(10)
    .select({ name: 1, tags: 1})


  // Regular Expressions
  let courses = await Course
    // Starts with Mosh
    .find({ author: /^Mosh/ }) 

    // Ends with Hamedani
    .find({ author: /Hamedani$/ }) 

    // Contains Mosh
    .find({ author: /.*Mosh.*/ }) 

    // 区分大小写
    .find({ author: /.*Mosh.*/i }) 

    .sort({ name: 1 })
    .limit(10)
    .select({ name: 1, tags: 1}) 


  // Counting (有时候你可能只需要一个总数)
  let courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .sort({ name: 1 })
    .count()
  

  // Pagination (使用 skip() 模拟 Pagination)
  const pageNumber = 2
  const pageSize = 10
  // /api/courses?pageNumber=2&pageSize=10

  let courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber -1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
  

  // 对了，如果你要倒序排列 价格/其它KEY 可以 .sort({ -price })

  console.log(courses)
}

// getCourses()


// == UPDATE COURSES ==
async function updateCourse(id) {
  // Approach A: (什么时候用这是方式？-- input form client)
  // Query first
  // findeById()
  // Modify its properties
  // save()
  // const course = await Course.findById(id)
  // if (!course) return

  // course.isPublished = true
  // course.author = 'Another Author'

  // course.set({
  //   isPublished: true,
  //   author: 'Another Author'
  // })

  // const result = await course.save()
  // console.log(result)



  // Approach B: 什么时候使用这种方式？-- no input from client
  // Update first
  // Update directly
  // Optionally: get the updated document

  // https://docs.mongodb.com/manual/reference/operator/update/
  // Course.update() => update document from database without retrieve first
  // let result = await Course.update({ _id: id }, { // 注意：返回的是修改状态，并不是被修改之后的 document object
  //   $set: {
  //     author: 'iPhone',
  //     isPublished: false
  //   }
  // })

  // 有时候你想得到 update 之后的 document object
  // let course = await Course.findByIdAndUpdate(id, { // 注意：返回的是**修改之前**的 document object
  //   $set: {
  //     author: 'jack',
  //     isPublished: true
  //   }
  // }) 


  // 如果想得到修改之后的 document object
  let course = await Course.findByIdAndUpdate(id, { // 注意：返回的是**修改之后**的 document object
    $set: {
      author: 'jack',
      isPublished: true
    }
  }, { new: true })  


  console.log(course)
}

// updateCourse('5bb422efdf83bb1ed840ce63')



// == REMOVE COURSES ==
async function removeCourse(id) {
  // deleteOne -- will detele the first one
  // const result = await Course.deleteOne({ _id: id }) // 注意：返回的是删除的状态结果，不是被删除掉的 document object

  // 删除多条
  // const result = await Course.deleteMany({ _id: id }) // 注意：返回的是删除的状态结果，不是被删除掉的 document object

  // 有时候你想得到 delete 之后的 document object
  const course = await Course.findByIdAndRemove(id); // 注意：返回的是 null (已经被你删掉了，找不到记录返回 null)

  // 那如何返回你删除的那条记录呢？
  // 先查出来？缓存在一个变量里
  // 然后再删除这条记录，再把缓存下来的记录返回回来？
  // 但是，你为啥有这种需求！？

  console.log(course)
}

removeCourse('5bb422efdf83bb1ed840ce63')



