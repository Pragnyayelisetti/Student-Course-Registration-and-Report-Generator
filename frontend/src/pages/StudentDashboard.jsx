import { useNavigate } from "react-router-dom"
import { useEffect } from "react"        // ✅ REQUIRED
import API from "../services/api"        // ✅ REQUIRED

function StudentDashboard() {

  const navigate = useNavigate()

  useEffect(() => {
    checkNotifications()
  }, [])

  const checkNotifications = async () => {

    const username = localStorage.getItem("username")

    try {

      const res = await API.get(`/notifications/${username}`)

      if (res.data.length > 0) {

        res.data.forEach(note =>
          alert(note.message)   // 🚨🔥 ALERT
        )

        await API.delete(`/notifications/${username}`)
      }

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Student Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome back 👋 Manage your academic activities
      </p>

      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => navigate("/courses")}
        >
          <h3>View Courses</h3>
          <p>Browse available subjects & details</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/register-course")}
        >
          <h3>Register Courses</h3>
          <p>Add or drop your subjects</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/report")}
        >
          <h3>Academic Report</h3>
          <p>View & download registration summary</p>
        </div>

      </div>

      <button
        className="btn btn-danger"
        style={{ marginTop: "40px" }}
        onClick={() => navigate("/")}
      >
        Logout
      </button>

    </div>
  )
}

export default StudentDashboard
