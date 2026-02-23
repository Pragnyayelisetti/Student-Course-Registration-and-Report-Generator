import { useNavigate } from "react-router-dom"

function AdminDashboard() {

  const navigate = useNavigate()

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome Admin 👋 Manage system & academic data
      </p>

      <div className="dashboard-cards">

        {/* MANAGE COURSES */}

        <div 
          className="dashboard-card"
          onClick={() => navigate("/manage-courses")}
        >
          <h3>Manage Courses</h3>
          <p>Add, update, or remove subjects</p>
        </div>

        {/* STUDENT REGISTRATIONS */}

        <div 
          className="dashboard-card"
          onClick={() => navigate("/admin-registrations")}
        >
          <h3>Registrations</h3>
          <p>Monitor student enrollments</p>
        </div>

        {/* GENERATE REPORTS */}

        <div 
          className="dashboard-card"
          onClick={() => navigate("/admin-reports")}
        >
          <h3>Generate Reports</h3>
          <p>View academic & system reports</p>
        </div>


      </div>

      {/* LOGOUT */}

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

export default AdminDashboard
