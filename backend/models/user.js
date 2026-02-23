const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    username: String,
    password: String,
    role: String,

    name: String,
    branch: String,

    rollNumber: String,   // ✅ for student
    adminId: String       // ✅ for admin

})

module.exports = mongoose.model("User", UserSchema)
