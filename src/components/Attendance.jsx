import React, { useState, useEffect } from 'react'
import { useStudents } from '../context/StudentContext'

function Attendance() {
  const { students } = useStudents()

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const [attendance, setAttendance] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(`attendance_${selectedDate}`)

    if (saved) {
      setAttendance(JSON.parse(saved))
    } else {
      const initial = {}

      students.forEach((student) => {
        initial[student.id] = 'present'
      })

      setAttendance(initial)
    }
  }, [selectedDate, students])

  const saveAttendance = () => {
    localStorage.setItem(
      `attendance_${selectedDate}`,
      JSON.stringify(attendance)
    )

    alert('Attendance saved!')
  }

  const toggleStatus = (id) => {
    setAttendance((previous) => ({
      ...previous,
      [id]:
        previous[id] === 'present'
          ? 'absent'
          : 'present',
    }))
  }

  const presentCount = Object.values(attendance).filter(
    (value) => value === 'present'
  ).length

  const absentCount = students.length - presentCount

  const percentage = students.length
    ? ((presentCount / students.length) * 100).toFixed(1)
    : '0.0'

  const formatDate = (date) => {
    if (!date) return ''

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )
  }

  return (
    <div className="space-y-6">

      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

        <div>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#4d8998] dark:text-[#86b9c1]">
            Daily Records
          </p>

          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-[#263b43] dark:text-white">
            Attendance
          </h1>

          <p className="mt-1 text-sm text-[#789099] dark:text-gray-400">
            Track daily student attendance and presence rates.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white dark:bg-[#1b292f] px-4 py-2.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#5b9a78]" />
          <span className="text-xs text-[#718187] dark:text-gray-300">
            {formatDate(selectedDate)}
          </span>
        </div>
      </div>

      {/* =========================================
          TOP ATTENDANCE AREA
      ========================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-5">

        {/* Main attendance card */}
        <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(105deg,#3f8797_0%,#72a9ad_48%,#dcb9a9_100%)] p-7 md:p-8 text-white min-h-[220px]">

          <div className="relative z-10 max-w-[70%]">

            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-white/65">
              Today's attendance
            </p>

            <div className="mt-3 flex items-end gap-3">
              <span className="text-5xl md:text-6xl font-semibold tracking-tight">
                {percentage}%
              </span>

              <span className="pb-2 text-xs text-white/65">
                present
              </span>
            </div>

            <p className="mt-3 text-sm text-white/75">
              {presentCount} of {students.length} students are
              present today.
            </p>

            <div className="mt-6 h-2 max-w-[360px] rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          {/* Decorative percentage circle */}
          <div className="absolute right-8 top-8 w-28 h-28 rounded-full border-[10px] border-white/15" />

          <div className="absolute right-[58px] top-[58px] w-20 h-20 rounded-full border-[5px] border-white/30 border-t-white" />

          <div className="absolute right-8 bottom-0 text-[100px] opacity-[0.12] select-none pointer-events-none">
            ✓
          </div>
        </div>

        {/* Date / save card */}
        <div className="rounded-[26px] bg-[#f7d6c3] dark:bg-[#493a35] p-7 flex flex-col justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-[#785b4d] dark:text-[#d8b9a9]">
              Attendance date
            </p>

            <h2 className="mt-3 text-xl font-semibold text-[#30231e] dark:text-white">
              Select a date
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-[#80675b] dark:text-gray-300">
              Choose the day you want to record or review
              attendance for.
            </p>
          </div>

          <div className="mt-6">

            <input
              type="date"
              value={selectedDate}
              onChange={(event) =>
                setSelectedDate(event.target.value)
              }
              className="w-full rounded-xl border border-white/60 dark:border-white/10 bg-white/60 dark:bg-black/15 px-4 py-3 text-sm text-[#4b3a33] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d9936c]"
            />

            <button
              onClick={saveAttendance}
              className="mt-3 w-full rounded-xl bg-[#e69b68] hover:bg-[#d88c59] px-4 py-3 text-xs font-semibold text-white transition"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          QUICK STATS
      ========================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Selected date
              </p>

              <p className="mt-2 text-sm font-semibold text-[#354950] dark:text-white">
                {selectedDate}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#e1f0f1] dark:bg-[#28434a] flex items-center justify-center">
              📅
            </div>
          </div>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Present
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#579176]">
                {presentCount}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#e5f2ec] dark:bg-[#294139] text-[#579176] flex items-center justify-center">
              ✓
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#9aa9ad]">
            Students marked present
          </p>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Absent
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#b46d69]">
                {absentCount}
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#f5e4e3] dark:bg-[#453332] text-[#b46d69] flex items-center justify-center">
              ×
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#9aa9ad]">
            Students marked absent
          </p>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-[#1b292f] p-5 shadow-[0_8px_30px_rgba(50,80,90,0.05)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-[#87989d]">
                Attendance rate
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#4d8998] dark:text-[#86b9c1]">
                {percentage}%
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-[#e3eff2] dark:bg-[#294149] text-[#4d8998] flex items-center justify-center">
              %
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#9aa9ad]">
            Daily presence rate
          </p>
        </div>
      </div>

      {/* =========================================
          STUDENT ATTENDANCE TABLE
      ========================================= */}
      <section className="rounded-[24px] bg-white dark:bg-[#1b292f] shadow-[0_8px_30px_rgba(50,80,90,0.05)] overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[#edf1f2] dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-sm font-semibold text-[#263b43] dark:text-white">
              Student attendance
            </h2>

            <p className="mt-1 text-[10px] text-[#98a7ab]">
              Mark each student as present or absent for{' '}
              {formatDate(selectedDate)}
            </p>
          </div>

          <button
            onClick={saveAttendance}
            className="self-start sm:self-auto rounded-xl bg-[#4d8998] hover:bg-[#3d7887] px-5 py-2.5 text-xs font-semibold text-white transition"
          >
            Save changes
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead>
              <tr className="border-b border-[#edf1f2] dark:border-white/5">

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  #
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Student
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Course
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Status
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-[#94a2a6]">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {students.map((student, index) => {

                const status =
                  attendance[student.id] || 'present'

                const avatarClasses = [
                  'bg-[#f1c9b5] text-[#785b4d]',
                  'bg-[#dcecef] text-[#477784]',
                  'bg-[#e8e1eb] text-[#75657d]',
                ]

                const initials =
                  `${student.name?.charAt(0) || 'S'}${
                    student.name
                      ?.split(' ')[1]
                      ?.charAt(0) || ''
                  }`.toUpperCase()

                return (
                  <tr
                    key={student.id}
                    className="border-b last:border-0 border-[#edf1f2] dark:border-white/5 hover:bg-[#f8faf9] dark:hover:bg-white/[0.02] transition"
                  >

                    <td className="px-6 py-4 text-xs text-[#9aa7aa]">
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${
                            avatarClasses[index % 3]
                          }`}
                        >
                          {initials}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-[#354950] dark:text-white">
                            {student.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#9aa6a9]">
                            Student #{student.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-xs text-[#687a80] dark:text-gray-300">
                      {student.course || 'N/A'}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                          status === 'present'
                            ? 'bg-[#e5f2ec] text-[#579176]'
                            : 'bg-[#f5e4e3] text-[#b46d69]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            status === 'present'
                              ? 'bg-[#579176]'
                              : 'bg-[#b46d69]'
                          }`}
                        />

                        {status === 'present'
                          ? 'Present'
                          : 'Absent'}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          toggleStatus(student.id)
                        }
                        className={`rounded-xl px-4 py-2 text-[10px] font-semibold transition ${
                          status === 'present'
                            ? 'bg-[#f5e4e3] text-[#b46d69] hover:bg-[#edd8d6]'
                            : 'bg-[#e5f2ec] text-[#579176] hover:bg-[#d9ebe2]'
                        }`}
                      >
                        Mark{' '}
                        {status === 'present'
                          ? 'Absent'
                          : 'Present'}
                      </button>

                    </td>

                  </tr>
                )
              })}

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >
                    <div className="text-3xl opacity-40">
                      👥
                    </div>

                    <p className="mt-3 text-sm font-medium text-[#64777d] dark:text-gray-300">
                      No students available
                    </p>

                    <p className="mt-1 text-xs text-[#9aa7aa]">
                      Add students before taking attendance.
                    </p>
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

export default Attendance