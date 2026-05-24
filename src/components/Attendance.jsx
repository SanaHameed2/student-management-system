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
    alert('✅ Attendance saved!')
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Attendance Tracker</h2>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <label className="font-semibold mr-2">Date:</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-700" />
        </div>
        <div>
          <span className="font-semibold">Present: {presentCount} | Total: {students.length} | Rate: {percentage}%</span>
        </div>
        <button onClick={saveAttendance} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">💾 Save Attendance</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3">{student.id}</td>
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${attendance[student.id] === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {attendance[student.id] === 'present' ? '✅ Present' : '❌ Absent'}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => toggleStatus(student.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Mark {attendance[student.id] === 'present' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance