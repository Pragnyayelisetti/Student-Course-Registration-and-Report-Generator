const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({

  courseName: String,
  courseCode: String,
  branch: String,
  credits: Number,

  // ✅ NEW FIELDS
  type: String,          // lab / theory
  description: String

})

module.exports = mongoose.model("Course", courseSchema)
