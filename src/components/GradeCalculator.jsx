import React, { useState } from 'react'

function GradeCalculator() {
  const [marks, setMarks] = useState({ subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' })
  const [result, setResult] = useState(null)

  const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5']
  const subjectNames = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English']

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    if (percentage >= 40) return 'D'
    return 'F'
  }

  const calculate = () => {
    let total = 0
    let valid = true
    subjects.forEach(sub => {
      const val = parseFloat(marks[sub])
      if (isNaN(val) || val < 0 || val > 100) valid = false
      total += val
    })
    
    if (!valid) {
      setResult({ error: 'Please enter valid marks between 0-100 for all subjects' })
      return
    }
    
    const percentage = (total / 500) * 100
    const grade = calculateGrade(percentage)
    setResult({ percentage: percentage.toFixed(2), grade, total })
  }

  const reset = () => {
    setMarks({ subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' })
    setResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Grade Calculator</h2>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
        {subjectNames.map((name, idx) => (
          <div key={idx} className="mb-4">
            <label className="block mb-2 font-semibold">{name}:</label>
            <input type="number" placeholder="Enter marks (0-100)" value={marks[subjects[idx]]} onChange={(e) => setMarks({...marks, [subjects[idx]]: e.target.value})} className="w-full p-2 border rounded bg-white dark:bg-gray-700" />
          </div>
        ))}
        
        <div className="flex gap-4 mt-4">
          <button onClick={calculate} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Calculate Grade</button>
          <button onClick={reset} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">Reset</button>
        </div>
      </div>

      {result && !result.error && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Result</h3>
          <p><strong>Total Marks:</strong> {result.total}/500</p>
          <p><strong>Percentage:</strong> {result.percentage}%</p>
          <p><strong>Grade:</strong> <span className="text-2xl font-bold text-green-600">{result.grade}</span></p>
        </div>
      )}
      
      {result?.error && <div className="bg-red-100 text-red-800 p-4 rounded-lg">{result.error}</div>}
    </div>
  )
}

export default GradeCalculator