import { useEffect, useState } from "react"
import API from "../services/api"
import jsPDF from "jspdf"

function AdminReports() {

  const [report, setReport] = useState(null)

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {

    try {

      const res = await API.get("/admin-report")
      setReport(res.data)

    } catch (error) {

      alert("Failed to load reports ")

    }
  }

  // ✅ PRINT / DOWNLOAD PDF 😎🔥
  const handlePrint = () => {

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("SYSTEM REPORT", 20, 20)

    doc.setFontSize(12)
    doc.text(`Total Students: ${report.totalStudents}`, 20, 40)
    doc.text(`Total Courses: ${report.totalCourses}`, 20, 50)
    doc.text(`Total Registrations: ${report.totalRegistrations}`, 20, 60)

    doc.text("Most Popular Courses:", 20, 80)

    let yPosition = 90

    if (report.popularCourses.length === 0) {

      doc.text("No registrations available", 20, yPosition)

    } else {

      report.popularCourses.forEach(course => {

        doc.text(
          `${course.courseName} (${course._id}) - ${course.count} enrollments`,
          20,
          yPosition
        )

        yPosition += 10
      })
    }

    doc.save("System_Report.pdf")
  }

  if (!report) return <h2 style={{ color: "white" }}>Loading Reports...</h2>

  return (
    <div className="page-wrapper">

      <h1 className="page-title">System Reports</h1>

      <div className="white-box">

        <div className="report-grid">

          <div className="report-card">
            <h3>Total Students</h3>
            <p>{report.totalStudents}</p>
          </div>

          <div className="report-card">
            <h3>Total Courses</h3>
            <p>{report.totalCourses}</p>
          </div>

          <div className="report-card">
            <h3>Total Registrations</h3>
            <p>{report.totalRegistrations}</p>
          </div>

        </div>

        <h2 style={{ marginTop: "30px" }}>
          Most Popular Courses 
        </h2>

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Enrollments</th>
            </tr>
          </thead>

          <tbody>

            {report.popularCourses.length === 0 ? (
              <tr>
                <td colSpan="3">No registrations yet </td>
              </tr>
            ) : (
              report.popularCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseName}</td>
                  <td>{course._id}</td>
                  <td>{course.count}</td>
                </tr>
              ))
            )}

          </tbody>
        </table>

        {/* ✅ PRINT BUTTON 😎🔥 */}
        <button
          className="btn btn-success"
          style={{ marginTop: "25px" }}
          onClick={handlePrint}
        >
          Print / Download PDF 
        </button>

      </div>

    </div>
  )
}

export default AdminReports
