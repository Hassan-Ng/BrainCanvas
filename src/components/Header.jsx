import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, UserPlus, Lock, Unlock, ChevronDown, User } from 'lucide-react';

export default function Header({ theme, project }) {
  const navigate = useNavigate();
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className={`absolute top-2 left-2 right-2 rounded-lg px-4 py-3 flex items-center justify-between z-50 transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-zinc-900 border border-zinc-700 text-white'
        : 'bg-white border border-gray-300 text-gray-700 shadow-lg'
    }`}>
      {/* Logo and App Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBackToDashboard}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Layers size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-700'} />
        </button>
        <h1 className="text-lg font-semibold">BrainCanvas</h1>
      </div>

      {/* Project Info (Center) */}
      {project && (
        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {project.isPublic ? (
              <Unlock size={16} className="text-green-500" />
            ) : (
              <Lock size={16} className="text-orange-500" />
            )}
            <span className="font-medium">{project.name}</span>
            <ChevronDown size={16} className={`transition-transform ${showProjectDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Project Dropdown */}
          {showProjectDropdown && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowProjectDropdown(false)}
              />
              
              {/* Dropdown Content */}
              <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-80 rounded-lg shadow-lg z-50 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border border-zinc-700'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="p-4">
                  {/* Project Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                    }`}>
                      <Layers size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-700'} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {project.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Privacy Status */}
                  <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                  }`}>
                    {project.isPublic ? (
                      <>
                        <Unlock size={16} className="text-green-500" />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Public Project
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          • Anyone can view
                        </span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} className="text-orange-500" />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Private Project
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          • Invite only
                        </span>
                      </>
                    )}      
                  </div>

                  {/* Active Users */}
                  {/* <div className="mb-4">
                    <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Active Users ({project.collaborators.filter(c => c.active).length})
                    </div>
                    <div className="space-y-2">
                      {project.collaborators.filter(c => c.active).map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                          <div className="relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                            }`}>
                              <User size={14} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {user.name}
                            </div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* All Collaborators (for private projects) */}
                  {!project.isPublic && (
                    <div>
                      <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        All Collaborators ({project.collaborators.length})
                      </div>
                      <div className="space-y-2">
                        {project.collaborators.map((user) => (
                          <div key={user.id} className="flex items-center gap-3">
                            <div className="relative">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
                              }`}>
                                <User size={14} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                              </div>
                              {user.active && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                              )}
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {user.firstName} {user.lastName}
                              </div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {user.email}
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
          )}
        </div>
      )}

      {/* Share Button */}
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <UserPlus size={16} />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  );
}