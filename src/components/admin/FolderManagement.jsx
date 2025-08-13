import React, { useState, useEffect } from 'react'
import { 
  Folder, 
  Search, 
  Trash2, 
  FolderOpen,
  Palette
} from 'lucide-react'
import FolderDetailsModal from './FolderDetailsModal'

export default function FolderManagement({ theme }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'Design Projects',
      color: '#3b82f6',
      projectCount: 8,
      created: '2024-01-15',
      lastModified: '2024-01-20',
      owner: 'Sarah Chen'
    },
    {
      id: 2,
      name: 'Marketing Assets',
      color: '#10b981',
      projectCount: 12,
      created: '2024-01-10',
      lastModified: '2024-01-19',
      owner: 'Mike Johnson'
    },
    {
      id: 3,
      name: 'Product Planning',
      color: '#f59e0b',
      projectCount: 5,
      created: '2024-01-05',
      lastModified: '2024-01-18',
      owner: 'Alex Rivera'
    },
    {
      id: 4,
      name: 'User Research',
      color: '#ef4444',
      projectCount: 3,
      created: '2024-01-01',
      lastModified: '2024-01-17',
      owner: 'Emma Davis'
    }
  ])

  const [filteredFolders, setFilteredFolders] = useState(folders)
  const [contextMenu, setContextMenu] = useState(null)
  const [showFolderDetailsModal, setShowFolderDetailsModal] = useState(false)
  const [selectedFolderForDetails, setSelectedFolderForDetails] = useState(null)

  useEffect(() => {
    let filtered = folders

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(folder =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.owner.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredFolders(filtered)
  }, [folders, searchQuery])

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
  const handleFolderAction = (action, folderId) => {
    switch (action) {
      case 'delete':
        if (window.confirm('Are you sure you want to delete this folder? All projects in this folder will be moved to "Unsorted".')) {
          setFolders(folders.filter(f => f.id !== folderId))
        }
        break
    }
    setContextMenu(null)
  }

  const handleFolderClick = (folder) => {
    setSelectedFolderForDetails(folder)
    setShowFolderDetailsModal(true)
  }

  const handleContextMenu = (e, folder) => {
    e.preventDefault()
    setContextMenu({
      folderId: folder.id,
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
            Folder Management
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Organize and manage project folders
          </p>
        </div>
      </div>

      {/* Search */}
      <div className={`p-4 rounded-lg border ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>
        <div className={`text-sm mt-2 ${
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          Showing {filteredFolders.length} of {folders.length} folders
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Total Folders
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {folders.length}
              </p>
            </div>
            <Folder className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Total Projects
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {folders.reduce((sum, folder) => sum + folder.projectCount, 0)}
              </p>
            </div>
            <FolderOpen className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className={`p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Avg Projects/Folder
              </p>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {Math.round(folders.reduce((sum, folder) => sum + folder.projectCount, 0) / folders.length) || 0}
              </p>
            </div>
            <Palette className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFolders.map((folder) => (
          <div
            key={folder.id}
            className={`p-6 rounded-lg border cursor-pointer transition-all hover:shadow-lg relative ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleFolderClick(folder)}
            onContextMenu={(e) => handleContextMenu(e, folder)}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: folder.color }}
              >
                <Folder className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {folder.name}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                {folder.projectCount} projects
              </p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                Created by {folder.owner}
              </p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}>
                Modified {new Date(folder.lastModified).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
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
              onClick={() => handleFolderAction('delete', contextMenu.folderId)}
              className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-zinc-800'
                  : 'text-red-600 hover:bg-gray-100'
              }`}
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Delete Folder
            </button>
          </div>
        </>
      )}

      {/* Folder Details Modal */}
      {showFolderDetailsModal && selectedFolderForDetails && (
        <FolderDetailsModal
          folder={selectedFolderForDetails}
          onClose={() => {
            setShowFolderDetailsModal(false)
            setSelectedFolderForDetails(null)
          }}
          theme={theme}
        />
      )}
    </div>
  )
}