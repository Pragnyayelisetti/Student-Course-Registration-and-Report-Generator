import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const res = await API.post("/login", {
        username,
        password
      })

      const user = res.data

      // ✅ STORE USER SESSION 🔥
      localStorage.setItem("username", user.username)

      if (user.role === "admin") {
        navigate("/admin")
      } 
      else {
        navigate("/student")
      }

    } catch (error) {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="login-container">

      <div className="login-box">
        <h2>Login</h2>

        <div className="form-group">
          <label>Username</label>
          <input 
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* ✅ REGISTER LINK */}

        <p style={{ marginTop: "15px", fontWeight: "500" }}>
          New User?{" "}
          <span 
            style={{ 
              color: "#1f3c88",
              cursor: "pointer",
              fontWeight: "600"
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  )
}

export default Login
