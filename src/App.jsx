import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import { DarkModeProvider } from './context/DarkModeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import StudentList from './components/StudentList'
import Attendance from './components/Attendance'
import GradeCalculator from './components/GradeCalculator'
import Courses from './pages/Courses'
import Reports from './pages/Reports'
import './index.css'

function App() {
  return (
    <DarkModeProvider>
      <StudentProvider>
        <div className="min-h-screen bg-[#eef3f4] dark:bg-[#111d22]">

          <Navbar />

          <main className="lg:ml-[235px] min-h-screen w-auto">
            <div className="w-full max-w-[1450px] mx-auto px-5 py-6 sm:px-7 lg:px-9">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route
                  path="/grade-calculator"
                  element={<GradeCalculator />}
                />
                <Route path="/courses" element={<Courses />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </div>
          </main>

        </div>
      </StudentProvider>
    </DarkModeProvider>
  )
}

export default App