import React, { useState } from 'react'

function GradeCalculator() {
  const [marks, setMarks] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
  })

  const [result, setResult] = useState(null)

  const subjects = [
    { key: 'subject1', name: 'Mathematics' },
    { key: 'subject2', name: 'Physics' },
    { key: 'subject3', name: 'Chemistry' },
    { key: 'subject4', name: 'Computer Science' },
    { key: 'subject5', name: 'English' },
  ]

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

    subjects.forEach(({ key }) => {
      const value = parseFloat(marks[key])

      if (isNaN(value) || value < 0 || value > 100) {
        valid = false
      } else {
        total += value
      }
    })

    if (!valid) {
      setResult({
        error: 'Please enter marks between 0 and 100 for all subjects.',
      })
      return
    }

    const percentage = (total / 500) * 100
    const grade = calculateGrade(percentage)

    setResult({
      percentage: percentage.toFixed(2),
      grade,
      total,
    })
  }

  const reset = () => {
    setMarks({
      subject1: '',
      subject2: '',
      subject3: '',
      subject4: '',
      subject5: '',
    })

    setResult(null)
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="bg-[linear-gradient(105deg,#427c8c_0%,#63949f_40%,#d8b8a8_85%,#e5c7b5_100%)] text-white rounded-[2rem] p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-6 bottom-0 opacity-20 text-9xl select-none pointer-events-none">
          🎓
        </div>

        <div className="relative z-10">
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold backdrop-blur-sm">
            Academic Tools
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Grade Calculator
          </h1>

          <p className="text-gray-100 mt-2 text-sm max-w-lg leading-relaxed">
            Enter marks for each subject to calculate the total, percentage,
            and final grade.
          </p>
        </div>
      </div>

      {/* Calculator + Result */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Marks Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 p-6">

          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Enter Subject Marks
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Each subject is marked out of 100.
            </p>
          </div>

          <div className="space-y-4">
            {subjects.map(({ key, name }) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <label className="sm:w-44 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {name}
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 - 100"
                  value={marks[key]}
                  onChange={(e) =>
                    setMarks({
                      ...marks,
                      [key]: e.target.value,
                    })
                  }
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4f7f8c] focus:border-transparent"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={calculate}
              className="px-6 py-2.5 bg-[#4f7f8c] hover:bg-[#426d79] text-white rounded-xl text-sm font-semibold transition"
            >
              Calculate Grade
            </button>

            <button
              onClick={reset}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-semibold transition"
            >
              Reset
            </button>
          </div>

          {result?.error && (
            <div className="mt-5 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 text-sm">
              {result.error}
            </div>
          )}
        </div>

        {/* Result */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 p-6">

          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Result
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Calculated academic performance
          </p>

          {!result || result.error ? (
            <div className="flex items-center justify-center min-h-[250px] text-center">
              <div>
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-xl mb-3">
                  📊
                </div>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  No result yet
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Enter all subject marks and calculate.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                <p className="text-xs text-gray-400">
                  Total Marks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {result.total}
                  <span className="text-sm font-medium text-gray-400">
                    {' '}
                    / 500
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                <p className="text-xs text-gray-400">
                  Percentage
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {result.percentage}%
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Final Grade
                </p>

                <p className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                  {result.grade}
                </p>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default GradeCalculator