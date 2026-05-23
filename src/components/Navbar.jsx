import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
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

          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-indigo-200 transition">Dashboard</Link>
            <Link to="/students" className="hover:text-indigo-200 transition">Students</Link>
            <button className="hover:text-indigo-200 transition">Courses</button>
            <button className="hover:text-indigo-200 transition">Attendance</button>
            <button className="hover:text-indigo-200 transition">Reports</button>
          </div>

          <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-indigo-500">
            <div className="flex flex-col gap-3">
              <Link to="/" className="hover:text-indigo-200 transition py-1" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/students" className="hover:text-indigo-200 transition py-1" onClick={() => setMenuOpen(false)}>Students</Link>
              <button className="hover:text-indigo-200 transition py-1 text-left">Courses</button>
              <button className="hover:text-indigo-200 transition py-1 text-left">Attendance</button>
              <button className="hover:text-indigo-200 transition py-1 text-left">Reports</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar