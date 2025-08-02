import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  User, 
  FolderOpen, 
  Settings, 
  BarChart3, 
  Shield, 
  Bell,
  LogOut,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react'
import AdminOverview from './AdminOverview'
import UserManagement from './UserManagement'
import ProjectManagement from './ProjectManagement'
import FolderManagement from './FolderManagement'
import AdminSettings from './AdminSettings'
import Analytics from './Analytics'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState('dark')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, current: location.pathname === '/admin' },
    { name: 'Users', href: '/admin/users', icon: Users, current: location.pathname === '/admin/users' },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen, current: location.pathname === '/admin/projects' },
    { name: 'Folders', href: '/admin/folders', icon: FolderOpen, current: location.pathname === '/admin/folders' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, current: location.pathname === '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: location.pathname === '/admin/settings' },
  ]

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#171717] text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Sidebar */}
      <div className={`w-64 transition-all duration-300 ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'
      } border-r flex flex-col`}>
        {/* Logo */}
        <div className={`px-6 border-b h-16 flex items-center justify-between transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.current
                      ? theme === 'dark'
                        ? 'bg-zinc-800 text-white'
                        : 'bg-gray-200 text-gray-900'
                      : theme === 'dark'
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Admin Profile */}
        {/* <div className={`p-4 border-t transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
            }`}>
              <Shield className={`w-4 h-4 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Admin User
              </div>
              <div className={`text-xs ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                admin@braincanvas.com
              </div>
            </div>
          </div>
        </div> */}

        {/* Profile Section */}
        <div className={`p-2 border-t transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowProfileMenu(!showProfileMenu)
              }}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
              }`}>
                <Shield className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Admin User
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  admin@braincanvas.com
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                showProfileMenu ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className={`absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg z-50 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-700'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="py-1">
                  <button
                    onClick={() => {
                      toggleTheme()
                      setShowProfileMenu(false)
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    <span className="ml-3">
                      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
                    </span>
                  </button>

                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={16} />
                    <span className="ml-3">Settings</span>
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={16} />
                    <span className="ml-3">User Panel</span>
                  </button>

                  <div className={`border-t my-1 ${
                    theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
                  }`} />

                  <button
                    onClick={() => navigate('/signin')}
                    className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-red-400 hover:bg-zinc-800'
                        : 'text-red-600 hover:bg-gray-100'
                    }`}
                  >
                    <LogOut size={16} />
                    <span className="ml-3">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className={`border-b px-6 h-16 flex items-center justify-between transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-300'
        }`}>
          <div className="flex items-center space-x-4">
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {navigation.find(item => item.current)?.name || 'Admin Panel'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-colors relative ${
              theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
            }`}>
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* Logout */}
            <button
              onClick={() => navigate('/')}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
              }`}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminOverview theme={theme} />} />
            <Route path="/users" element={<UserManagement theme={theme} searchQuery={searchQuery} />} />
            <Route path="/projects" element={<ProjectManagement theme={theme} searchQuery={searchQuery} />} />
            <Route path="/folders" element={<FolderManagement theme={theme} searchQuery={searchQuery} />} />
            <Route path="/analytics" element={<Analytics theme={theme} />} />
            <Route path="/settings" element={<AdminSettings theme={theme} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}