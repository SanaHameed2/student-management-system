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
    if (grade === 'A+' || grade === 'A') return 'text-green-600'
    if (grade === 'B+' || grade === 'B') return 'text-blue-600'
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <p className="text-2xl font-bold">{students.length}</p>
          <p className="text-sm opacity-90">Total Students</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
          <p className="text-2xl font-bold">{Object.keys(courseDistribution).length}</p>
          <p className="text-sm opacity-90">Active Courses</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
          <p className="text-2xl font-bold">
            {Object.values(gradeDistribution).filter(v => v > 0).length}
          </p>
          <p className="text-sm opacity-90">Grade Levels</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <p className="text-2xl font-bold">
            {students.filter(s => s.grade === 'A+' || s.grade === 'A').length}
          </p>
          <p className="text-sm opacity-90">Excellent Students</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <div className="bg-gray-800 text-white p-4 rounded-t-lg">
          <h3 className="font-bold">Grade Distribution</h3>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Grade</th>
                <th className="text-left p-2">Students</th>
                <th className="text-left p-2">Percentage</th>
                <th className="text-left p-2">Performance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gradeDistribution).filter(([_, count]) => count > 0).map(([grade, count]) => (
                <tr key={grade} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-2 font-bold">{grade}</td>
                  <td className="p-2">{count}</td>
                  <td className="p-2">{((count / students.length) * 100).toFixed(1)}%</td>
                  <td className={`p-2 ${getPerformanceColor(grade)}`}>{getPerformanceLevel(grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <div className="bg-gray-800 text-white p-4 rounded-t-lg">
          <h3 className="font-bold">Course Distribution</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {Object.entries(courseDistribution).map(([course, count]) => (
              <div key={course}>
                <div className="flex justify-between mb-1">
                  <span>{course}</span>
                  <span>{count} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(count / students.length) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="bg-gray-800 text-white p-4 rounded-t-lg">
          <h3 className="font-bold">Student Performance Summary</h3>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Course</th>
                <th className="text-left p-2">Grade</th>
                <th className="text-left p-2">Performance</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-2">{student.id}</td>
                  <td className="p-2 font-medium">{student.name}</td>
                  <td className="p-2">{student.course || 'N/A'}</td>
                  <td className="p-2">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      {student.grade || 'N/A'}
                    </span>
                  </td>
                  <td className={`p-2 ${getPerformanceColor(student.grade)}`}>
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