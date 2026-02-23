import { useEffect, useState } from "react"
import API from "../services/api"

function AdminRegistrations() {

  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {

    try {

      const res = await API.get("/all-registrations")
      setRegistrations(res.data)

    } catch (error) {

      alert("Failed to load registrations ")

    }
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">
        Student Registrations
      </h1>

      <div className="white-box">

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Branch</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>

            {registrations.length === 0 ? (

              <tr>
                <td colSpan="5">No Registrations Found </td>
              </tr>

            ) : (

              registrations.map((reg, index) => (

                <tr key={index}>
                  <td>{reg.username}</td>
                  <td>{reg.courseName}</td>
                  <td>{reg.courseCode}</td>
                  <td>{reg.branch}</td>
                  <td>{reg.credits}</td>
                </tr>

              ))

            )}

          </tbody>
        </table>

      </div>

    </div>
  )
}

export default AdminRegistrations
