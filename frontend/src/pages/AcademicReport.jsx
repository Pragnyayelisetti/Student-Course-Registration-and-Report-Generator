import { useEffect, useState } from "react"
import API from "../services/api"
import jsPDF from "jspdf"

function AcademicReport() {

  const username = localStorage.getItem("username")

  const [courses, setCourses] = useState([])
  const [totalCredits, setTotalCredits] = useState(0)

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {

    try {

      const res = await API.get(`/my-courses/${username}`)

      setCourses(res.data)

      const credits = res.data.reduce(
        (sum, course) => sum + Number(course.credits),
        0
      )

      setTotalCredits(credits)

    } catch (error) {

      alert("Failed to load report ❌")

    }
  }

  // ✅ PDF DOWNLOAD ONLY 🔥🔥🔥
  const handleDownload = () => {

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("STUDENT ACADEMIC REPORT", 20, 20)

    doc.setFontSize(12)
    doc.text(`Name: ${username}`, 20, 35)

    doc.text("Registered Subjects:", 20, 50)

    let yPosition = 60

    courses.forEach((course) => {
      doc.text(
        `${course.courseName} (${course.courseCode}) - ${course.credits} credits`,
        20,
        yPosition
      )
      yPosition += 10
    })

    doc.text(`Total Credits: ${totalCredits}`, 20, yPosition + 10)

    doc.save("Academic_Report.pdf")
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">Academic Report</h1>

      <div className="white-box">

        <h2 style={{ marginBottom: "10px" }}>
          Student: {username}
        </h2>

        <p style={{ marginBottom: "20px" }}>
          Total Subjects: {courses.length}
        </p>

        <p style={{ marginBottom: "25px", fontWeight: "600" }}>
          Total Credits: {totalCredits}
        </p>

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Branch</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>

            {courses.map((course, index) => (

              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.branch}</td>
                <td>{course.credits}</td>
              </tr>

            ))}

          </tbody>
        </table>

        <button
          className="btn btn-success"
          style={{ marginTop: "25px" }}
          onClick={handleDownload}
        >
          Download Report 
        </button>

      </div>

    </div>
  )
}

export default AcademicReport
