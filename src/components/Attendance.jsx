import React, { useState, useEffect } from 'react'
import { useStudents } from '../context/StudentContext'

function Attendance() {
  const { students } = useStudents()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(`attendance_${selectedDate}`)
    if (saved) {
      setAttendance(JSON.parse(saved))
    } else {
      const initial = {}
      students.forEach(s => { initial[s.id] = 'present' })
      setAttendance(initial)
    }
  }, [selectedDate, students])

  const saveAttendance = () => {
    localStorage.setItem(`attendance_${selectedDate}`, JSON.stringify(attendance))
    alert('Attendance saved!')
  }

  const toggleStatus = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : 'present'
    }))
  }

  const presentCount = Object.values(attendance).filter(v => v === 'present').length
  const percentage = students.length ? ((presentCount / students.length) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      
      {/* =========================================
          PAGE HEADER - Home page style
      ========================================= */}
      <div className="bg-[linear-gradient(105deg,#427c8c_0%,#63949f_40%,#d8b8a8_85%,#e5c7b5_100%)] text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-4 bottom-0 opacity-20 text-9xl select-none pointer-events-none">
          📋
        </div>
        <div className="z-10 relative">
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
            Attendance Management
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Attendance Tracker
          </h1>
          <p className="text-gray-100 mt-2 text-sm max-w-lg leading-relaxed">
            Mark daily attendance for students and track presence rates.
          </p>
        </div>
      </div>

      {/* =========================================
          QUICK STATS - Home page style
      ========================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center text-xl mb-3">📅</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedDate}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Selected Date</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center text-xl mb-3">✅</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{presentCount}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Present Today</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/40 text-red-600 flex items-center justify-center text-xl mb-3">❌</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{students.length - presentCount}</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Absent Today</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[1.8rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center text-xl mb-3">📊</div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{percentage}%</div>
          <div className="text-xs text-gray-400 font-medium mt-1">Attendance Rate</div>
        </div>
      </div>

      {/* =========================================
          ATTENDANCE TABLE - Home page style
      ========================================= */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Table Header with Controls */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-white">
              Student Attendance
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Mark each student as present or absent for {selectedDate}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveAttendance}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Save Attendance
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Course</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const status = attendance[student.id] || 'present'
                const colors = [
                  'bg-[#f1c9b5] text-[#785b4d]',
                  'bg-[#dcecef] text-[#477784]',
                  'bg-[#e8e1eb] text-[#75657d]',
                ]
                const initials = `${student.name?.charAt(0) || 'S'}${student.name?.split(' ')[1]?.charAt(0) || ''}`.toUpperCase()
                
                return (
                  <tr
                    key={student.id}
                    className="border-b last:border-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="py-3 px-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${colors[index % 3]}`}>
                          {initials}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {student.course || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        status === 'present'
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {status === 'present' ? '✅ Present' : '❌ Absent'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(student.id)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                          status === 'present'
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60'
                            : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/60'
                        }`}
                      >
                        Mark {status === 'present' ? 'Absent' : 'Present'}
                      </button>
                    </td>
                  </tr>
                )
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-sm text-gray-400">
                    No students available. Add students first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Attendance