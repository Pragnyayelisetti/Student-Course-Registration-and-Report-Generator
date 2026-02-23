import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { BrowserRouter } from "react-router-dom"   // ✅ REQUIRED

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>     {/* ✅ THIS IS CRITICAL */}
    <App />
  </BrowserRouter>
)
