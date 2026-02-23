import { useEffect, useState } from "react"
import API from "../services/api"

function Profile() {

  const username = localStorage.getItem("username")

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {

    try {

      const res = await API.get(`/profile/${username}`)
      setProfile(res.data)

    } catch (error) {

      alert("Failed to load profile ")

    }
  }

  if (!profile) {
    return <h2 style={{ color: "white" }}>Loading profile...</h2>
  }

  return (
    <div className="page-wrapper">

      <h1 className="page-title">My Profile</h1>

      <div className="white-box">

        <h2>{profile.name}</h2>

        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Branch:</strong> {profile.branch}</p>
        <p><strong>Roll Number:</strong> {profile.rollNumber}</p>

      </div>

    </div>
  )
}

export default Profile
