import React from 'react'
import { useDarkMode } from '../context/DarkModeContext'

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm font-medium"
      aria-label="Toggle dark mode"
    >
      {isDark ? 'Dark' : 'Light'}
    </button>
  )
}

export default DarkModeToggle