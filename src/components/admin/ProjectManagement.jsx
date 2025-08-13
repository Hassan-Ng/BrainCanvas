import React, { useState, useEffect } from 'react'
import { 
  FolderOpen, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Lock, 
  Unlock,
  Users,
  Calendar,
  MessageSquare,
  Star,
  Globe,
  Plus
} from 'lucide-react'
import ProjectDetailsModal from './ProjectDetailsModal'

export default function ProjectManagement({ theme, searchQuery }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Marketing Campaign Design',
      description: 'Visual designs for Q1 marketing campaign',
      owner: 'Sarah Chen',
      ownerId: 1,
      isPublic: false,
      collaborators: [1, 2],
      comments: 12,
      created: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      name: 'Product Roadmap 2024',
      description: 'Strategic planning and feature roadmap',
      owner: 'Mike Johnson',
      ownerId: 2,
      isPublic: true,
      collaborators: [2, 3],
      comments: 8,
      created: '2024-01-10',
      lastModified: '2024-01-19',
      status: 'active'
    },
    {
      id: 3,
      name: 'User Flow Diagrams',
      description: 'Complete user journey mapping',
      owner: 'Alex Rivera',
      ownerId: 3,
      isPublic: false,
      collaborators: [3, 1],
      comments: 15,
      created: '2024-01-05',
      lastModified: '2024-01-18',
      status: 'archived'
    }
  ])

  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedProjects, setSelectedProjects] = useState([])
  const [filterVisibility, setFilterVisibility] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [contextMenu, setContextMenu] = useState(null)
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState(null)

  useEffect(() => {
    let filtered = projects

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.owner.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply visibility filter
    if (filterVisibility !== 'all') {
      filtered = filtered.filter(project => 
        filterVisibility === 'public' ? project.isPublic : !project.isPublic
      )
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === filterStatus)
    }

    setFilteredProjects(filtered)
  }, [projects, searchQuery, filterVisibility, filterStatus])

  const handleProjectAction = (action, projectId) => {
    switch (action) {
      case 'edit':
        console.log('Edit project:', projectId)
        break
      case 'delete':
        if (window.confirm('Are you sure you want to delete this project?')) {
          setProjects(projects.filter(p => p.id !== projectId))
        }
        break
      case 'toggleVisibility':
        setProjects(projects.map(p => 
          p.id === projectId ? { ...p, isPublic: !p.isPublic } : p
        ))
        break
      case 'archive':
        setProjects(projects.map(p => 
          p.id === projectId ? { ...p, status: 'archived' } : p
        ))
        break
      case 'restore':
        setProjects(projects.map(p => 
          p.id === projectId ? { ...p, status: 'active' } : p
        ))
        break
    }
    setContextMenu(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const handleRowClick = (project) => {
    setSelectedProjectForDetails(project)
    setShowProjectDetailsModal(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Project Management
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Manage all projects, visibility, and collaborations
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={16} />
          <span>Create Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Total Projects
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {projects.length}
              </p>
            </div>
            <FolderOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Public Projects
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {projects.filter(p => p.isPublic).length}
              </p>
            </div>
            <Globe className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Private Projects
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {projects.filter(p => !p.isPublic).length}
              </p>
            </div>
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Archived
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {projects.filter(p => p.status === 'archived').length}
              </p>
            </div>
            <FolderOpen className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-lg border space-y-4 ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
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
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className={`border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
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
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className={`text-sm ${
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Table */}
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
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProjects(filteredProjects.map(p => p.id))
                      } else {
                        setSelectedProjects([])
                      }
                    }}
                  />
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Project
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Owner
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Visibility
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Collaborators
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Last Modified
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-zinc-700' : 'divide-gray-200'
            }`}>
              {filteredProjects.map((project) => (
                <tr key={project.id} className={`cursor-pointer ${
                    theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'
                  } transition-colors`}
                  onClick={() => handleRowClick(project)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedProjects.includes(project.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProjects([...selectedProjects, project.id])
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== project.id))
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}>
                        <FolderOpen className={`w-5 h-5 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.name}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`}>
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'
                  }`}>
                    {project.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
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
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-900'
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.collaborators}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    {new Date(project.lastModified).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setContextMenu(contextMenu?.projectId === project.id ? null : {
                            projectId: project.id,
                            x: e.clientX,
                            y: e.clientY
                          })
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
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
            <button
              onClick={() => handleProjectAction('edit', contextMenu.projectId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Edit className="w-4 h-4 mr-3" />
              Edit Project
            </button>
            <button
              onClick={() => handleProjectAction('toggleVisibility', contextMenu.projectId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {projects.find(p => p.id === contextMenu.projectId)?.isPublic ? (
                <>
                  <Lock className="w-4 h-4 mr-3" />
                  Make Private
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 mr-3" />
                  Make Public
                </>
              )}
            </button>
            <button
              onClick={() => handleProjectAction('archive', contextMenu.projectId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FolderOpen className="w-4 h-4 mr-3" />
              Archive
            </button>
            <div className={`border-t my-1 ${
              theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
            }`} />
            <button
              onClick={() => handleProjectAction('delete', contextMenu.projectId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-zinc-800'
                  : 'text-red-600 hover:bg-gray-100'
              }`}
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Delete Project
            </button>
          </div>
        </>
      )}

      {/* Project Details Modal */}
      {showProjectDetailsModal && selectedProjectForDetails && (
        <ProjectDetailsModal
          project={selectedProjectForDetails}
          onClose={() => {
            setShowProjectDetailsModal(false)
            setSelectedProjectForDetails(null)
          }}
          theme={theme}
        />
      )}
    </div>
  )
}