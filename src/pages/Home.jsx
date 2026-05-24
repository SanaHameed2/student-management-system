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

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Student Management Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage students, courses, attendance, and grades efficiently
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
        <div className="stat-card">
          <div className="text-3xl mb-2">👨‍🎓</div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{students.length}</div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl md:text-3xl font-bold text-green-600">{courseData.length}</div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Active Courses</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl mb-2">🎓</div>
          <div className="text-2xl md:text-3xl font-bold text-purple-600">A-</div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Average Grade</div>
        </div>
        <div className="stat-card">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl md:text-3xl font-bold text-orange-600">92%</div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Attendance Rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <button 
          onClick={() => navigate('/students')} 
          className="btn-primary w-full"
        >
          Manage Students
        </button>
        <button 
          onClick={() => navigate('/attendance')} 
          className="btn-outline w-full"
        >
          Take Attendance
        </button>
        <button 
          onClick={() => navigate('/grade-calculator')} 
          className="btn-outline w-full"
        >
          Grade Calculator
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Course Distribution
          </h3>
          {courseData.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No course data available. Add students with courses first.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie 
                  data={courseData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={90} 
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Grade Distribution
          </h3>
          {gradeData.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No grade data available. Add grades to students first.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={gradeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home