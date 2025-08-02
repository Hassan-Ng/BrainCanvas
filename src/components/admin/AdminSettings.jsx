import React, { useState } from 'react'
import { 
  Settings, 
  Save, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Globe,
  Key,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

export default function AdminSettings({ theme }) {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'BrainCanvas',
    siteDescription: 'Collaborative whiteboard platform',
    allowRegistration: true,
    requireEmailVerification: false,
    defaultProjectVisibility: 'private',
    
    // Security Settings
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    requireStrongPasswords: true,
    enableTwoFactor: false,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@braincanvas.com',
    
    // Storage Settings
    maxFileSize: 10,
    maxStoragePerUser: 1000,
    enableFileUploads: true,
    
    // API Settings
    rateLimitRequests: 1000,
    rateLimitWindow: 60,
    enableApiLogging: true,
    
    // Notification Settings
    emailNotifications: true,
    systemAlerts: true,
    maintenanceMode: false
  })

  const [activeTab, setActiveTab] = useState('general')
  const [saveStatus, setSaveStatus] = useState(null)

  const handleSave = async () => {
    setSaveStatus('saving')
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 3000)
    }, 1000)
  }

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'storage', name: 'Storage', icon: Database },
    { id: 'api', name: 'API', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  const SettingGroup = ({ title, children }) => (
    <div className={`p-6 rounded-lg border mb-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const SettingItem = ({ label, description, children }) => (
    <div className="flex items-start justify-between">
      <div className="flex-1 mr-4">
        <label className={`block text-sm font-medium ${
          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
        {description && (
          <p className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <SettingGroup title="Site Configuration">
              <SettingItem
                label="Site Name"
                description="The name of your BrainCanvas instance"
              >
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>
              
              <SettingItem
                label="Site Description"
                description="Brief description of your platform"
              >
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows={3}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 resize-none ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>
            </SettingGroup>

            <SettingGroup title="User Registration">
              <SettingItem
                label="Allow New Registrations"
                description="Enable or disable new user sign-ups"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>

              <SettingItem
                label="Require Email Verification"
                description="Users must verify their email before accessing the platform"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>

              <SettingItem
                label="Default Project Visibility"
                description="Default visibility for new projects"
              >
                <select
                  value={settings.defaultProjectVisibility}
                  onChange={(e) => handleSettingChange('defaultProjectVisibility', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </SettingItem>
            </SettingGroup>
          </div>
        )

      case 'security':
        return (
          <div>
            <SettingGroup title="Authentication">
              <SettingItem
                label="Session Timeout (hours)"
                description="How long users stay logged in"
              >
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  min="1"
                  max="168"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="Max Login Attempts"
                description="Number of failed login attempts before account lockout"
              >
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  min="3"
                  max="10"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="Require Strong Passwords"
                description="Enforce password complexity requirements"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireStrongPasswords}
                    onChange={(e) => handleSettingChange('requireStrongPasswords', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>
            </SettingGroup>

            <SettingGroup title="System Security">
              <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
                theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'
              }`}>
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'
                  }`}>
                    Two-factor authentication is currently disabled. Enable it for enhanced security.
                  </p>
                </div>
              </div>
            </SettingGroup>
          </div>
        )

      case 'email':
        return (
          <div>
            <SettingGroup title="SMTP Configuration">
              <SettingItem
                label="SMTP Host"
                description="Your email server hostname"
              >
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="SMTP Port"
                description="Usually 587 for TLS or 465 for SSL"
              >
                <input
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="From Email Address"
                description="Email address used for system notifications"
              >
                <input
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>
            </SettingGroup>
          </div>
        )

      case 'storage':
        return (
          <div>
            <SettingGroup title="File Upload Settings">
              <SettingItem
                label="Enable File Uploads"
                description="Allow users to upload files to projects"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableFileUploads}
                    onChange={(e) => handleSettingChange('enableFileUploads', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>

              <SettingItem
                label="Max File Size (MB)"
                description="Maximum size for individual file uploads"
              >
                <input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  min="1"
                  max="100"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="Max Storage Per User (MB)"
                description="Total storage limit per user account"
              >
                <input
                  type="number"
                  value={settings.maxStoragePerUser}
                  onChange={(e) => handleSettingChange('maxStoragePerUser', parseInt(e.target.value))}
                  min="100"
                  max="10000"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>
            </SettingGroup>
          </div>
        )

      case 'api':
        return (
          <div>
            <SettingGroup title="Rate Limiting">
              <SettingItem
                label="Requests Per Window"
                description="Maximum API requests allowed per time window"
              >
                <input
                  type="number"
                  value={settings.rateLimitRequests}
                  onChange={(e) => handleSettingChange('rateLimitRequests', parseInt(e.target.value))}
                  min="100"
                  max="10000"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="Time Window (minutes)"
                description="Duration of the rate limiting window"
              >
                <input
                  type="number"
                  value={settings.rateLimitWindow}
                  onChange={(e) => handleSettingChange('rateLimitWindow', parseInt(e.target.value))}
                  min="1"
                  max="1440"
                  className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </SettingItem>

              <SettingItem
                label="Enable API Logging"
                description="Log all API requests for monitoring and debugging"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableApiLogging}
                    onChange={(e) => handleSettingChange('enableApiLogging', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>
            </SettingGroup>
          </div>
        )

      case 'notifications':
        return (
          <div>
            <SettingGroup title="System Notifications">
              <SettingItem
                label="Email Notifications"
                description="Send email notifications for system events"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>

              <SettingItem
                label="System Alerts"
                description="Show system alerts in the admin panel"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.systemAlerts}
                    onChange={(e) => handleSettingChange('systemAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </SettingItem>
            </SettingGroup>

            <SettingGroup title="Maintenance">
              <SettingItem
                label="Maintenance Mode"
                description="Put the site in maintenance mode (only admins can access)"
              >
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </SettingItem>

              {settings.maintenanceMode && (
                <div className={`p-4 rounded-lg border-l-4 border-red-500 ${
                  theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
                }`}>
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-red-200' : 'text-red-800'
                    }`}>
                      Maintenance mode is enabled. Only administrators can access the platform.
                    </p>
                  </div>
                </div>
              )}
            </SettingGroup>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            System Settings
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Configure your BrainCanvas instance
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            saveStatus === 'saving'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 border-green-500 ${
          theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
        }`}>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className={`text-sm ${
              theme === 'dark' ? 'text-green-200' : 'text-green-800'
            }`}>
              Settings saved successfully!
            </p>
          </div>
        </div>
      )}

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className={`w-64 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <nav className="p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-zinc-800 text-white'
                        : 'bg-gray-200 text-gray-900'
                      : theme === 'dark'
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}