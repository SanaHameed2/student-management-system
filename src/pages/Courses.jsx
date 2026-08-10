import React from 'react'
import { useStudents } from '../context/StudentContext'

function Courses() {
  const { students } = useStudents()

  const courseStats = {}

  students.forEach((student) => {
    if (!student.course) return

    if (!courseStats[student.course]) {
      courseStats[student.course] = {
        name: student.course,
        students: [],
        grades: [],
      }
    }

    courseStats[student.course].students.push(student)

    if (student.grade) {
      courseStats[student.course].grades.push(student.grade)
    }
  })

  const courses = Object.values(courseStats)

  const gradePoints = {
    'A+': 4.0,
    A: 4.0,
    'A-': 3.7,
    'B+': 3.3,
    B: 3.0,
    'B-': 2.7,
    'C+': 2.3,
    C: 2.0,
    D: 1.0,
    F: 0,
  }

  const getAverageGrade = (grades) => {
    if (!grades.length) return 'N/A'

    const total = grades.reduce(
      (sum, grade) => sum + (gradePoints[grade] ?? 0),
      0
    )

    const average = total / grades.length

    if (average >= 3.7) return 'A'
    if (average >= 3.3) return 'B+'
    if (average >= 3.0) return 'B'
    if (average >= 2.7) return 'B-'
    if (average >= 2.3) return 'C+'
    if (average >= 2.0) return 'C'
    if (average >= 1.0) return 'D'

    return 'F'
  }

  const getGradeStyle = (grade) => {
    if (grade === 'A' || grade === 'A+') {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    }

    if (grade === 'B' || grade === 'B+') {
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    }

    if (grade === 'C' || grade === 'C+') {
      return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }

    if (grade === 'D' || grade === 'F') {
      return 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    }

    return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
  }

  const totalEnrollments = courses.reduce(
    (total, course) => total + course.students.length,
    0
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[linear-gradient(105deg,#427c8c_0%,#63949f_40%,#d8b8a8_85%,#e5c7b5_100%)] text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-6 bottom-0 opacity-20 text-9xl select-none pointer-events-none">
          📚
        </div>

        <div className="relative z-10">
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
            Course Directory
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Courses
          </h1>

          <p className="text-gray-100 mt-2 text-sm max-w-lg leading-relaxed">
            View active courses and their enrolled students.
          </p>
        </div>
      </div>

      {/* Simple Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-800 p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">
            Total Courses
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {courses.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">
            Total Students
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {students.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-[1.8rem] border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">
            Total Enrollments
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalEnrollments}
          </p>
        </div>

      </div>

      {/* Course Directory */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Course Directory
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {courses.length} active {courses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-xl mb-3">
              📚
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No courses found
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Add a course when registering a student.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Course
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Students
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Average Grade
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Enrolled Students
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">

                {courses.map((course) => {
                  const averageGrade = getAverageGrade(course.grades)

                  return (
                    <tr
                      key={course.name}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition"
                    >

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-[#e4eef0] dark:bg-[#29454e] text-[#477784] flex items-center justify-center">
                            📚
                          </div>

                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {course.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              Active course
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {course.students.length}
                        </span>

                        <span className="text-xs text-gray-400 ml-1">
                          {course.students.length === 1
                            ? 'student'
                            : 'students'}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getGradeStyle(
                            averageGrade
                          )}`}
                        >
                          {averageGrade}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2 max-w-md">
                          {course.students.map((student) => (
                            <span
                              key={student.id}
                              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300"
                            >
                              {student.name}
                            </span>
                          ))}
                        </div>
                      </td>

                    </tr>
                  )
                })}

              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  )
}

export default Courses