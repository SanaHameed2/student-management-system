import React from 'react'
import { useStudents } from '../context/StudentContext'

function Reports() {
  const { students } = useStudents()

  const gradeDistribution = {
    'A+': 0,
    A: 0,
    'B+': 0,
    B: 0,
    'C+': 0,
    C: 0,
    D: 0,
    F: 0,
  }

  students.forEach((student) => {
    if (
      student.grade &&
      gradeDistribution[student.grade] !== undefined
    ) {
      gradeDistribution[student.grade]++
    }
  })

  const courseDistribution = {}

  students.forEach((student) => {
    if (student.course) {
      courseDistribution[student.course] =
        (courseDistribution[student.course] || 0) + 1
    }
  })

  const getPerformanceLevel = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'Excellent'
    if (grade === 'B+' || grade === 'B') return 'Good'
    if (grade === 'C+' || grade === 'C') return 'Average'
    if (grade === 'D') return 'Below Average'
    return 'Poor'
  }

  const getPerformanceClass = (grade) => {
    if (grade === 'A+' || grade === 'A') {
      return 'bg-[#e5f2ec] text-[#4e8a70]'
    }

    if (grade === 'B+' || grade === 'B') {
      return 'bg-[#e3eff2] text-[#4b8290]'
    }

    if (grade === 'C+' || grade === 'C') {
      return 'bg-[#f7eadf] text-[#b47b5e]'
    }

    return 'bg-[#f5e4e3] text-[#b46d69]'
  }

  const excellentStudents = students.filter(
    (student) =>
      student.grade === 'A+' || student.grade === 'A'
  ).length

  const activeGradeLevels = Object.values(
    gradeDistribution
  ).filter((value) => value > 0).length

  const totalStudents = students.length

  return (
    <div className="space-y-6">

      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

        <div>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#4d8998] dark:text-[#86b9c1]">
            Analytics
          </p>

          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-[#263b43] dark:text-white">
            Reports & Analytics
          </h1>

          <p className="mt-1 text-sm text-[#789099] dark:text-gray-400">
            Understand student performance and academic distribution.
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#1b292f] px-4 py-2.5 text-xs text-[#708187] dark:text-gray-300 shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-[#5b9a78] mr-2" />
          Live student data
        </div>
      </div>

      {/* =========================================
          SUMMARY CARDS
      ========================================= */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total students */}
        <div className="rounded-[22px] bg-[#4b8493] p-5 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight">
                {totalStudents}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/65">
                Total students
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              👥
            </div>
          </div>

          <p className="mt-5 text-[10px] text-white/55">
            All registered students
          </p>
        </div>

        {/* Courses */}
        <div className="rounded-[22px] bg-[#62a99a] p-5 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight">
                {Object.keys(courseDistribution).length}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/65">
                Active courses
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              📚
            </div>
          </div>

          <p className="mt-5 text-[10px] text-white/55">
            Courses with enrolled students
          </p>
        </div>

        {/* Grade levels */}
        <div className="rounded-[22px] bg-[#9b72d7] p-5 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight">
                {activeGradeLevels}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/65">
                Grade levels
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              🎓
            </div>
          </div>

          <p className="mt-5 text-[10px] text-white/55">
            Grades currently recorded
          </p>
        </div>

        {/* Excellent */}
        <div className="rounded-[22px] bg-[#e9a16d] p-5 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-semibold tracking-tight">
                {excellentStudents}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-white/65">
                Excellent students
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              ★
            </div>
          </div>

          <p className="mt-5 text-[10px] text-white/55">
            Students with A or A+
          </p>
        </div>
      </div>

      {/* =========================================
          GRADE DISTRIBUTION
      ========================================= */}
      <section className="rounded-[24px] bg-white dark:bg-[#1b292f] shadow-[0_8px_30px_rgba(50,80,90,0.05)] overflow-hidden">

        <div className="px-6 py-5 border-b border-[#edf1f2] dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          <div>
            <h2 className="text-sm font-semibold text-[#263b43] dark:text-white">
              Grade distribution
            </h2>

            <p className="mt-1 text-[10px] text-[#98a7ab]">
              Student count and performance by grade
            </p>
          </div>

          <div className="text-xs text-[#8c9a9e]">
            {totalStudents} students
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">

            <thead>
              <tr className="border-b border-[#edf1f2] dark:border-white/5">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Grade
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Students
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Percentage
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(gradeDistribution)
                .filter(([, count]) => count > 0)
                .map(([grade, count]) => (
                  <tr
                    key={grade}
                    className="border-b last:border-0 border-[#edf1f2] dark:border-white/5 hover:bg-[#f8faf9] dark:hover:bg-white/[0.02] transition"
                  >
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#e5eff1] dark:bg-[#294149] text-[#4b8493] flex items-center justify-center text-xs font-semibold">
                          {grade}
                        </span>

                        <span className="text-xs font-semibold text-[#354950] dark:text-white">
                          Grade {grade}
                        </span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-[#5e7076] dark:text-gray-300">
                      {count}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#5e7076] dark:text-gray-300">
                      {(
                        (count / (totalStudents || 1)) *
                        100
                      ).toFixed(1)}
                      %
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${getPerformanceClass(
                          grade
                        )}`}
                      >
                        {getPerformanceLevel(grade)}
                      </span>
                    </td>
                  </tr>
                ))}

              {Object.values(gradeDistribution).every(
                (count) => count === 0
              ) && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center text-xs text-[#9aa7aa]"
                  >
                    No grade data available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================
          COURSE DISTRIBUTION
      ========================================= */}
      <section className="rounded-[24px] bg-white dark:bg-[#1b292f] p-6 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

          <div>
            <h2 className="text-sm font-semibold text-[#263b43] dark:text-white">
              Course distribution
            </h2>

            <p className="mt-1 text-[10px] text-[#98a7ab]">
              Number of students enrolled in each course
            </p>
          </div>

          <span className="text-[10px] text-[#98a7ab]">
            {Object.keys(courseDistribution).length} courses
          </span>
        </div>

        {Object.keys(courseDistribution).length === 0 ? (
          <div className="py-12 text-center text-xs text-[#9aa7aa]">
            No course data available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

            {Object.entries(courseDistribution).map(
              ([course, count]) => {

                const percentage =
                  (count / (totalStudents || 1)) * 100

                return (
                  <div key={course}>

                    <div className="flex items-center justify-between mb-2">

                      <span className="text-xs font-semibold text-[#4a5e64] dark:text-gray-300 truncate pr-4">
                        {course}
                      </span>

                      <span className="text-[10px] text-[#98a7ab] whitespace-nowrap">
                        {count} students
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-[#edf1f2] dark:bg-[#29393f] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#5c98a4] transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="mt-1.5 text-[9px] text-[#a1adaf]">
                      {percentage.toFixed(1)}% of students
                    </p>

                  </div>
                )
              }
            )}
          </div>
        )}
      </section>

      {/* =========================================
          STUDENT PERFORMANCE
      ========================================= */}
      <section className="rounded-[24px] bg-white dark:bg-[#1b292f] shadow-[0_8px_30px_rgba(50,80,90,0.05)] overflow-hidden">

        <div className="px-6 py-5 border-b border-[#edf1f2] dark:border-white/5">

          <h2 className="text-sm font-semibold text-[#263b43] dark:text-white">
            Student performance
          </h2>

          <p className="mt-1 text-[10px] text-[#98a7ab]">
            Individual academic performance overview
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px] text-left">

            <thead>
              <tr className="border-b border-[#edf1f2] dark:border-white/5">

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Student
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  ID
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Course
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Grade
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Performance
                </th>

              </tr>
            </thead>

            <tbody>

              {students.map((student, index) => {

                const initials =
                  `${student.name?.charAt(0) || 'S'}${
                    student.name
                      ?.split(' ')[1]
                      ?.charAt(0) || ''
                  }`.toUpperCase()

                return (
                  <tr
                    key={student.id || index}
                    className="border-b last:border-0 border-[#edf1f2] dark:border-white/5 hover:bg-[#f8faf9] dark:hover:bg-white/[0.02] transition"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                            index % 3 === 0
                              ? 'bg-[#f1c9b5] text-[#785b4d]'
                              : index % 3 === 1
                              ? 'bg-[#dcecef] text-[#477784]'
                              : 'bg-[#e8e1eb] text-[#75657d]'
                          }`}
                        >
                          {initials}
                        </div>

                        <span className="text-xs font-semibold text-[#354950] dark:text-white">
                          {student.name || 'Unnamed Student'}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-xs text-[#87979b]">
                      #{student.id}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#617278] dark:text-gray-300">
                      {student.course || 'N/A'}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex min-w-[34px] justify-center rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${
                          student.grade
                            ? getPerformanceClass(
                                student.grade
                              )
                            : 'bg-[#f1f3f3] text-[#8b989b]'
                        }`}
                      >
                        {student.grade || 'N/A'}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      {student.grade ? (
                        <span
                          className={`text-xs font-semibold ${
                            student.grade === 'A+' ||
                            student.grade === 'A'
                              ? 'text-[#579176]'
                              : student.grade === 'B+' ||
                                student.grade === 'B'
                              ? 'text-[#4d8998]'
                              : student.grade === 'C+' ||
                                student.grade === 'C'
                              ? 'text-[#b17b5d]'
                              : 'text-[#b56e69]'
                          }`}
                        >
                          {getPerformanceLevel(
                            student.grade
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-[#a1adaf]">
                          N/A
                        </span>
                      )}

                    </td>

                  </tr>
                )
              })}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-xs text-[#9aa7aa]"
                  >
                    No students available yet.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}

export default Reports