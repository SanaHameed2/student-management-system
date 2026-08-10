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
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header section */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4 bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Student Directory</h2>
          <p className="text-xs text-gray-400 mt-1">
            Total Students: <span className="font-semibold text-gray-700 dark:text-gray-200">{students.length}</span> | Showing: <span className="font-semibold text-gray-700 dark:text-gray-200">{filteredStudents.length}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <input
            type="file"
            accept=".csv"
            onChange={importFromCSV}
            className="hidden"
            id="csvInput"
          />
          <label
            htmlFor="csvInput"
            className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition text-xs flex items-center gap-2"
          >
            📥 Import
          </label>
          
          <button onClick={exportToCSV} className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-2">
            📊 Export
          </button>
          
          <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition text-xs">
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
          />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
          >
            <option value="">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
          >
            <option value="">All Grades</option>
            {uniqueGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <button onClick={clearFilters} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-semibold px-4 py-3 rounded-xl transition text-xs">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add / Edit Form Modal Card */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h3 className="text-base font-bold mb-4 text-gray-800 dark:text-white">
            {isEditing ? '✏️ Edit Student Record' : '➕ Add New Student'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
              value={newStudent.name} 
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
              value={newStudent.email} 
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Grade (A, A+, B...)" 
              className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
              value={newStudent.grade} 
              onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})} 
            />
            <input 
              type="text" 
              placeholder="Course Name" 
              className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 dark:text-white"
              value={newStudent.course} 
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} 
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={isEditing ? updateStudent : addStudent} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition">
              {isEditing ? '💾 Update Record' : '💾 Save Student'}
            </button>
            <button onClick={cancelForm} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-700 dark:text-gray-300 font-semibold px-6 py-2.5 rounded-xl text-xs transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modern Table Layout */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-400 font-bold bg-gray-50/50 dark:bg-gray-900/50">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course</th>
                <th className="p-4">Grade</th>
                <th className="p-4 pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-12 text-gray-400">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition">
                    <td className="p-4 pl-6 font-semibold text-gray-500">#{student.id}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{student.name}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{student.email}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{student.course || 'N/A'}</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                        {student.grade || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex gap-2">
                        <button onClick={() => editStudent(student)} className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                          Edit
                        </button>
                        <button onClick={() => deleteStudent(student.id)} className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                          Delete
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
    </div>
  )
}

export default StudentList