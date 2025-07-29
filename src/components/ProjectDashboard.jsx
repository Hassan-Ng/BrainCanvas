import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Sparkles, FileText, Search, Users, MoreHorizontal, Layers, Home, FolderOpen, Clock, Star, Settings, User, ChevronDown, Sun, Moon, LogOut, HelpCircle, Heart, Trash2, Copy, Lock, Unlock, Compass, Folder, X } from 'lucide-react'
import { mockProjects } from '../data/projects'
import { mockFolders } from '../data/folders'
import CreateProjectModal from './CreateProjectModal'
import CreateFolderModal from './CreateFolderModal'

export default function ProjectDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)

  // State to hold the fetched projects
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // Mock folders data (assuming folders might still be local or fetched separately)
  const [folders, setFolders] = useState(mockFolders);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  // Effect to fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        setProjectsError(null); // Clear any previous errors

        const response = await fetch('http://braincanvasapi-production.up.railway.app/api/projects');

        if (!response.ok) {
          // If the HTTP response status is not 2xx, throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data); // Update the projects state with fetched data
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjectsError('Failed to load projects. Please try again later.');
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowCreateModal(false)
        setShowHelpModal(false)
        setShowProfileMenu(false)
        setContextMenu(null)
        setShowCreateFolderModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null)
      setShowProfileMenu(false)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const getFilteredProjects = () => {
    let filteredProjects = projects
    
    if (activeTab === 'Explore') {
      filteredProjects = projects.filter(p => p.isPublic)
    } else if (activeTab === 'Created by Me') {
      filteredProjects = projects.filter(p => !p.isPublic)
    }
    
    if (searchQuery) {
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filteredProjects
  }

  const filteredProjects = getFilteredProjects()

  const handleOpenProject = (project) => {
    navigate(`/project/${project.id}`)
  }

  const handleContextMenu = (e, project) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      project
    })
  }

  const handleToggleFavorite = (projectId) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
    ))
    setContextMenu(null)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleCreateFolder = (folderData) => {
    const newFolder = {
      id: Date.now(),
      name: folderData.name,
      color: folderData.color || '#3B82F6',
      count: 0
    }
    setFolders(prev => [...prev, newFolder])
    setShowCreateFolderModal(false)
  }

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      name: projectData.name,
      description: projectData.description || '',
      location: 'Projects',
      created: 'Just now',
      edited: 'Just now',
      comments: 0,
      isFavorite: false,
      isPublic: projectData.isPublic || false,
      collaborators: [{ active: true }],
      canvasData: { shapes: [] }
    }
    setProjects(prev => [...prev, newProject])
    setShowCreateModal(false)
  }

  const shortcuts = [
    { key: 'Ctrl/Cmd + K', description: 'Quick search' },
    { key: 'Ctrl/Cmd + N', description: 'New project' },
    { key: 'Ctrl/Cmd + Shift + F', description: 'New folder' },
    { key: 'Escape', description: 'Close modals' },
    { key: 'Tab', description: 'Navigate tabs' },
    { key: 'Enter', description: 'Open selected project' },
    { key: 'Delete', description: 'Delete selected item' },
    { key: 'F1', description: 'Show help' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 flex ${
      theme === 'dark' ? 'bg-[#171717] text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Sidebar */}
      <div className={`w-64 border-r flex flex-col transition-colors duration-300 ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-300'
      }`}>
        {/* Logo */}
        <div className={`px-6 border-b h-16 flex items-center transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">BrainCanvas</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {[
              { id: 'All', icon: Home, label: 'Home' },
              { id: 'Explore', icon: Compass, label: 'Explore' },
              { id: 'Recents', icon: Clock, label: 'Recent' },
              { id: 'Created by Me', icon: Star, label: 'Starred' },
              { id: 'Folders', icon: FolderOpen, label: 'Folders' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === id
                    ? theme === 'dark'
                      ? 'bg-zinc-800 text-white'
                      : 'bg-gray-200 text-gray-900'
                    : theme === 'dark'
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Section */}
        <div className={`p-4 border-t transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowProfileMenu(!showProfileMenu)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
              }`}>
                <User className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Guest User
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`}>
                  Local session
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`border-b px-6 h-16 flex items-center transition-colors duration-300 ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-300'
        }`}>
          <div className="flex items-center space-x-4 w-full">
            {/* Search */}
            <div className="relative grow">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                /
              </div>
            </div>

            {/* Keyboard shortcut */}
            <div className={`text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`}>
              Ctrl K
            </div>

            {/* User avatars */}
            <div className="flex -space-x-2">
              <div className={`w-8 h-8 rounded-full border-2 ${
                theme === 'dark' ? 'bg-zinc-600 border-zinc-800' : 'bg-gray-300 border-white'
              }`}></div>
              <div className={`w-8 h-8 rounded-full border-2 ${
                theme === 'dark' ? 'bg-zinc-500 border-zinc-800' : 'bg-gray-400 border-white'
              }`}></div>
              <div className={`w-8 h-8 rounded-full border-2 ${
                theme === 'dark' ? 'bg-zinc-400 border-zinc-800' : 'bg-gray-500 border-white'
              }`}></div>
            </div>

            {/* Invite button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
              <Users className="w-4 h-4" />
              <span>Invite</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'Folders' ? (
            /* Folders View */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Folders
                </h2>
                <button
                  onClick={() => setShowCreateFolderModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
                >
                  <Folder className="w-4 h-4" />
                  <span>New Folder</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className={`p-6 rounded-lg border cursor-pointer transition-colors hover:border-opacity-60 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: folder.color }}
                      >
                        <FolderOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {folder.name}
                        </h3>
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
          ) : (
            /* Projects View */
            <>
              {/* Page Title */}
              <div className="mb-8">
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {activeTab === 'All' && 'My Projects'}
                  {activeTab === 'Explore' && 'Explore Public Projects'}
                  {activeTab === 'Recents' && 'Recent Projects'}
                  {activeTab === 'Created by Me' && 'My Created Projects'}
                  {activeTab === 'Unsorted' && 'Unsorted Projects'}
                </h2>
                {activeTab === 'Explore' && (
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Discover public projects from the community
                  </p>
                )}
              </div>

              {/* Create Cards */}
              {activeTab !== 'Explore' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className={`border border-dashed rounded-lg p-8 transition-colors group ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-12 h-12 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
                        theme === 'dark'
                          ? 'border-zinc-600 group-hover:border-zinc-500'
                          : 'border-gray-400 group-hover:border-gray-500'
                      }`}>
                        <Plus className={`w-6 h-6 transition-colors ${
                          theme === 'dark'
                            ? 'text-zinc-400 group-hover:text-zinc-300'
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-medium transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-300 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        Create a Blank File
                      </span>
                    </div>
                  </button>

                  <button className={`border rounded-lg p-8 transition-colors group ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        theme === 'dark'
                          ? 'bg-zinc-800 group-hover:bg-zinc-700'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <Sparkles className={`w-6 h-6 transition-colors ${
                          theme === 'dark'
                            ? 'text-zinc-400 group-hover:text-zinc-300'
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-medium transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-300 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        Generate an AI Diagram
                      </span>
                    </div>
                  </button>

                  <button className={`border rounded-lg p-8 transition-colors group ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        theme === 'dark'
                          ? 'bg-zinc-800 group-hover:bg-zinc-700'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <FileText className={`w-6 h-6 transition-colors ${
                          theme === 'dark'
                            ? 'text-zinc-400 group-hover:text-zinc-300'
                            : 'text-gray-500 group-hover:text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-medium transition-colors ${
                        theme === 'dark'
                          ? 'text-zinc-300 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        Generate an AI outline
                      </span>
                    </div>
                  </button>
                </div>
              )}

              {/* Projects Table Header */}
              <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium uppercase tracking-wider border-b ${
                theme === 'dark'
                  ? 'text-zinc-400 border-zinc-800'
                  : 'text-gray-500 border-gray-200'
              }`}>
                <div className="col-span-4">Name</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Created</div>
                <div className="col-span-2">Edited</div>
                <div className="col-span-1">Comments</div>
                <div className="col-span-1">{activeTab === 'Explore' ? 'Author' : 'Owner'}</div>
              </div>

              {/* Projects List */}
              <div className="space-y-1">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleOpenProject(project)}
                    onContextMenu={(e) => handleContextMenu(e, project)}
                    className={`grid grid-cols-12 gap-4 px-4 py-4 rounded-lg cursor-pointer transition-colors group ${
                      theme === 'dark'
                        ? 'hover:bg-zinc-800/50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="col-span-4 flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded border flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-zinc-700 border-zinc-600'
                          : 'bg-gray-100 border-gray-300'
                      }`}>
                        <FileText className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-medium transition-colors ${
                          theme === 'dark'
                            ? 'text-white group-hover:text-blue-400'
                            : 'text-gray-900 group-hover:text-blue-600'
                        }`}>
                          {project.name}
                          {project.isFavorite && (
                            <Heart className="inline w-4 h-4 ml-2 text-red-500 fill-current" />
                          )}
                          {project.isPublic && activeTab !== 'Explore' && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              theme === 'dark'
                                ? 'bg-green-900 text-green-300'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              Public
                            </span>
                          )}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </div>
                        {activeTab === 'Explore' && (
                          <div className={`text-xs mt-1 flex items-center space-x-2 ${
                            theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                          }`}>
                            <span>👥 {project.collaborators.filter(c => c.active).length} active</span>
                            <span>•</span>
                            <span>💬 {project.comments} comments</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`col-span-2 flex items-center text-sm ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      {project.location}
                    </div>
                    <div className={`col-span-2 flex items-center text-sm ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      {project.created}
                    </div>
                    <div className={`col-span-2 flex items-center text-sm ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      {project.edited}
                    </div>
                    <div className={`col-span-1 flex items-center text-sm ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      {project.comments}
                    </div>
                    <div className="col-span-1 flex items-center justify-between">
                      <div className={`w-6 h-6 rounded-full ${
                        theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
                      }`}></div>
                      {activeTab !== 'Explore' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleContextMenu(e, project)
                          }}
                          className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                            theme === 'dark'
                              ? 'hover:bg-zinc-700'
                              : 'hover:bg-gray-200'
                          }`}
                        >
                          <MoreHorizontal className={`w-4 h-4 ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                          }`} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className={`text-lg mb-2 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    No projects found
                  </div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
                  }`}>
                    Try adjusting your search or create a new project
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Help Button - Bottom Right */}
      <button
        onClick={() => setShowHelpModal(true)}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-40 ${
          theme === 'dark'
            ? 'bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        title="Help & Shortcuts"
      >
        <HelpCircle size={20} />
      </button>

      {/* Help Modal */}
      {showHelpModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50" 
            onClick={() => setShowHelpModal(false)}
          />
          
          {/* Modal Content */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl z-50 ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-700 text-white'
              : 'bg-white border border-gray-200 text-gray-900'
          }`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
            }`}>
              <h2 className="text-xl font-semibold">Help & Shortcuts</h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="text-lg font-medium mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {shortcut.description}
                      </span>
                      <kbd className={`px-2 py-1 text-xs font-mono rounded ${
                        theme === 'dark'
                          ? 'bg-zinc-800 border border-zinc-600 text-gray-300'
                          : 'bg-gray-100 border border-gray-300 text-gray-700'
                      }`}>
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-lg font-medium mb-4">Navigation</h3>
                <div className={`space-y-2 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>• <strong>Home:</strong> View your personal projects</p>
                  <p>• <strong>Explore:</strong> Discover public projects</p>
                  <p>• <strong>Recent:</strong> Access recently edited projects</p>
                  <p>• <strong>Starred:</strong> View your favorite projects</p>
                  <p>• <strong>Folders:</strong> Organize projects into custom folders</p>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-lg font-medium mb-4">Tips</h3>
                <div className={`space-y-2 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>• Right-click on projects for quick actions</p>
                  <p>• Use the search bar to quickly find projects</p>
                  <p>• Create folders to organize your work</p>
                  <p>• Explore public projects for inspiration</p>
                  <p>• Toggle between light and dark themes in your profile menu</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Context Menu */}
      {contextMenu && (
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
            onClick={() => handleToggleFavorite(contextMenu.project.id)}
            className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-4 h-4 mr-3 ${
              contextMenu.project.isFavorite ? 'text-red-500 fill-current' : ''
            }`} />
            {contextMenu.project.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
          <button
            className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Copy className="w-4 h-4 mr-3" />
            Duplicate
          </button>
          <button
            className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
              theme === 'dark'
                ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {contextMenu.project.isPublic ? <Lock className="w-4 h-4 mr-3" /> : <Unlock className="w-4 h-4 mr-3" />}
            Make {contextMenu.project.isPublic ? 'private' : 'public'}
          </button>
          <div className={`border-t my-1 ${
            theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
          }`} />
          <button
            className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-zinc-800'
                : 'text-red-600 hover:bg-gray-100'
            }`}
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Delete
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreateProject={handleCreateProject}
          theme={theme}
        />
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <CreateFolderModal
          onClose={() => setShowCreateFolderModal(false)}
          onCreateFolder={handleCreateFolder}
          theme={theme}
        />
      )}
    </div>
  )
}