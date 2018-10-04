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

// DEFINE SCHEMA WITH OPTIONS
// == Build-in Validators ==
const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 15,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'] // 你创建course的时候，category 只能是这里面定义的几个（要不然会校验失败）
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  
  // 比如：我想当 isPublished 为 true 的是，price 为 required 
  price: {
    type: Number,
    required: function() { return this.isPublished }, // 注意：这里不可以用 arrow function
    min: 10,
    max: 200
  } 
});

// CREATE MODEL 
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React.js Course",
    category: '-',
    author: "Mosh",
    tags: ["react", "frontend"],
    isPublished: true,
    // price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } 
  catch (err) {
    console.log(err.message)  
  }
}

createCourse()

