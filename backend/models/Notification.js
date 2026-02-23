const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    username: String,
    message: String
})

module.exports = mongoose.model("Notification", notificationSchema)
