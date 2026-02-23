import { useEffect, useState } from "react"
import API from "../services/api"

function RegisterCourse() {

  const username = localStorage.getItem("username")

  const [courses, setCourses] = useState([])
  const [registeredCourses, setRegisteredCourses] = useState([])

  useEffect(() => {

    fetchCourses()
    fetchRegisteredCourses()

  }, [])

  // ✅ FETCH ALL COURSES
  const fetchCourses = async () => {

    try {

      const res = await API.get("/courses")
      setCourses(res.data)

    } catch (error) {

      alert("Failed to load courses ")

    }
  }

  // ✅ FETCH REGISTERED COURSES
  const fetchRegisteredCourses = async () => {

    try {

      const res = await API.get(`/my-courses/${username}`)
      setRegisteredCourses(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  // ✅ CALCULATIONS 😈🔥
  const totalCredits = registeredCourses.reduce(
    (sum, course) => sum + Number(course.credits),
    0
  )

  const labCount = registeredCourses.filter(
    (course) => course.type === "lab"
  ).length

  // ✅ CHECK IF COURSE REGISTERED
  const isRegistered = (courseCode) => {

    return registeredCourses.some(
      (course) => course.courseCode === courseCode
    )
  }

  // ✅ REGISTER COURSE (RULES ADDED 😈⚔️)
  const handleRegister = async (course) => {

    // ✅ RULE 1 → MAX SUBJECTS
    if (registeredCourses.length >= 8) {
      return alert("Maximum 8 subjects allowed ")
    }

    // ✅ RULE 2 → MAX CREDITS
    if (totalCredits + course.credits > 20) {
      return alert("Maximum 20 credits exceeded ")
    }

    // ✅ RULE 3 → LAB CONSTRAINT
    if (course.type === "lab" && labCount >= 3) {
      return alert("Only 3 lab courses allowed ")
    }

    try {

      await API.post("/register-course", {

        username,
        courseName: course.courseName,
        courseCode: course.courseCode,
        branch: course.branch,
        credits: course.credits,
        type: course.type   // ✅ IMPORTANT 🔥

      })

      fetchRegisteredCourses()

    } catch (error) {

      alert("Already Registered ")

    }
  }

  // ✅ UNREGISTER COURSE 😈🔥
  const handleUnregister = async (courseCode) => {

    try {

      await API.delete("/unregister-course", {
        data: {
          username,
          courseCode
        }
      })

      fetchRegisteredCourses()

    } catch (error) {

      alert("Unregister Failed ")

    }
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">
        Register Courses
      </h1>

      <div className="white-box">

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Branch</th>
              <th>Credits</th>
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

                <td>

                  {isRegistered(course.courseCode) ? (

                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnregister(course.courseCode)}
                    >
                      Unregister
                    </button>

                  ) : (

                    <button
                      className="btn btn-primary"
                      onClick={() => handleRegister(course)}
                    >
                      Register
                    </button>

                  )}

                </td>
              </tr>

            ))}

          </tbody>
        </table>

        {/* ✅ LIVE RULE DISPLAY 😈🔥 */}

        <h3 style={{ marginTop: "25px" }}>
          Subjects Selected: {registeredCourses.length} / 8
        </h3>

        <h3>
          Total Credits: {totalCredits} / 20
        </h3>

        <h3>
          Lab Courses: {labCount} / 3
        </h3>

      </div>

    </div>
  )
}

export default RegisterCourse
