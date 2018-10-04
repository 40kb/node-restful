const mongoose = require("mongoose");

// CONNECT TO MONGODB
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

// DEFINE SCHEMA 
// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
//   price: Number
// });

// DEFINE SCHEMA WITH OPTIONS
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

// CREATE MODEL 
const Course = mongoose.model("Course", courseSchema);


// == CREATE COURSE ==
async function createCourse() {
  const course = new Course({
    // name: "React.js Course",
    author: "Mosh",
    tags: ["react", "frontend"],
    isPublished: true,
    price: 15
  });

  // 这只是 promise resolve 状态的处理
  // 也需要考虑到异常状态...前面我们学过 async...await 需要用 try...catch 来实现 reject 状态
  // const result = await course.save();
  // console.log(result);

  try {
    const result = await course.save();

    // course.save() 执行前会 触发 .validate(), 不信你可以试一下
    // const result = await course.validate() 

    // 但是 .validate() 返回的是 "Promise Void", 所以你不能像这样写逻辑：
    // if (!result) then do something
    // 如果有些逻辑是在校验不通过的时候去执行，你只能在 validate(fn() {...}) 里面写逻辑，例如：
    // const result = await course.validate(function(err) {
    //   console.log('validate fail')
    //   console.log('err: ', err)
    // })

    console.log(result);
  } 
  catch (err) {
    console.log(err.message)  
  }
}

// create course without "name"
createCourse()

