import React from 'react'
import { useStudents } from '../context/StudentContext'

function Courses() {
  const { students } = useStudents()

  const courseStats = {}
  students.forEach(student => {
    if (student.course) {
      if (!courseStats[student.course]) {
        courseStats[student.course] = {
          name: student.course,
          count: 0,
          students: [],
          grades: []
        }
      }
      courseStats[student.course].count++
      courseStats[student.course].students.push(student.name)
      if (student.grade) courseStats[student.course].grades.push(student.grade)
    }
  })

  const courses = Object.values(courseStats)

  const getAverageGrade = (grades) => {
    if (grades.length === 0) return 'N/A'
    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0 }
    let total = 0
    grades.forEach(g => {
      total += gradePoints[g] || 0
    })
    const avg = total / grades.length
    if (avg >= 3.7) return 'A'
    if (avg >= 3.3) return 'B+'
    if (avg >= 3.0) return 'B'
    if (avg >= 2.7) return 'B-'
    if (avg >= 2.3) return 'C+'
    if (avg >= 2.0) return 'C'
    if (avg >= 1.0) return 'D'
    return 'F'
  }

  // Colors for course cards
  const cardColors = [
    'from-indigo-500 to-violet-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-fuchsia-600'
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      
      {/* Header with gradient banner similar to Home page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[linear-gradient(105deg,#427c8c_0%,#63949f_40%,#d8b8a8_85%,#e5c7b5_100%)] text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-4 bottom-0 opacity-20 text-9xl select-none pointer-events-none">
            📚
          </div>
          <div className="z-10">
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
              Course Directory
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Active Courses
            </h1>
            <p className="text-gray-100 mt-2 text-sm max-w-lg leading-relaxed">
              Browse all active courses, view enrolled students, and track average grade performance.
            </p>
          </div>
          <div className="mt-6 z-10 flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl text-sm font-semibold">
              Total Courses: {courses.length}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl text-sm font-semibold">
              Students: {students.length}
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Course Health</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {courses.length > 0 ? `${(students.length / courses.length).toFixed(1)}` : '0'}
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Average students per course across all active subjects.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {courses.length} Active Courses
            </span>
            <span className="text-lg">🎯</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid - Same as Home page */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center text-xl mb-3">📚</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{courses.length}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Total Courses</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center text-xl mb-3">👨‍🎓</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {courses.reduce((sum, c) => sum + c.count, 0)}
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">Total Enrollments</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center text-xl mb-3">📊</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {courses.length > 0 ? (courses.reduce((sum, c) => sum + c.count, 0) / courses.length).toFixed(1) : '0'}
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">Avg per Course</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center text-xl mb-3">🏆</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {courses.length > 0 ? 
              courses.reduce((best, c) => {
                const avg = getAverageGrade(c.grades)
                if (avg === 'A' || avg === 'A+') return best + 1
                return best
              }, 0) 
              : '0'}
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">Top Performing</div>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-16 rounded-[2rem] text-center border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-sm font-medium">No active courses found.</p>
          <p className="text-gray-400 text-xs mt-1">Register students with courses first!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course, index) => (
            <div 
              key={course.name} 
              className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
            >
              <div className={`bg-gradient-to-r ${cardColors[index % cardColors.length]} p-6 text-white`}>
                <h3 className="text-lg font-bold tracking-tight">{course.name}</h3>
                <p className="text-xs opacity-80 mt-1">Total Enrolled: {course.count} Students</p>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Average Grade</span>
                  <span className={`font-bold text-base ${
                    getAverageGrade(course.grades) === 'A' || getAverageGrade(course.grades) === 'A+' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : getAverageGrade(course.grades) === 'F' 
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {getAverageGrade(course.grades)}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Enrolled Students</span>
                  <ul className="space-y-1.5">
                    {course.students.slice(0, 5).map((student, idx) => (
                      <li key={idx} className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> {student}
                      </li>
                    ))}
                    {course.students.length > 5 && (
                      <li className="text-xs text-indigo-500 font-semibold mt-1">+ {course.students.length - 5} more students</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Card - Similar to Home page charts section */}
      {courses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">📈 Course Performance Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-center">
              <p className="text-3xl font-extrabold text-indigo-600">{courses.length}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Total Courses</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-center">
              <p className="text-3xl font-extrabold text-emerald-600">{students.length}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Total Students</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-center">
              <p className="text-3xl font-extrabold text-purple-600">
                {courses.reduce((sum, c) => sum + c.count, 0)}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">Total Enrollments</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-center">
              <p className="text-3xl font-extrabold text-amber-600">
                {courses.length > 0 ? (courses.reduce((sum, c) => sum + c.count, 0) / courses.length).toFixed(1) : '0'}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">Avg per Course</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses