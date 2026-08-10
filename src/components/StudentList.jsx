import React, { useState, useEffect } from 'react'
import Toast from './Toast'

function StudentList() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ali Khan',
      email: 'ali@example.com',
      grade: 'A',
      course: 'Computer Science',
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      email: 'sara@example.com',
      grade: 'A+',
      course: 'Mathematics',
    },
    {
      id: 3,
      name: 'Omar Farooq',
      email: 'omar@example.com',
      grade: 'B+',
      course: 'Physics',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade: '',
    course: '',
  })

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

  const uniqueCourses = [
    ...new Set(students.map((s) => s.course).filter(Boolean)),
  ]

  const uniqueGrades = [
    ...new Set(students.map((s) => s.grade).filter(Boolean)),
  ]

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search)

    const matchesCourse =
      filterCourse === '' || student.course === filterCourse

    const matchesGrade =
      filterGrade === '' || student.grade === filterGrade

    return matchesSearch && matchesCourse && matchesGrade
  })

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Course', 'Grade']

    const rows = filteredStudents.map((student) => [
      student.id,
      student.name,
      student.email,
      student.course,
      student.grade || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
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

    showToast(
      `${filteredStudents.length} students exported successfully`,
      'success'
    )
  }

  const importFromCSV = (event) => {
    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      const rows = text.split('\n').slice(1)

      const newStudents = []

      rows.forEach((row) => {
        const cols = row.split(',')

        if (cols.length >= 5 && cols[1]) {
          const maxId =
            students.length > 0
              ? Math.max(...students.map((s) => s.id))
              : 0

          newStudents.push({
            id: maxId + newStudents.length + 1,
            name: cols[1]?.trim(),
            email: cols[2]?.trim(),
            course: cols[3]?.trim(),
            grade: cols[4]?.trim(),
          })
        }
      })

      if (newStudents.length > 0) {
        setStudents([...students, ...newStudents])

        showToast(
          `${newStudents.length} students imported successfully`,
          'success'
        )
      } else {
        showToast('No valid students found in CSV', 'error')
      }

      event.target.value = ''
    }

    reader.readAsText(file)
  }

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      showToast('Please enter student name and email', 'error')
      return
    }

    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1

    setStudents([
      ...students,
      {
        ...newStudent,
        id: newId,
      },
    ])

    setNewStudent({
      name: '',
      email: '',
      grade: '',
      course: '',
    })

    setShowForm(false)

    showToast(`${newStudent.name} added successfully`, 'success')
  }

  const editStudent = (student) => {
    setIsEditing(true)
    setEditId(student.id)

    setNewStudent({
      name: student.name,
      email: student.email,
      grade: student.grade,
      course: student.course,
    })

    setShowForm(true)
  }

  const updateStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      showToast('Please enter student name and email', 'error')
      return
    }

    const updatedStudents = students.map((student) =>
      student.id === editId
        ? {
            ...newStudent,
            id: editId,
          }
        : student
    )

    setStudents(updatedStudents)

    setNewStudent({
      name: '',
      email: '',
      grade: '',
      course: '',
    })

    setIsEditing(false)
    setEditId(null)
    setShowForm(false)

    showToast(`${newStudent.name} updated successfully`, 'success')
  }

  const deleteStudent = (id) => {
    const studentToDelete = students.find(
      (student) => student.id === id
    )

    if (
      window.confirm(
        `Are you sure you want to delete ${studentToDelete?.name}?`
      )
    ) {
      setStudents(
        students.filter((student) => student.id !== id)
      )

      showToast(
        `${studentToDelete?.name} deleted successfully`,
        'success'
      )
    }
  }

  const cancelForm = () => {
    setShowForm(false)
    setIsEditing(false)
    setEditId(null)

    setNewStudent({
      name: '',
      email: '',
      grade: '',
      course: '',
    })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterCourse('')
    setFilterGrade('')
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const avatarStyles = [
    'bg-[#f1c9b5] text-[#785b4d]',
    'bg-[#dcecef] text-[#477784]',
    'bg-[#e8e1eb] text-[#75657d]',
  ]

  return (
    <div className="w-full max-w-[1400px] mx-auto">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#427c8c] mb-2">
            Student Management
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Students
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage student records.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <input
            type="file"
            accept=".csv"
            onChange={importFromCSV}
            className="hidden"
            id="csvInput"
          />

          <label
            htmlFor="csvInput"
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Import CSV
          </label>

          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => {
              if (showForm) {
                cancelForm()
              } else {
                setShowForm(true)
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-[#427c8c] hover:bg-[#376d7c] text-white text-sm font-semibold transition"
          >
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>

        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Total Students
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {students.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Showing
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {filteredStudents.length}
          </p>
        </div>

        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Courses
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {uniqueCourses.length}
          </p>
        </div>

      </div>

      {/* Add / Edit */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 mb-6">

          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Student' : 'Add Student'}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Enter the student's basic information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Full name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  name: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#427c8c]/30"
            />

            <input
              type="email"
              placeholder="Email address"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  email: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#427c8c]/30"
            />

            <input
              type="text"
              placeholder="Course"
              value={newStudent.course}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  course: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#427c8c]/30"
            />

            <input
              type="text"
              placeholder="Grade"
              value={newStudent.grade}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  grade: e.target.value,
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#427c8c]/30"
            />

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={isEditing ? updateStudent : addStudent}
              className="px-5 py-2.5 rounded-xl bg-[#427c8c] hover:bg-[#376d7c] text-white text-sm font-semibold transition"
            >
              {isEditing ? 'Update Student' : 'Save Student'}
            </button>

            <button
              onClick={cancelForm}
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#427c8c]/30"
          />

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="">All Courses</option>

            {uniqueCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="">All Grades</option>

            {uniqueGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

        </div>

        {(searchTerm || filterCourse || filterGrade) && (
          <button
            onClick={clearFilters}
            className="mt-3 text-xs font-semibold text-[#427c8c] hover:underline"
          >
            Clear filters
          </button>
        )}

      </div>

      {/* Student Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">
            Student Records
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {filteredStudents.length} student
            {filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px]">

            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Student
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Course
                </th>

                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Grade
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center text-sm text-gray-400"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (

                  <tr
                    key={student.id}
                    className="border-b last:border-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50/70 dark:hover:bg-gray-700/30 transition"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                            avatarStyles[index % avatarStyles.length]
                          }`}
                        >
                          {getInitials(student.name)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {student.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            #{student.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {student.email}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {student.course || 'N/A'}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          student.grade === 'A+' ||
                          student.grade === 'A'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : student.grade === 'B+' ||
                              student.grade === 'B'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {student.grade || 'N/A'}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => editStudent(student)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#427c8c] bg-[#eef5f6] hover:bg-[#dcecef] transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 transition"
                        >
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