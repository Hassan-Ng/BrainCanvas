import React from 'react'
import { X, User, Calendar, FolderOpen, Users, Clock, Shield, ShieldOff } from 'lucide-react'
import { mockProjects } from '../../data/projects'
import { mockFolders } from '../../data/folders'

export default function UserDetailsModal({ user, onClose, theme }) {
  // Get projects created by this user
  const createdProjects = mockProjects.filter(project => project.authorId === user.id)
  
  // Get projects where user is a collaborator
  const collaboratedProjects = mockProjects.filter(project => 
    project.collaborators && project.collaborators.some(collab => collab.id === user.id)
  )
  
  // Get folders owned by this user (mock data doesn't have owner IDs, so we'll match by name)
  const userFolders = mockFolders.filter(folder => 
    folder.owner && folder.owner.toLowerCase().includes(user.name.toLowerCase())
  )

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

  return (
    <>
      {/* Backdrop */}
      <div style={{ margin: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div style={{ margin: 0 }} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl z-50 ${
        theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-gray-300'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
            }`}>
              <User className={`w-8 h-8 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {user.name}
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                {user.email}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-5 h-5 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Total Projects
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.projectsCount}
                  </p>
                </div>
                <FolderOpen className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Created
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {createdProjects.length}
                  </p>
                </div>
                <FolderOpen className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Collaborated
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {collaboratedProjects.length}
                  </p>
                </div>
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Folders
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {userFolders.length}
                  </p>
                </div>
                <FolderOpen className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Joined
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Last Login
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.lastLogin}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {user.role === 'admin' ? (
                  <Shield className="w-5 h-5 text-red-500" />
                ) : (
                  <ShieldOff className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`} />
                )}
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Role
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Status
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Created Projects */}
          {createdProjects.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Created Projects ({createdProjects.length})
              </h3>
              <div className="space-y-3">
                {createdProjects.map((project) => (
                  <div key={project.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.name}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.isPublic 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {project.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaborated Projects */}
          {collaboratedProjects.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Collaborated Projects ({collaboratedProjects.length})
              </h3>
              <div className="space-y-3">
                {collaboratedProjects.map((project) => (
                  <div key={project.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.name}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                        }`}>
                          Created by {project.author}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                        }`}>
                          {project.collaborators?.length || 0} collaborators
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Folders */}
          {userFolders.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Folders ({userFolders.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFolders.map((folder) => (
                  <div key={folder.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: folder.color }}
                      >
                        <FolderOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {folder.name}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                        }`}>
                          {folder.count} projects
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}