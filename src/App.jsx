import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import { DarkModeProvider } from './context/DarkModeContext'
import Home from './pages/Home'
import StudentList from './components/StudentList'
import Attendance from './components/Attendance'
import GradeCalculator from './components/GradeCalculator'
import Courses from './pages/Courses'
import Reports from './pages/Reports'
import './index.css'

function Sidebar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white'

  return (
    <aside className="w-20 flex flex-col items-center py-8 justify-between hidden md:flex shrink-0">
      <div className="flex flex-col items-center gap-8">
        {/* Logo Icon */}
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">
          ⚡
        </div>
        
        {/* Navigation Icons */}
        <nav className="flex flex-col gap-6 text-xl">
          <Link to="/" title="Overview" className={`p-3 rounded-2xl transition ${isActive('/')}`}>📊</Link>
          <Link to="/students" title="Students" className={`p-3 rounded-2xl transition ${isActive('/students')}`}>👨‍🎓</Link>
          <Link to="/attendance" title="Attendance" className={`p-3 rounded-2xl transition ${isActive('/attendance')}`}>📅</Link>
          <Link to="/courses" title="Courses" className={`p-3 rounded-2xl transition ${isActive('/courses')}`}>📚</Link>
          <Link to="/reports" title="Reports" className={`p-3 rounded-2xl transition ${isActive('/reports')}`}>📈</Link>
        </nav>
      </div>

      {/* User Profile Avatar at Bottom */}
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Profile" className="w-full h-full object-cover" />
      </div>
    </aside>
  )
}

function TopNav() {
  return (
    <header className="flex justify-between items-center mb-8 px-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
          ← Back
        </Link>
      </div>
      <nav className="flex gap-8 font-semibold text-sm tracking-wide text-gray-600 dark:text-gray-300">
        <Link to="/" className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 pb-1">DASHBOARD</Link>
        <Link to="/courses" className="hover:text-blue-600 transition">INSIGHTS</Link>
        <Link to="/reports" className="hover:text-blue-600 transition">CHANNELS</Link>
      </nav>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-xs font-bold text-gray-700">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        12 Active Members
      </div>
    </header>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <StudentProvider>
        <div className="min-h-screen p-3 md:p-6 flex justify-center items-center">
          <div className="w-full max-w-7xl flex bg-[#3B525C] rounded-[2rem] p-2 md:p-4 gap-4 shadow-2xl">
            
            {/* Left Vertical Sidebar */}
            <Sidebar />

            {/* Main Content Canvas Window */}
            <main className="dashboard-canvas flex-1 overflow-y-auto">
              <TopNav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/grade-calculator" element={<GradeCalculator />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>

          </div>
        </div>
      </StudentProvider>
    </DarkModeProvider>
  )
}

export default App