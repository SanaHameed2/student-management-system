import React from 'react'

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Student Management System! 🎓</h1>
        <p className="text-lg">Manage your students, courses, attendance, and grades all in one place.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">👨‍🎓</div>
          <h3 className="font-bold text-lg mb-2">Total Students</h3>
          <p className="text-2xl font-bold text-indigo-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="font-bold text-lg mb-2">Active Courses</h3>
          <p className="text-2xl font-bold text-indigo-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="font-bold text-lg mb-2">Attendance Rate</h3>
          <p className="text-2xl font-bold text-indigo-600">92%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            ➕ Add New Student
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            📊 View Reports
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
            📅 Take Attendance
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home