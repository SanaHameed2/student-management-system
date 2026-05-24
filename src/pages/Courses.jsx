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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Courses</h2>

      {courses.length === 0 ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-500">No courses found. Add students with courses first!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                <h3 className="text-xl font-bold">{course.name}</h3>
                <p className="text-sm opacity-90">Total Students: {course.count}</p>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <span className="text-gray-600 dark:text-gray-400">Average Grade:</span>
                  <span className="ml-2 font-bold text-lg text-green-600 dark:text-green-400">
                    {getAverageGrade(course.grades)}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 dark:text-gray-400">Students Enrolled:</span>
                  <ul className="mt-2 space-y-1">
                    {course.students.slice(0, 5).map((student, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">• {student}</li>
                    ))}
                    {course.students.length > 5 && (
                      <li className="text-sm text-gray-500">+ {course.students.length - 5} more</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {courses.length > 0 && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Course Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{students.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {courses.reduce((sum, c) => sum + c.count, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Enrollments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {(courses.reduce((sum, c) => sum + c.count, 0) / courses.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average per Course</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses