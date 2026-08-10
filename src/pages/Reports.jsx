import React from 'react'
import { useStudents } from '../context/StudentContext'

function Reports() {
  const { students } = useStudents()

  const gradeDistribution = {
    'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'D': 0, 'F': 0
  }
  students.forEach(s => {
    if (s.grade && gradeDistribution[s.grade] !== undefined) {
      gradeDistribution[s.grade]++
    }
  })

  const courseDistribution = {}
  students.forEach(s => {
    if (s.course) {
      courseDistribution[s.course] = (courseDistribution[s.course] || 0) + 1
    }
  })

  const getPerformanceLevel = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'Excellent'
    if (grade === 'B+' || grade === 'B') return 'Good'
    if (grade === 'C+' || grade === 'C') return 'Average'
    if (grade === 'D') return 'Below Average'
    return 'Poor'
  }

  const getPerformanceColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-emerald-600 dark:text-emerald-400 font-semibold'
    if (grade === 'B+' || grade === 'B') return 'text-indigo-600 dark:text-indigo-400 font-semibold'
    if (grade === 'C+' || grade === 'C') return 'text-amber-600 dark:text-amber-400 font-semibold'
    return 'text-rose-600 dark:text-rose-400 font-semibold'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Reports & Analytics</h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-2xl shadow-sm">
          <p className="text-3xl font-extrabold">{students.length}</p>
          <p className="text-xs opacity-90 mt-1 uppercase tracking-wider font-medium">Total Students</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-sm">
          <p className="text-3xl font-extrabold">{Object.keys(courseDistribution).length}</p>
          <p className="text-xs opacity-90 mt-1 uppercase tracking-wider font-medium">Active Courses</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-5 rounded-2xl shadow-sm">
          <p className="text-3xl font-extrabold">
            {Object.values(gradeDistribution).filter(v => v > 0).length}
          </p>
          <p className="text-xs opacity-90 mt-1 uppercase tracking-wider font-medium">Grade Levels</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5 rounded-2xl shadow-sm">
          <p className="text-3xl font-extrabold">
            {students.filter(s => s.grade === 'A+' || s.grade === 'A').length}
          </p>
          <p className="text-xs opacity-90 mt-1 uppercase tracking-wider font-medium">Excellent Students</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-4">
          <h3 className="font-bold text-sm tracking-wide">Grade Distribution</h3>
        </div>
        <div className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-400 font-bold">
                <th className="pb-3 pl-2">Grade</th>
                <th className="pb-3">Students</th>
                <th className="pb-3">Percentage</th>
                <th className="pb-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {Object.entries(gradeDistribution).filter(([_, count]) => count > 0).map(([grade, count]) => (
                <tr key={grade} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                  <td className="py-3.5 pl-2 font-bold text-gray-900 dark:text-white">{grade}</td>
                  <td className="py-3.5 text-gray-700 dark:text-gray-300">{count}</td>
                  <td className="py-3.5 text-gray-700 dark:text-gray-300">{((count / (students.length || 1)) * 100).toFixed(1)}%</td>
                  <td className={`py-3.5 ${getPerformanceColor(grade)}`}>{getPerformanceLevel(grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-4">
          <h3 className="font-bold text-sm tracking-wide">Course Distribution</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(courseDistribution).map(([course, count]) => (
              <div key={course}>
                <div className="flex justify-between mb-1.5 text-xs font-semibold">
                  <span className="text-gray-700 dark:text-gray-300">{course}</span>
                  <span className="text-gray-400">{count} students</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(count / (students.length || 1)) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-4">
          <h3 className="font-bold text-sm tracking-wide">Student Performance Summary</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-400 font-bold">
                <th className="pb-3 pl-2">ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Grade</th>
                <th className="pb-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                  <td className="py-3.5 pl-2 font-semibold text-gray-500">#{student.id}</td>
                  <td className="py-3.5 font-bold text-gray-900 dark:text-white">{student.name}</td>
                  <td className="py-3.5 text-gray-600 dark:text-gray-300">{student.course || 'N/A'}</td>
                  <td className="py-3.5">
                    <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                      {student.grade || 'N/A'}
                    </span>
                  </td>
                  <td className={`py-3.5 ${getPerformanceColor(student.grade)}`}>
                    {student.grade ? getPerformanceLevel(student.grade) : 'N/A'}
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports