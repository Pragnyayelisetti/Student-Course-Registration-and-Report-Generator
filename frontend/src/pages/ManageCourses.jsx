import { useEffect, useState } from "react"
import API from "../services/api"

function ManageCourses() {

  const [courses, setCourses] = useState([])

  const [courseName, setCourseName] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [branch, setBranch] = useState("")
  const [credits, setCredits] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("theory")   // ✅ theory / lab

  useEffect(() => {
    fetchCourses()
  }, [])

  // ✅ FETCH COURSES
  const fetchCourses = async () => {

    try {
      const res = await API.get("/courses")
      setCourses(res.data)
    } catch (error) {
      alert("Failed to load courses ❌")
    }
  }

  // ✅ ADD COURSE
  const handleAddCourse = async () => {

    if (!courseName || !courseCode || !branch || !credits) {
      alert("Fill all fields")
      return
    }

    try {

      await API.post("/add-course", {
        courseName,
        courseCode,
        branch,
        credits,
        description,
        type
      })

      alert("Course Added")

      // ✅ CLEAR FORM
      setCourseName("")
      setCourseCode("")
      setBranch("")
      setCredits("")
      setDescription("")
      setType("theory")

      fetchCourses()

    } catch (error) {

      alert("Course Already Exists ")

    }
  }

  // ✅ DELETE COURSE 😈🔥
  const handleDeleteCourse = async (courseCode) => {

    try {

      await API.delete(`/courses/${courseCode}`)

      alert("Course Deleted ")

      fetchCourses()

    } catch (error) {

      alert("Delete Failed ")

    }
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">Manage Courses</h1>

      <div className="white-box">

        {/* ✅ ADD COURSE FORM */}

        <h2>Add New Course</h2>

        <div className="form-grid">

          <input
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <input
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />

          <input
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />

          <input
            placeholder="Credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
          </select>

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: "15px" }}
          onClick={handleAddCourse}
        >
          Add Course
        </button>

      </div>

      {/* ✅ COURSE TABLE */}

      <div className="white-box" style={{ marginTop: "30px" }}>

        <h2>All Courses</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Branch</th>
              <th>Credits</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {courses.map((course, index) => (

              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.branch}</td>
                <td>{course.credits}</td>
                <td>{course.type}</td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCourse(course.courseCode)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

            ))}

          </tbody>
        </table>

      </div>

    </div>
  )
}

export default ManageCourses
