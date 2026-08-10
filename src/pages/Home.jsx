import React from 'react'
import { useStudents } from '../context/StudentContext'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

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

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      
      {/* Top Banner / Hero Widget with Exact Dual-Tone Gradient */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Banner Card */}
        <div className="lg:col-span-2 bg-[linear-gradient(105deg,#427c8c_0%,#63949f_40%,#d8b8a8_85%,#e5c7b5_100%)] text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-4 bottom-0 opacity-20 text-9xl select-none pointer-events-none">
            🎓
          </div>
          <div className="z-10">
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
              Overview Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Student Management Dashboard
            </h1>
            <p className="text-gray-100 mt-2 text-sm max-w-lg leading-relaxed">
              Monitor active student metrics, track academic performance, and manage institutional records seamlessly.
            </p>
          </div>
          
          <div className="mt-6 z-10 flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/students')} 
              className="bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-xl shadow hover:bg-gray-100 transition text-sm"
            >
              Manage Students →
            </button>
            <button 
              onClick={() => navigate('/attendance')} 
              className="bg-black/20 hover:bg-black/30 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm backdrop-blur-sm"
            >
              Take Attendance
            </button>
          </div>
        </div>

        {/* Popularity / Metric Card */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">System Health</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
              98.2%
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Overall platform stability and record accuracy based on latest updates.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Sync Status: Optimal</span>
            <span className="text-lg">⚡</span>
          </div>
        </div>

      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xl mb-3">👨‍🎓</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{students.length}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Total Students</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center text-xl mb-3">📚</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{courseData.length}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Active Courses</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center text-xl mb-3">🎓</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">A-</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Average Grade</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center text-xl mb-3">📊</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">92%</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Attendance Rate</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Course Distribution Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-800 dark:text-white mb-4">
            Course Distribution
          </h3>
          {courseData.length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-sm">
              No course data available. Add students with courses first.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie 
                  data={courseData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={85} 
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

        {/* Grade Distribution Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-800 dark:text-white mb-4">
            Grade Distribution
          </h3>
          {gradeData.length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-sm">
              No grade data available. Add grades to students first.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={gradeData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

    </div>
  )
}

export default Home