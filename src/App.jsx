import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import { DarkModeProvider } from './context/DarkModeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import StudentList from './components/StudentList'
import './index.css'

function App() {
  return (
    <DarkModeProvider>
      <StudentProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<StudentList />} />
            </Routes>
          </div>
        </div>
      </StudentProvider>
    </DarkModeProvider>
  )
}

export default App