import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectDashboard from './components/ProjectDashboard.jsx'
import Canvas from './components/Canvas.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<ProjectDashboard />} />
        <Route path="/project/:id" element={<Canvas />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App