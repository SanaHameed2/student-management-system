import React, { useState } from 'react'

function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Ali Khan', email: 'ali@example.com', grade: 'A', course: 'Computer Science' },
    { id: 2, name: 'Sara Ahmed', email: 'sara@example.com', grade: 'A+', course: 'Mathematics' },
    { id: 3, name: 'Omar Farooq', email: 'omar@example.com', grade: 'B+', course: 'Physics' },
  ])
  
  const [showForm, setShowForm] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '', course: '' })

  const addStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([...students, { ...newStudent, id: Date.now() }])
      setNewStudent({ name: '', email: '', grade: '', course: '' })
      setShowForm(false)
    }
  }

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Management System</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add Student'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="p-2 border rounded" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
            <input type="email" placeholder="Email" className="p-2 border rounded" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} />
            <input type="text" placeholder="Grade" className="p-2 border rounded" value={newStudent.grade} onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} />
            <input type="text" placeholder="Course" className="p-2 border rounded" value={newStudent.course} onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} />
          </div>
          <button onClick={addStudent} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Student</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{student.id}</td>
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">{student.grade}</span></td>
                <td className="p-3">
                  <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-gray-600">
        Total Students: <span className="font-bold">{students.length}</span>
      </div>
    </div>
  )
}

export default StudentList