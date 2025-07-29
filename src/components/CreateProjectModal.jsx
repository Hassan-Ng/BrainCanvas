import React, { useState, useEffect } from 'react'
import { X, ArrowLeft, ArrowRight, Search, User, Lock, Globe } from 'lucide-react'
import { mockUsers } from '../data/users'

export default function CreateProjectModal({ onClose, onCreateProject, theme = 'dark' }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    isPublic: true,
    collaborators: []
  })
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddCollaborator = (user) => {
    if (!projectData.collaborators.find(c => c.id === user.id)) {
      setProjectData({
        ...projectData,
        collaborators: [...projectData.collaborators, user]
      })
    }
  }

  const handleRemoveCollaborator = (userId) => {
    setProjectData({
      ...projectData,
      collaborators: projectData.collaborators.filter(c => c.id !== userId)
    })
  }

  const handleCreate = () => {
    onCreateProject(projectData)
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return projectData.name.trim() !== ''
    }
    return true
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
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className={`p-1 rounded transition-colors ${
                  theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                }`} />
              </button>
            )}
            <h2 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Create New Project
            </h2>
          </div>
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

        {/* Progress Indicator */}
        <div className={`px-6 py-4 border-b transition-colors ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                      ? 'bg-green-600 text-white'
                      : theme === 'dark'
                        ? 'bg-zinc-700 text-zinc-400'
                        : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 ${
                    step < currentStep 
                      ? 'bg-green-600' 
                      : theme === 'dark' 
                        ? 'bg-zinc-700' 
                        : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={`mt-2 text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Step {currentStep} of 3
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Project Name *
                </label>
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                  placeholder="Enter project name"
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  autoFocus
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  placeholder="Brief description of your project"
                  rows={3}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Step 2: Privacy Settings */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Project Visibility
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      checked={projectData.isPublic}
                      onChange={() => setProjectData({ ...projectData, isPublic: true })}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Globe className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Public
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        Anyone can view and collaborate on this project
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      checked={!projectData.isPublic}
                      onChange={() => setProjectData({ ...projectData, isPublic: false })}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Lock className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                        }`} />
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Private
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}>
                        Only you and invited collaborators can access
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Collaborators (only for private projects) */}
          {currentStep === 3 && !projectData.isPublic && (
            <div className="space-y-4">
              <div>
                <h3 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  Add Collaborators
                </h3>
                
                {/* Search */}
                <div className="relative mb-4">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search team members"
                    className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Selected Collaborators */}
                {projectData.collaborators.length > 0 && (
                  <div className="mb-4">
                    <div className={`text-xs font-medium mb-2 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                    }`}>
                      SELECTED ({projectData.collaborators.length})
                    </div>
                    <div className="space-y-2">
                      {projectData.collaborators.map((user) => (
                        <div key={user.id} className={`flex items-center justify-between p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-zinc-600' : 'bg-gray-300'
                            }`}>
                              <User className={`w-4 h-4 ${
                                theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {user.name}
                              </div>
                              <div className={`text-xs ${
                                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                              }`}>
                                {user.email}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveCollaborator(user.id)}
                            className={`transition-colors ${
                              theme === 'dark'
                                ? 'text-zinc-400 hover:text-red-400'
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Users */}
                <div>
                  <div className={`text-xs font-medium mb-2 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    TEAM MEMBERS
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredUsers.map((user) => {
                      const isSelected = projectData.collaborators.find(c => c.id === user.id)
                      return (
                        <button
                          key={user.id}
                          onClick={() => handleAddCollaborator(user)}
                          disabled={isSelected}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                            isSelected 
                              ? theme === 'dark'
                                ? 'bg-zinc-800 opacity-50 cursor-not-allowed'
                                : 'bg-gray-100 opacity-50 cursor-not-allowed'
                              : theme === 'dark'
                                ? 'hover:bg-zinc-800'
                                : 'hover:bg-gray-100'
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
                              {user.name}
                            </div>
                            <div className={`text-xs ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                            }`}>
                              {user.email}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="text-xs text-green-400 font-medium">Added</div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Public Project Confirmation */}
          {currentStep === 3 && projectData.isPublic && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to Create
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}>
                Your public project will be visible to everyone and ready for collaboration.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 border-t transition-colors ${
          theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            {currentStep === 1 && 'Enter basic project information'}
            {currentStep === 2 && 'Choose who can access your project'}
            {currentStep === 3 && (projectData.isPublic ? 'Ready to create your project' : 'Add team members to collaborate')}
          </div>
          <div className="flex items-center space-x-3">
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                  canProceed()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : theme === 'dark'
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}