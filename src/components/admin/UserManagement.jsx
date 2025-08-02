import React, { useState, useEffect } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Shield, 
  ShieldOff,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react'
import Toast from '../Toast'
import UserDetailsModal from './UserDetailsModal'

export default function UserManagement({ theme }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2 hours ago',
      joinDate: '2024-01-15',
      projectsCount: 12,
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'admin',
      status: 'active',
      lastLogin: '1 day ago',
      joinDate: '2023-12-01',
      projectsCount: 25,
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '1 week ago',
      joinDate: '2024-02-10',
      projectsCount: 8,
      avatar: null
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@company.com',
      role: 'moderator',
      status: 'active',
      lastLogin: '30 minutes ago',
      joinDate: '2024-01-20',
      projectsCount: 18,
      avatar: null
    }
  ])

  const [filteredUsers, setFilteredUsers] = useState(users)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [contextMenu, setContextMenu] = useState(null)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [selectedUserForDetails, setSelectedUserForDetails] = useState(null)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  useEffect(() => {
    let filtered = users

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole)
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus)
    }

    setFilteredUsers(filtered)
  }, [users, searchQuery, filterRole, filterStatus])

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
  const handleUserAction = (action, userId) => {
    const user = users.find(u => u.id === userId)
    switch (action) {
      case 'activate':
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u))
        setToast({ visible: true, message: `${user.name} has been activated`, type: 'success' })
        break
      case 'deactivate':
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'inactive' } : u))
        setToast({ visible: true, message: `${user.name} has been deactivated`, type: 'info' })
        break
      case 'makeAdmin':
        setUsers(users.map(u => u.id === userId ? { ...u, role: 'admin' } : u))
        setToast({ visible: true, message: `${user.name} is now an admin`, type: 'success' })
        break
      case 'removeAdmin':
        setUsers(users.map(u => u.id === userId ? { ...u, role: 'user' } : u))
        setToast({ visible: true, message: `Admin privileges removed from ${user.name}`, type: 'info' })
        break
    }
    setContextMenu(null)
  }

  const getRoleColor = (role) => {
    if (theme === 'dark') {
      switch (role) {
        case 'admin': return 'bg-red-900/30 text-red-300'
        case 'moderator': return 'bg-yellow-900/30 text-yellow-300'
        default: return 'bg-gray-700 text-gray-300'
      }
    }
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'moderator': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    if (theme === 'dark') {
      return status === 'active' ? 'bg-green-900/30 text-green-300' : 'bg-gray-700 text-gray-300'
    }
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const handleRowClick = (user) => {
    setSelectedUserForDetails(user)
    setShowUserDetailsModal(true)
  }

  const handleContextMenu = (e, user) => {
    e.preventDefault()
    setContextMenu({
      userId: user.id,
      x: e.clientX,
      y: e.clientY
    })
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            User Management
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Manage user accounts, roles, and permissions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border space-y-4 ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'} />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              Filters:
            </span>
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={`border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className={`text-sm ${
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-lg border overflow-hidden ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  <input
                    type="checkbox"
                    className={`rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-2 ${
                      theme === 'dark' 
                        ? 'border-zinc-600 bg-zinc-800 checked:bg-blue-600 checked:border-blue-600' 
                        : 'border-gray-300 bg-white'
                    }`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                  />
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Role
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Projects
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-zinc-700' : 'divide-gray-200'
            }`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`${
                  theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'
                } transition-colors cursor-pointer`}
                onClick={() => handleRowClick(user)}
                onContextMenu={(e) => handleContextMenu(e, user)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className={`rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-2 ${
                        theme === 'dark' 
                          ? 'border-zinc-600 bg-zinc-800 checked:bg-blue-600 checked:border-blue-600' 
                          : 'border-gray-300 bg-white'
                      }`}
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}>
                        <Users className={`w-5 h-5 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user.name}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'
                  }`}>
                    {user.projectsCount}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setContextMenu(null)}
          />
          <div
            className={`fixed rounded-lg shadow-lg py-1 z-50 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-700'
                : 'bg-white border border-gray-200'
            }`}
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
            }}
          >
            {users.find(u => u.id === contextMenu.userId)?.role !== 'admin' && (
              <button
                onClick={() => handleUserAction('makeAdmin', contextMenu.userId)}
                className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-4 h-4 mr-3" />
                Make Admin
              </button>
            )}
            {users.find(u => u.id === contextMenu.userId)?.role === 'admin' && (
              <button
                onClick={() => handleUserAction('removeAdmin', contextMenu.userId)}
                className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShieldOff className="w-4 h-4 mr-3" />
                Remove Admin
              </button>
            )}
            <button
              onClick={() => handleUserAction('activate', contextMenu.userId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UserCheck className="w-4 h-4 mr-3" />
              Activate
            </button>
            <button
              onClick={() => handleUserAction('deactivate', contextMenu.userId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UserX className="w-4 h-4 mr-3" />
              Deactivate
            </button>
          </div>
        </>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUserForDetails && (
        <UserDetailsModal
          user={selectedUserForDetails}
          onClose={() => {
            setShowUserDetailsModal(false)
            setSelectedUserForDetails(null)
          }}
          theme={theme}
        />
      )}

      {/* Toast */}
      <Toast 
        message={toast.message} 
        visible={toast.visible} 
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })} 
        theme={theme}
      />
    </div>
  )
}