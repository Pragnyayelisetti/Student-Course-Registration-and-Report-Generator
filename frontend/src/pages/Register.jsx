import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [role, setRole] = useState("student")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    rollNumber: "",
    adminId: "",
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setErrorMsg("") // ✅ clear old errors when typing

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {

    // ✅ COMMON REQUIRED FIELDS
    if (!formData.name || !formData.branch || !formData.username || !formData.password) {
      setErrorMsg("Please fill all required fields ❌")
      return
    }

    // ✅ ROLE BASED VALIDATION
    if (role === "student" && !formData.rollNumber) {
      setErrorMsg("Roll Number required for Student ❌")
      return
    }

    if (role === "admin" && !formData.adminId) {
      setErrorMsg("Admin ID required for Admin ❌")
      return
    }

    try {

      setLoading(true)
      setErrorMsg("")

      const res = await API.post("/register", {
        ...formData,
        role
      })

      alert(res.data.message)  // ✅ Success message
      navigate("/")

    } catch (error) {

      const message =
        error.response?.data?.message || "Registration Failed ❌"

      setErrorMsg(message)

    } finally {
      setLoading(false)
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

        {/* ✅ ERROR MESSAGE DISPLAY */}
        {errorMsg && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {errorMsg}
          </p>
        )}

        <button
          className="btn btn-primary"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  )
}

export default Register