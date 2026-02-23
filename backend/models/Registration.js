const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({

    username: String,
    courseName: String,
    courseCode: String,
    branch: String,
    credits: String,
    type: String
})

module.exports = mongoose.model("Registration", registrationSchema)
