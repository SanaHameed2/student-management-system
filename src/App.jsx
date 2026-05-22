import React, { useState } from 'react'
import Navbar from './components/Navbar'
import StudentList from './components/StudentList'
import Home from './pages/Home'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    if (currentPage === 'home') return <Home />
    if (currentPage === 'students') return <StudentList />
    return <Home />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="container mx-auto px-4 py-8">
        {renderPage()}
      </div>
    </div>
  )
}

export default App