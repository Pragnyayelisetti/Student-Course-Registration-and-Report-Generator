import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"
import StudentDashboard from "./pages/StudentDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Courses from "./pages/Courses"
import RegisterCourse from "./pages/RegisterCourse"
import AcademicReport from "./pages/AcademicReport"
import ManageCourses from "./pages/ManageCourses"   // ✅ ADD THIS
import AdminRegistrations from "./pages/AdminRegistrations"
import AdminReports from "./pages/AdminReports"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/register-course" element={<RegisterCourse />} />
      <Route path="/report" element={<AcademicReport />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
      <Route path="/admin-registrations" element={<AdminRegistrations />} />
      <Route path="/admin-reports" element={<AdminReports />} />
    </Routes>
  )
}

export default App
