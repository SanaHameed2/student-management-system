import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="cursor-pointer">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              📚 Student Management System
            </h1>
            <p className="text-sm opacity-90 hidden sm:block">
              Manage student records easily
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Dashboard</Link>
            <Link to="/students" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Students</Link>
            <Link to="/attendance" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Attendance</Link>
            <Link to="/grade-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Grade Calculator</Link>
            <Link to="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Courses</Link>
            <Link to="/reports" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Reports</Link>
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex gap-3 items-center md:hidden">
            <DarkModeToggle />
            <button className="text-gray-800 dark:text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-3">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/students" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Students</Link>
              <Link to="/attendance" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Attendance</Link>
              <Link to="/grade-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Grade Calculator</Link>
              <Link to="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Courses</Link>
              <Link to="/reports" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition py-1" onClick={() => setMenuOpen(false)}>Reports</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar