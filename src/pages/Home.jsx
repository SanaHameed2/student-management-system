import React from 'react'
import { useStudents } from '../context/StudentContext'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Home() {
  const { students } = useStudents()
  const navigate = useNavigate()

  // Course distribution data
  const courseData = []
  const courseCount = {}
  students.forEach(s => {
    if (s.course) {
      courseCount[s.course] = (courseCount[s.course] || 0) + 1
    }
  })
  for (let course in courseCount) {
    courseData.push({ name: course, value: courseCount[course] })
  }

  // Grade distribution data
  const gradeData = []
  const gradeCount = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 }
  students.forEach(s => {
    if (s.grade && gradeCount[s.grade] !== undefined) {
      gradeCount[s.grade]++
    }
  })
  for (let grade in gradeCount) {
    if (gradeCount[grade] > 0) {
      gradeData.push({ name: grade, count: gradeCount[grade] })
    }
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE']

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Student Management System! 🎓</h1>
        <p className="text-lg">Manage your students, courses, attendance, and grades all in one place.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">👨‍🎓</div>
          <h3 className="font-bold text-lg mb-2">Total Students</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{students.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="font-bold text-lg mb-2">Active Courses</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{courseData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">🎓</div>
          <h3 className="font-bold text-lg mb-2">Avg. Grade</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">A-</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="font-bold text-lg mb-2">Attendance Rate</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">92%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-center">Course Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={courseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {courseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-center">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <button onClick={() => navigate('/students')} className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition">
          ➕ Add Student
        </button>
        <button onClick={() => navigate('/attendance')} className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition">
          📅 Take Attendance
        </button>
        <button onClick={() => navigate('/grade-calculator')} className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition">
          🎓 Grade Calculator
        </button>
        <button onClick={() => navigate('/profile')} className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition">
          👤 Student Profile
        </button>
      </div>
    </div>
  )
}

export default Home