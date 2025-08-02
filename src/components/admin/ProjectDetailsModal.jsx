import React from 'react'
import { X, FolderOpen, User, Users, Globe, Lock, Calendar, MessageSquare, Eye, UserCheck } from 'lucide-react'
import { mockUsers } from '../../data/users'

export default function ProjectDetailsModal({ project, onClose, theme }) {
  // Get collaborator details from mockUsers
  // const collaboratorDetails = project.collaborators?.map(collab => 
  //   mockUsers.find(user => user.id === collab.id) || collab
  // ) || []

  // Get author details
  const author = mockUsers.find(user => user.id === project.ownerId) || { name: project.owner }

  // Mock active users and spectators for public projects
  const activeUsers = project.isPublic ? [
    { id: 1, name: 'John Doe', status: 'editing' },
    { id: 2, name: 'Sarah Chen', status: 'viewing' },
    { id: 3, name: 'Mike Johnson', status: 'editing' },
  ] : []

  const spectators = project.isPublic ? [
    { id: 4, name: 'Emma Davis', joinedAt: '2 minutes ago' },
    { id: 5, name: 'Alex Rivera', joinedAt: '5 minutes ago' },
    { id: 6, name: 'James Wilson', joinedAt: '12 minutes ago' },
  ] : []

  const getStatusColor = (status) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return 'bg-green-900/30 text-green-300'
        case 'archived': return 'bg-gray-700 text-gray-300'
        default: return 'bg-blue-900/30 text-blue-300'
      }
    }
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
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
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
            }`}>
              <FolderOpen className={`w-8 h-8 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              }`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {project.name}
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="flex items-center space-x-1">
                  {project.isPublic ? (
                    <>
                      <Globe className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Public</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600">Private</span>
                    </>
                  )}
                </div>
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
          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Collaborators
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {project.collaborators || 0}
                  </p>
                </div>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Comments
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {project.comments}
                  </p>
                </div>
                <MessageSquare className="w-6 h-6 text-green-500" />
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
                    {new Date(project.created).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Last Modified
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(project.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Project Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Owner
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {author.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Location
                  </p>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {project.location || 'Workspace'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Private Project - Collaborators and Author */}
          {!project.isPublic && (
            <>
              {/* Author */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Project Author
                </h3>
                <div className={`p-4 rounded-lg border ${
                  theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                    }`}>
                      <User className={`w-6 h-6 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {author.name}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        {author.email || 'Project Owner'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collaborators */}
              {collaboratorDetails.length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Collaborators ({collaboratorDetails.length})
                  </h3>
                  <div className="space-y-3">
                    {collaboratorDetails.map((collaborator) => (
                      <div key={collaborator.id} className={`p-4 rounded-lg border ${
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                            }`}>
                              <User className={`w-5 h-5 ${
                                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                              }`} />
                            </div>
                            <div>
                              <h4 className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {collaborator.name}
                              </h4>
                              <p className={`text-sm ${
                                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                              }`}>
                                {collaborator.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              collaborator.active ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className={`text-sm ${
                              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                            }`}>
                              {collaborator.active ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Public Project - Active Users and Spectators */}
          {project.isPublic && (
            <>
              {/* Active Users */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Active Users ({activeUsers.length})
                </h3>
                <div className="space-y-3">
                  {activeUsers.map((user) => (
                    <div key={user.id} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                          }`}>
                            <User className={`w-5 h-5 ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {user.name}
                            </h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                            }`}>
                              Currently {user.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            user.status === 'editing' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spectators */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Recent Spectators ({spectators.length})
                </h3>
                <div className="space-y-3">
                  {spectators.map((spectator) => (
                    <div key={spectator.id} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                          }`}>
                            <Eye className={`w-5 h-5 ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {spectator.name}
                            </h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                            }`}>
                              Joined {spectator.joinedAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${
                            theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                          }`}>
                            Viewing
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}