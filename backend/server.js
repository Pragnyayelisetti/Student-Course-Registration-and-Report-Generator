const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const User = require("./models/user")
const Course = require("./models/Course")
const Registration = require("./models/Registration")
const Notification = require("./models/Notification")


const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err))

// ✅ DEFAULT COURSES SEEDING
mongoose.connection.once("open", async () => {

    const count = await Course.countDocuments()

    if (count === 0) {

        await Course.insertMany([
            {
                courseName: "Data Structures",
                courseCode: "CS201",
                branch: "CSE",
                credits: "4"
            },
            {
                courseName: "Database Management Systems",
                courseCode: "CS301",
                branch: "CSE",
                credits: "3"
            },
            {
                courseName: "Operating Systems",
                courseCode: "CS302",
                branch: "CSE",
                credits: "4"
            },
            {
                courseName: "Computer Networks",
                courseCode: "CS303",
                branch: "CSE",
                credits: "3"
            }
        ])

        console.log("Default Courses Added ✅🔥")
    }

})

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Backend Running ✅")
})

app.listen(5000, () => {
    console.log("Server running on port 5000 🔥")
})
app.post("/register", async (req, res) => {

    try {

        const { name, branch, username, password, role, rollNumber, adminId } = req.body

        // ✅ REQUIRED COMMON FIELDS
        if (!name || !branch || !username || !password || !role) {
            return res.status(400).json({ message: "Missing required fields ❌" })
        }

        // ✅ ROLE VALIDATION
        if (role === "student" && !rollNumber) {
            return res.status(400).json({ message: "Roll Number required ❌" })
        }

        if (role === "admin" && !adminId) {
            return res.status(400).json({ message: "Admin ID required ❌" })
        }
        // ✅ CHECK DUPLICATE USERNAME
const existingUsername = await User.findOne({
    username: { $regex: `^${username}$`, $options: "i" }
})

if (existingUsername) {
    return res.status(400).json({
        message: "Username already taken ❌"
    })
}
        // ✅ CHECK DUPLICATE ROLL NUMBER IN SAME BRANCH
        if (role === "student") {

            const existingStudent = await User.findOne({
            rollNumber,
            branch,
            role: "student"
        })

        if (existingStudent) {
            return res.status(400).json({
                message: "Roll Number already exists in this branch ❌"
            })
        }
        }
        const hashedPassword = await bcrypt.hash(password, 10)

const newUser = new User({
    ...req.body,
    password: hashedPassword
})

        await newUser.save()

        res.json({ message: "User Registered ✅" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: "User not found ❌" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials ❌" })
        }

        res.json({
            username: user.username,
            role: user.role 
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
// ✅ GET ALL COURSES
app.get("/courses", async (req, res) => {

    try {

        const courses = await Course.find()
        res.json(courses)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
// ✅ REGISTER COURSE
app.post("/register-course", async (req, res) => {

    try {

        const { username, courseName, courseCode, branch, credits,type } = req.body

        const newRegistration = new Registration({
            username,
            courseName,
            courseCode,
            branch,
            credits,
            type
        })

        await newRegistration.save()

        res.json({ message: "Course Registered ✅🔥" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
// ✅ GET REGISTERED COURSES
app.get("/my-courses/:username", async (req, res) => {

    try {

        const courses = await Registration.find({
            username: req.params.username
        })

        res.json(courses)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
// ✅ UNREGISTER COURSE
app.delete("/unregister-course", async (req, res) => {

    try {

        const { username, courseCode } = req.body

        await Registration.findOneAndDelete({
            username,
            courseCode
        })

        res.json({ message: "Course Unregistered ✅🔥" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
app.delete("/unregister-course/:username/:courseCode", async (req, res) => {

  const { username, courseCode } = req.params

  await Registration.deleteOne({ username, courseCode })

  res.json({ message: "Course Unregistered ✅" })
})
// ✅ GET USER PROFILE
app.get("/profile/:username", async (req, res) => {

    try {

        const user = await User.findOne({
            username: req.params.username
        })

        if (!user) {
            return res.status(404).json({ message: "User not found ❌" })
        }

        res.json(user)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
})
app.post("/courses", async (req, res) => {

    try {

        const course = new Course(req.body)
        await course.save()

        res.json({ message: "Course Added ✅🔥" })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
})
app.delete("/courses/:courseCode", async (req, res) => {

    try {

        const { courseCode } = req.params

        // ✅ Find affected students
        const registrations = await Registration.find({ courseCode })

        // ✅ Notify students 😈🔥
        for (let reg of registrations) {

            await Notification.create({
                username: reg.username,
                message: `Course ${reg.courseName} was removed by Admin 🚨`
            })
        }

        // ✅ Remove registrations
        await Registration.deleteMany({ courseCode })

        // ✅ Remove course
        await Course.deleteOne({ courseCode })

        res.json({ message: "Course Deleted ✅🔥" })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
})
app.get("/notifications/:username", async (req, res) => {

    const notes = await Notification.find({
        username: req.params.username
    })

    res.json(notes)
})
app.delete("/notifications/:username", async (req, res) => {

    await Notification.deleteMany({
        username: req.params.username
    })

    res.json({ message: "Cleared ✅" })
})
// ✅ ADD COURSE
app.post("/add-course", async (req, res) => {

  try {

    const { courseName, courseCode, branch, credits, type, description } = req.body

    const existingCourse = await Course.findOne({ courseCode })

    if (existingCourse) {
      return res.status(400).json({ message: "Course Already Exists ❌" })
    }

    const newCourse = new Course({
      courseName,
      courseCode,
      branch,
      credits,
      type,
      description
    })

    await newCourse.save()

    res.json({ message: "Course Added Successfully ✅🔥" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})
// ✅ DELETE COURSE
app.delete("/delete-course/:courseCode", async (req, res) => {

  try {

    const { courseCode } = req.params

    await Course.findOneAndDelete({ courseCode })

    res.json({ message: "Course Deleted ✅🔥" })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})
// ✅ GET ALL REGISTRATIONS (ADMIN)
app.get("/all-registrations", async (req, res) => {

  try {

    const registrations = await Registration.find()
    res.json(registrations)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})
// ✅ ADMIN REPORT SUMMARY 🔥
app.get("/admin-report", async (req, res) => {

  try {

    const totalStudents = await User.countDocuments({ role: "student" })
    const totalCourses = await Course.countDocuments()
    const totalRegistrations = await Registration.countDocuments()

    // ✅ MOST POPULAR COURSES 😈🔥
    const popularCourses = await Registration.aggregate([
      {
        $group: {
          _id: "$courseCode",
          count: { $sum: 1 },
          courseName: { $first: "$courseName" }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])

    res.json({
      totalStudents,
      totalCourses,
      totalRegistrations,
      popularCourses
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

})
