import React, { useState, useEffect } from 'react'
import Toast from './Toast'

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
  const [toast, setToast] = useState(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterGrade, setFilterGrade] = useState('')

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    const savedStudents = localStorage.getItem('students')
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const uniqueCourses = [...new Set(students.map(s => s.course).filter(Boolean))]
  const uniqueGrades = [...new Set(students.map(s => s.grade).filter(Boolean))]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = filterCourse === '' || student.course === filterCourse
    const matchesGrade = filterGrade === '' || student.grade === filterGrade
    return matchesSearch && matchesCourse && matchesGrade
  })

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Course', 'Grade']
    const rows = filteredStudents.map(student => [
      student.id,
      student.name,
      student.email,
      student.course,
      student.grade || 'N/A'
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `students_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    showToast(`✅ ${filteredStudents.length} students exported successfully!`, 'success')
  }

  const importFromCSV = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      const rows = text.split('\n').slice(1)
      const newStudents = []
      rows.forEach(row => {
        const cols = row.split(',')
        if (cols.length >= 5 && cols[1]) {
          const maxId = students.length > 0 ? Math.max(...students.map(s => s.id)) : 0
          newStudents.push({
            id: maxId + newStudents.length + 1,
            name: cols[1]?.trim(),
            email: cols[2]?.trim(),
            course: cols[3]?.trim(),
            grade: cols[4]?.trim()
          })
        }
      })
      if (newStudents.length > 0) {
        setStudents([...students, ...newStudents])
        showToast(`📥 ${newStudents.length} students imported successfully!`, 'success')
      } else {
        showToast('❌ No valid students found in CSV!', 'error')
      }
      event.target.value = ''
    }
    reader.readAsText(file)
  }

  const addStudent = () => {
    if (newStudent.name && newStudent.email) {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
      setStudents([...students, { ...newStudent, id: newId }])
      setNewStudent({ name: '', email: '', grade: '', course: '' })
      setShowForm(false)
      showToast(`✅ ${newStudent.name} added successfully!`, 'success')
    } else {
      showToast('❌ Please fill all required fields!', 'error')
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
      showToast(`✏️ ${newStudent.name} updated successfully!`, 'success')
    } else {
      showToast('❌ Please fill all required fields!', 'error')
    }
  }

  const deleteStudent = (id) => {
    const studentToDelete = students.find(s => s.id === id)
    if (window.confirm(`Are you sure you want to delete ${studentToDelete?.name}?`)) {
      const filtered = students.filter(student => student.id !== id)
      const reindexed = filtered.map((student, index) => ({
        ...student,
        id: index + 1
      }))
      setStudents(reindexed)
      showToast(`🗑️ ${studentToDelete?.name} deleted successfully!`, 'success')
    }
  }

  const cancelForm = () => {
    setShowForm(false)
    setIsEditing(false)
    setEditId(null)
    setNewStudent({ name: '', email: '', grade: '', course: '' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterCourse('')
    setFilterGrade('')
    showToast('🧹 Filters cleared!', 'info')
  }

  return (
    <div className="p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student Management System</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Total Students: {students.length} | Showing: {filteredStudents.length}
          </p>
        </div>
        <div className="flex gap-3">
          {/* Import CSV Button */}
          <input
            type="file"
            accept=".csv"
            onChange={importFromCSV}
            className="hidden"
            id="csvInput"
          />
          <label
            htmlFor="csvInput"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition flex items-center gap-2"
          >
            📥 Import CSV
          </label>
          
          <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            📊 Export to CSV
          </button>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">All Grades</option>
            {uniqueGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <button onClick={clearFilters} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Clear Filters
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {isEditing ? '✏️ Edit Student' : '➕ Add New Student'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              value={newStudent.name} 
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              value={newStudent.email} 
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Grade (A, A+, B, etc.)" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              value={newStudent.grade} 
              onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Course" 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
              value={newStudent.course} 
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} 
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={isEditing ? updateStudent : addStudent} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              {isEditing ? '💾 Update Student' : '💾 Save Student'}
            </button>
            <button onClick={cancelForm} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-800 dark:bg-gray-900 text-white">
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
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500 dark:text-gray-400">
                  No students found. Try changing filters or add a new student!
                </td>
              </tr>
            ) : (
              filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3 text-gray-800 dark:text-white">{student.id}</td>
                  <td className="p-3 font-medium text-gray-800 dark:text-white">{student.name}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{student.email}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">{student.course}</td>
                  <td className="p-3">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                      {student.grade || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => editStudent(student)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm transition">
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition">
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