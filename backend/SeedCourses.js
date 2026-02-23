const mongoose = require("mongoose")
const Course = require("./models/Course")

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")

const courses = [

  {
    courseName: "Data Structures",
    courseCode: "CS201",
    branch: "CSE",
    credits: 4,
    type: "theory",
    description: "Fundamentals of data organization & algorithms"
  },

  {
    courseName: "Operating Systems",
    courseCode: "CS302",
    branch: "CSE",
    credits: 4,
    type: "theory",
    description: "Process management, memory, scheduling"
  },

  {
    courseName: "DBMS",
    courseCode: "CS301",
    branch: "CSE",
    credits: 3,
    type: "theory",
    description: "Database design & SQL"
  },

  {
    courseName: "Computer Networks",
    courseCode: "CS303",
    branch: "CSE",
    credits: 3,
    type: "theory",
    description: "Network protocols & communication"
  },

  // ✅ LABS
  {
    courseName: "Data Structures Lab",
    courseCode: "CS251",
    branch: "CSE",
    credits: 2,
    type: "lab",
    description: "Practical implementation of DS"
  },

  {
    courseName: "OS Lab",
    courseCode: "CS352",
    branch: "CSE",
    credits: 2,
    type: "lab",
    description: "OS simulations & experiments"
  },

  {
    courseName: "Networks Lab",
    courseCode: "CS353",
    branch: "CSE",
    credits: 2,
    type: "lab",
    description: "Packet analysis & networking tools"
  }
]

async function seed() {

  await Course.deleteMany()
  await Course.insertMany(courses)

  console.log("Courses Seeded")
  mongoose.connection.close()
}

seed()
