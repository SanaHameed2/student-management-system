import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const navigation = [
  {
    to: '/',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    to: '/students',
    label: 'Students',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: '/attendance',
    label: 'Attendance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m8 15 2 2 5-5" />
      </svg>
    ),
  },
  {
    to: '/grade-calculator',
    label: 'Grades',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2" />
      </svg>
    ),
  },
  {
    to: '/courses',
    label: 'Courses',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
  },
  {
    to: '/reports',
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 19V5M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
      </svg>
    ),
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? 'bg-white/15 text-white shadow-sm'
        : 'text-white/65 hover:bg-white/10 hover:text-white'
    }`

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[235px] flex-col bg-[#3f6573] dark:bg-[#172b33] px-5 py-6 text-white">
        
        {/* Brand */}
        <div className="px-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-1 w-8 h-8">
              <span className="rounded-full bg-white" />
              <span className="rounded-full bg-white/80" />
              <span className="rounded-full bg-white/80" />
              <span className="rounded-full bg-white" />
            </div>

            <div>
              <h1 className="text-[19px] font-semibold tracking-tight">
                Student
              </h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                Management
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div>
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={linkClass}
              >
                <span className="w-5 h-5 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[1.7]">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-auto space-y-4">
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between px-3">
              <div>
                <p className="text-xs font-medium text-white/90">
                  Appearance
                </p>
                <p className="text-[10px] text-white/45 mt-0.5">
                  Switch theme
                </p>
              </div>

              <DarkModeToggle />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white/8 px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-[#f1c9b5] flex items-center justify-center text-sm font-semibold text-[#385865]">
              SM
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium truncate">
                Student Manager
              </p>
              <p className="text-[10px] text-white/45 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#3f6573] dark:bg-[#172b33] text-white">
        <div className="h-[68px] px-5 flex items-center justify-between">
          
          <NavLink to="/" className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-0.5 w-7 h-7">
              <span className="rounded-full bg-white" />
              <span className="rounded-full bg-white/80" />
              <span className="rounded-full bg-white/80" />
              <span className="rounded-full bg-white" />
            </div>

            <div>
              <h1 className="text-base font-semibold">
                Student Manager
              </h1>
            </div>
          </NavLink>

          <div className="flex items-center gap-3">
            <DarkModeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="px-4 pb-4 border-t border-white/10 pt-3">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}
                >
                  <span className="w-5 h-5 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[1.7]">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar