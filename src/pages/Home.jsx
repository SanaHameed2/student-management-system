import React from 'react'
import { useStudents } from '../context/StudentContext'
import { useNavigate } from 'react-router-dom'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function Home() {
  const { students } = useStudents()
  const navigate = useNavigate()

  // -----------------------------
  // Course distribution
  // -----------------------------
  const courseCount = {}

  students.forEach((student) => {
    if (student.course) {
      courseCount[student.course] =
        (courseCount[student.course] || 0) + 1
    }
  })

  const courseData = Object.entries(courseCount).map(
    ([name, value]) => ({
      name,
      value,
    })
  )

  // -----------------------------
  // Grade distribution
  // -----------------------------
  const gradeCount = {
    'A+': 0,
    A: 0,
    'B+': 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  }

  students.forEach((student) => {
    if (
      student.grade &&
      gradeCount[student.grade] !== undefined
    ) {
      gradeCount[student.grade]++
    }
  })

  const gradeData = Object.entries(gradeCount)
    .filter(([, count]) => count > 0)
    .map(([name, count]) => ({
      name,
      count,
    }))

  const COLORS = [
    '#4d8998',
    '#78aeb4',
    '#f2b89d',
    '#e49a78',
    '#8caeb4',
    '#d4a28d',
    '#71919a',
  ]

  // -----------------------------
  // Derived metrics
  // -----------------------------
  const totalStudents = students.length
  const activeCourses = courseData.length

  const studentsWithGrades = students.filter(
    (student) => student.grade
  )

  const gradeValues = {
    'A+': 4.0,
    A: 3.7,
    'B+': 3.3,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0,
  }

  const averageGrade =
    studentsWithGrades.length > 0
      ? studentsWithGrades.reduce(
          (sum, student) =>
            sum + (gradeValues[student.grade] ?? 0),
          0
        ) / studentsWithGrades.length
      : 0

  const getAverageGradeLabel = () => {
    if (averageGrade >= 3.85) return 'A+'
    if (averageGrade >= 3.5) return 'A'
    if (averageGrade >= 3.15) return 'B+'
    if (averageGrade >= 2.5) return 'B'
    if (averageGrade >= 1.5) return 'C'
    if (averageGrade >= 0.5) return 'D'
    return studentsWithGrades.length ? 'F' : '—'
  }

  const averageGradeLabel = getAverageGradeLabel()

  return (
    <div className="space-y-6">

      {/* --------------------------------
          TOP HEADER
      -------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

        <div>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#4d8998] dark:text-[#86b9c1]">
            Overview
          </p>

          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-[#263b43] dark:text-white">
            Student Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#789099] dark:text-gray-400">
            Monitor students, courses and academic performance.
          </p>
        </div>

        <button
          onClick={() => navigate('/students')}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-[#3f7f90] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#356e7d] transition"
        >
          <span className="text-lg leading-none">+</span>
          Add Student
        </button>
      </div>

      {/* --------------------------------
          HERO + PERFORMANCE
      -------------------------------- */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_0.9fr] gap-5">

        {/* Hero */}
        <div className="relative min-h-[255px] overflow-hidden rounded-[26px] bg-[linear-gradient(105deg,#3f8797_0%,#72a9ad_48%,#dcb9a9_100%)] p-7 md:p-9 text-white">

          <div className="relative z-10 max-w-[58%] md:max-w-[62%]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Student Management
            </p>

            <h2 className="mt-3 text-3xl md:text-[40px] leading-[1.05] font-semibold tracking-tight">
              {totalStudents}
            </h2>

            <p className="mt-1 text-sm font-medium text-white/85">
              Total students
            </p>

            <div className="mt-6 flex flex-wrap gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/55">
                  Active courses
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {activeCourses}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/55">
                  Average grade
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {averageGradeLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative academic illustration */}
          <div className="absolute right-3 bottom-0 w-[42%] h-full pointer-events-none">
            <div className="absolute right-[24%] bottom-7 w-28 h-28 rounded-full bg-white/10" />

            <div className="absolute right-[20%] bottom-5 w-36 h-36 rounded-[45%] bg-white/10 rotate-12" />

            <div className="absolute right-[12%] bottom-10 text-[110px] opacity-[0.18] select-none">
              🎓
            </div>

            <div className="absolute right-[42%] top-10 w-12 h-12 rounded-full border border-white/30" />

            <div className="absolute right-[30%] top-16 w-2 h-2 rounded-full bg-white/50" />
            <div className="absolute right-[12%] top-24 w-3 h-3 rounded-full bg-white/30" />
          </div>

          <button
            onClick={() => navigate('/reports')}
            className="absolute bottom-0 right-0 z-20 rounded-tl-[18px] bg-[#24788b] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#1e6d7e] transition"
          >
            View reports
            <span className="ml-2">›</span>
          </button>
        </div>

        {/* Academic Performance */}
        <div className="rounded-[26px] bg-[#f7d6c3] dark:bg-[#493a35] p-7 flex flex-col justify-between">

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#785b4d] dark:text-[#d8b9a9]">
                Academic performance
              </p>

              <div className="w-9 h-9 rounded-full border-[5px] border-[#efaa72] dark:border-[#d58e61] relative">
                <div className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-[#8d6655] dark:bg-white -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[52px] leading-none font-semibold tracking-tight text-[#241d1a] dark:text-white">
                {averageGradeLabel}
              </span>
            </div>

            <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-[#765e53] dark:text-gray-300">
              Current average grade based on available student records.
            </p>
          </div>

          <button
            onClick={() => navigate('/grade-calculator')}
            className="mt-6 w-full rounded-xl bg-white/60 dark:bg-black/15 px-4 py-3 text-left hover:bg-white/80 dark:hover:bg-black/25 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[#73594c] dark:text-gray-300">
                Open grade calculator
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ef9c63] text-white">
                →
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* --------------------------------
          QUICK STATISTICS
      -------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Total students
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#263b43] dark:text-white">
                {totalStudents}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#e1f0f1] dark:bg-[#28434a] text-[#3f7f90] flex items-center justify-center">
              👥
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[#9aa9ad]">
            Registered records
          </p>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Active courses
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#263b43] dark:text-white">
                {activeCourses}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#e8f1eb] dark:bg-[#293f37] text-[#5e9878] flex items-center justify-center">
              📚
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[#9aa9ad]">
            Courses with students
          </p>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Average grade
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#263b43] dark:text-white">
                {averageGradeLabel}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#f4e8e0] dark:bg-[#44372f] text-[#c48465] flex items-center justify-center">
              🎓
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[#9aa9ad]">
            Current academic average
          </p>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Attendance
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#263b43] dark:text-white">
                92%
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#eee9f4] dark:bg-[#383241] text-[#89749b] flex items-center justify-center">
              ✓
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[#9aa9ad]">
            Overall attendance rate
          </p>
        </div>
      </div>

      {/* --------------------------------
          LOWER CONTENT
      -------------------------------- */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr] gap-5">

        {/* Course Distribution */}
        <div className="rounded-[24px] bg-white dark:bg-[#1b292f] p-6 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">

          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-[#263b43] dark:text-white">
                Course distribution
              </h3>

              <p className="mt-1 text-[10px] text-[#98a7ab]">
                Students by course
              </p>
            </div>

            <button
              onClick={() => navigate('/courses')}
              className="text-xs font-medium text-[#4d8998] hover:text-[#356e7d]"
            >
              View all
            </button>
          </div>

          {courseData.length === 0 ? (
            <div className="h-[230px] flex items-center justify-center text-xs text-[#9aa7aa] text-center">
              No course data available.
            </div>
          ) : (
            <div className="h-[235px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                  >
                    {courseData.map((entry, index) => (
                      <Cell
                        key={`course-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow:
                        '0 8px 25px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {courseData.length > 0 && (
            <div className="space-y-2 mt-1">
              {courseData.slice(0, 3).map((course, index) => (
                <div
                  key={course.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="text-[#667a80] dark:text-gray-300 truncate">
                      {course.name}
                    </span>
                  </div>

                  <span className="font-semibold text-[#354b53] dark:text-white">
                    {course.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grade Distribution */}
        <div className="rounded-[24px] bg-white dark:bg-[#1b292f] p-6 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">

          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-[#263b43] dark:text-white">
                Grade distribution
              </h3>

              <p className="mt-1 text-[10px] text-[#98a7ab]">
                Current student grades
              </p>
            </div>

            <button
              onClick={() => navigate('/grade-calculator')}
              className="text-xs font-medium text-[#4d8998] hover:text-[#356e7d]"
            >
              Details
            </button>
          </div>

          {gradeData.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-xs text-[#9aa7aa] text-center">
              No grade data available.
            </div>
          ) : (
            <div className="h-[260px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gradeData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#91a1a5',
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    tick={{
                      fill: '#91a1a5',
                      fontSize: 10,
                    }}
                  />

                  <Tooltip
                    cursor={{ fill: 'rgba(77,137,152,0.05)' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow:
                        '0 8px 25px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                    }}
                  />

                  <Bar
                    dataKey="count"
                    fill="#4d8998"
                    radius={[7, 7, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Students */}
        <div className="rounded-[24px] bg-white dark:bg-[#1b292f] p-6 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-[#263b43] dark:text-white">
                Recent students
              </h3>

              <p className="mt-1 text-[10px] text-[#98a7ab]">
                Latest student records
              </p>
            </div>

            <button
              onClick={() => navigate('/students')}
              className="text-xs font-medium text-[#4d8998] hover:text-[#356e7d]"
            >
              View all
            </button>
          </div>

          {students.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-xs text-[#9aa7aa] text-center">
              No students added yet.
            </div>
          ) : (
            <div className="space-y-1">
              {students.slice(-5).reverse().map((student, index) => {

                const initials =
                  `${student.name?.charAt(0) || 'S'}${
                    student.name?.split(' ')[1]?.charAt(0) || ''
                  }`.toUpperCase()

                return (
                  <button
                    key={student.id || index}
                    onClick={() => navigate('/students')}
                    className="w-full flex items-center gap-3 py-3 border-b border-[#edf1f2] dark:border-white/5 last:border-0 text-left hover:bg-[#f7f9f9] dark:hover:bg-white/5 rounded-xl px-2 transition"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${
                        index % 3 === 0
                          ? 'bg-[#f1c9b5] text-[#785b4d]'
                          : index % 3 === 1
                          ? 'bg-[#dcecef] text-[#477784]'
                          : 'bg-[#e8e1eb] text-[#75657d]'
                      }`}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#354950] dark:text-white truncate">
                        {student.name || 'Unnamed Student'}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#99a6aa] truncate">
                        {student.course || 'No course assigned'}
                      </p>
                    </div>

                    <span className="text-[10px] text-[#a0acae]">
                      {student.grade || '—'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
