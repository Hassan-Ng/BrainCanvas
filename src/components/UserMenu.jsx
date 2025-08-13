import { useEffect, useState } from 'react';
import { User, Settings, Sun, Moon, HelpCircle } from 'lucide-react';

export default function UserMenu({ theme, onToggleTheme, user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <div className="relative">
        {/* User Avatar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-zinc-800 border border-zinc-600 text-white hover:bg-zinc-700'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg'
          }`}
          title="User menu"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <User className={`w-4 h-4 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
              }`} />
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <div className={`absolute left-0 bottom-full mb-2 w-48 rounded-lg shadow-lg z-50 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-700'
                : 'bg-white border border-gray-200'
            }`}>
              <div className="py-1">
                {/* Profile Section */}
                <div className={`px-4 py-3 border-b ${
                  theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                    }`}>
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <User className={`w-4 h-4 ${
                            theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
                          }`} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {user ? user.email : 'Local session'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <button
                  onClick={() => {
                    onToggleTheme();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
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
                  className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={16} />
                  <span className="ml-3">Settings</span>
                </button>

                <button
                  className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <HelpCircle size={16} />
                  <span className="ml-3">Help & Support</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}