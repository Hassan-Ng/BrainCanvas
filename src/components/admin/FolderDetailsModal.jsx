import React from 'react'
import { X, Folder, FolderOpen, User, Calendar, Palette, Globe, Lock } from 'lucide-react'
import { mockProjects } from '../../data/projects'

export default function FolderDetailsModal({ folder, onClose, theme }) {
  // Get projects that would belong to this folder (mock relationship)
  // In a real app, projects would have a folderId field
  const folderProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(folder.name.toLowerCase().split(' ')[0]) ||
    project.description.toLowerCase().includes(folder.name.toLowerCase().split(' ')[0])
  ).slice(0, folder.projectCount)

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
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: folder.color }}
            >
              <Folder className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {folder.name}
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                {folder.projectCount} projects • Created by {folder.owner}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  Color: {folder.color}
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
          {/* Folder Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Total Projects
                  </p>
                  <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {folder.projectCount}
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
                    {new Date(folder.created).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-green-500" />
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
                    {new Date(folder.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Folder Information */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Folder Information
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
                    {folder.owner}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Palette className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Color Theme
                  </p>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: folder.color }}
                    />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {folder.color}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects in Folder */}
          {folderProjects.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Projects in this Folder ({folderProjects.length})
              </h3>
              <div className="space-y-3">
                {folderProjects.map((project) => (
                  <div key={project.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                        }`}>
                          <FolderOpen className={`w-5 h-5 ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                          }`} />
                        </div>
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
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                          }`}>
                            Created by {project.owner || project.author}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          {project.isPublic ? (
                            <>
                              <Globe className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-600">Public</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-orange-500" />
                              <span className="text-xs text-orange-600">Private</span>
                            </>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'active' 
                            ? theme === 'dark'
                              ? 'bg-green-900/30 text-green-300'
                              : 'bg-green-100 text-green-800'
                            : theme === 'dark'
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {folderProjects.length === 0 && (
            <div className={`text-center py-12 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
              <p className="text-sm">
                This folder doesn't contain any projects yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}