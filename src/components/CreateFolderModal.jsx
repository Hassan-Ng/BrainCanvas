import React, { useState, useEffect } from 'react'
import { X, Folder, Palette } from 'lucide-react'

const colorOptions = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#84cc16', // Lime
]

export default function CreateFolderModal({ onClose, onCreateFolder, theme = 'dark' }) {
  const [folderData, setFolderData] = useState({
    name: '',
    color: colorOptions[0]
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const validateForm = () => {
    const newErrors = {}
    
    if (!folderData.name.trim()) {
      newErrors.name = 'Folder name is required'
    } else if (folderData.name.trim().length < 2) {
      newErrors.name = 'Folder name must be at least 2 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    const folderPayload = {
      ...folderData,
      name: folderData.name.trim(),
    }
    onCreateFolder(folderPayload)
  }

  const handleChange = (field, value) => {
    setFolderData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg shadow-xl z-50 transition-colors ${
        theme === 'dark'
          ? 'bg-zinc-900 border border-zinc-700'
          : 'bg-white border border-gray-300'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b transition-colors ${
          theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Create New Folder
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-4 h-4 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Folder Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              Folder Name *
            </label>
            <input
              type="text"
              value={folderData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter folder name"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name 
                  ? 'border-red-500' 
                  : theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              autoFocus
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Folder Color</span>
              </div>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    folderData.color === color
                      ? 'border-white shadow-lg scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {folderData.color === color && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}>
              Preview
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: folderData.color }}
              >
                <Folder className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {folderData.name || 'Folder Name'}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}>
                  0 projects
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark'
                  ? 'text-zinc-300 hover:bg-zinc-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </>
  )
}