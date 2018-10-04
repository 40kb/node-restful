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
// == ASYNC Validators ==
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
  
  // == ASYNC Validator ==
  // tags: [String],
  // tags: {
  //   type: Array,
  //   validate: {
  //     validator: function(v) {
  //       // 如果你不传 tags 会怎样？ -- 同样会校验失败，因为你设置 type: Array 的时候，MongoDB 会帮你默认初始化为 [] -- empty array
  //       // 这里为什么要多加 `v &&` 这个判断？ -- 因为你有可能会传 tags: Null
  //       return v && v.length > 0
  //     },
  //     message: 'A course should have at least one tag.'
  //   }
  // },

  // 什么情况下会需要 async validate?
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        // Do some async work
        setTimeout(() => {
          const result = v && v.length > 0
          callback(result)
        }, 4000)
      },
      message: 'A course should have at least one tag.'
    }
  },

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
    // name: "React.js Course",
    // category: 'web',
    author: "Mosh",
    tags: ["react", "frontend"],
    isPublished: true,
    // price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } 
  catch (ex) {
    // == Validation Errors ==
    // 
    // ex.errors has two property
    // ex.errors.category
    // ex.errors.tags
    
    for (field in ex.errors) {
      // console.log(ex.errors)
      // console.log(ex.errors[field])
      console.log(ex.errors[field].message)
    }
  }
}

createCourse()

