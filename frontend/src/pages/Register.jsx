import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [role, setRole] = useState("student")

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    rollNumber: "",
    adminId: "",
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {

  // ✅ COMMON REQUIRED FIELDS
  if (!formData.name || !formData.branch || !formData.username || !formData.password) {
    alert("Please fill all required fields ")
    return
  }

  // ✅ ROLE BASED VALIDATION
  if (role === "student" && !formData.rollNumber) {
    alert("Roll Number required for Student ")
    return
  }

  if (role === "admin" && !formData.adminId) {
    alert("Admin ID required for Admin ")
    return
  }

  try {

    await API.post("/register", {
      ...formData,
      role
    })

    alert("Registration Successful ")
    navigate("/")

  } catch (error) {
    alert("Registration Failed ")
  }
}


  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Register</h2>

        {/* ROLE SELECT */}

        <div className="form-group">
          <label>Role</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* COMMON FIELDS */}

        <div className="form-group">
          <label>Name</label>
          <input name="name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Branch</label>
          <input name="branch" onChange={handleChange} />
        </div>

        {/* CONDITIONAL FIELDS */}

        {role === "student" && (
          <div className="form-group">
            <label>Roll Number</label>
            <input name="rollNumber" onChange={handleChange} />
          </div>
        )}

        {role === "admin" && (
          <div className="form-group">
            <label>Admin ID</label>
            <input name="adminId" onChange={handleChange} />
          </div>
        )}

        {/* LOGIN CREDENTIALS */}

        <div className="form-group">
          <label>Username</label>
          <input name="username" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />
        </div>

        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  )
}

export default Register
