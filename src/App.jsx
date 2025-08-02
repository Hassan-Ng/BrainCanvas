import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectDashboard from './components/ProjectDashboard.jsx'
import Canvas from './components/Canvas.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<PrivateRoute><ProjectDashboard /></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><Canvas /></PrivateRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App