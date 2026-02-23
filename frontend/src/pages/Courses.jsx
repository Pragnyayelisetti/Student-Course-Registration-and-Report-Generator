import { useEffect, useState } from "react"
import API from "../services/api"

function Courses() {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses")
      setCourses(res.data)
    } catch (error) {
      alert("Failed to load courses")
    }
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">Available Courses</h1>

      <div className="white-box">

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Credits</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.type}</td>
                <td>{course.credits}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Courses
