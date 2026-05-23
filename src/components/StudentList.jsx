import React, { useState, useEffect } from 'react'

function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Ali Khan', email: 'ali@example.com', grade: 'A', course: 'Computer Science' },
    { id: 2, name: 'Sara Ahmed', email: 'sara@example.com', grade: 'A+', course: 'Mathematics' },
    { id: 3, name: 'Omar Farooq', email: 'omar@example.com', grade: 'B+', course: 'Physics' },
  ])
  
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '', course: '' })

  // Load from localStorage on page load
  useEffect(() => {
    const savedStudents = localStorage.getItem('students')
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [])

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addStudent = () => {
    if (newStudent.name && newStudent.email) {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
      setStudents([...students, { ...newStudent, id: newId }])
      setNewStudent({ name: '', email: '', grade: '', course: '' })
      setShowForm(false)
    }
  }

  const editStudent = (student) => {
    setIsEditing(true)
    setEditId(student.id)
    setNewStudent({
      name: student.name,
      email: student.email,
      grade: student.grade,
      course: student.course
    })
    setShowForm(true)
  }

  const updateStudent = () => {
    if (newStudent.name && newStudent.email) {
      const updatedStudents = students.map(student => 
        student.id === editId 
          ? { ...newStudent, id: editId }
          : student
      )
      setStudents(updatedStudents)
      setNewStudent({ name: '', email: '', grade: '', course: '' })
      setIsEditing(false)
      setEditId(null)
      setShowForm(false)
    }
  }

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const filteredStudents = students.filter(student => student.id !== id)
      const reindexedStudents = filteredStudents.map((student, index) => ({
        ...student,
        id: index + 1
      }))
      setStudents(reindexedStudents)
    }
  }

  const cancelForm = () => {
    setShowForm(false)
    setIsEditing(false)
    setEditId(null)
    setNewStudent({ name: '', email: '', grade: '', course: '' })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Management System</h2>
          <p className="text-sm text-gray-500 mt-1">Total Students: {students.length}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add Student'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? '✏️ Edit Student' : '➕ Add New Student'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newStudent.name} 
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newStudent.email} 
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Grade (A, A+, B, etc.)" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newStudent.grade} 
              onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Course" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newStudent.course} 
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} 
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={isEditing ? updateStudent : addStudent} 
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {isEditing ? '💾 Update Student' : '💾 Save Student'}
            </button>
            <button 
              onClick={cancelForm} 
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
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
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">
                  No students found. Click "Add Student" to add your first student!
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.course}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      {student.grade || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editStudent(student)} 
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm transition"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => deleteStudent(student.id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList