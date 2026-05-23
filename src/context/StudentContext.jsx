import React, { createContext, useState, useEffect, useContext } from 'react'

const StudentContext = createContext()

export const useStudents = () => useContext(StudentContext)

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([])

  // Load from localStorage on page load
  useEffect(() => {
    const savedStudents = localStorage.getItem('students')
    if (savedStudents && JSON.parse(savedStudents).length > 0) {
      setStudents(JSON.parse(savedStudents))
    } else {
      // Default data
      setStudents([
        { id: 1, name: 'Ali Khan', email: 'ali@example.com', grade: 'A', course: 'Computer Science' },
        { id: 2, name: 'Sara Ahmed', email: 'sara@example.com', grade: 'A+', course: 'Mathematics' },
        { id: 3, name: 'Omar Farooq', email: 'omar@example.com', grade: 'B+', course: 'Physics' },
      ])
    }
  }, [])

  // Save to localStorage whenever students change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students))
    }
  }, [students])

  const addStudent = (student) => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
    setStudents([...students, { ...student, id: newId }])
  }

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(s => s.id === id ? { ...updatedStudent, id } : s))
  }

  const deleteStudent = (id) => {
    const filtered = students.filter(s => s.id !== id)
    const reindexed = filtered.map((s, idx) => ({ ...s, id: idx + 1 }))
    setStudents(reindexed)
  }

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  )
}