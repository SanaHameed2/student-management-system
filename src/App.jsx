import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import StudentList from './components/StudentList'
import './index.css'

function App() {
  return (
    <StudentProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </div>
      </div>
    </StudentProvider>
  )
}

export default App