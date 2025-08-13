import React, { useState, useEffect } from 'react'
import { 
  Users, 
  FolderOpen, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'

export default function AdminOverview({ theme }) {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalProjects: 3456,
    publicProjects: 1234,
    privateProjects: 2222,
    totalFolders: 567,
    systemHealth: 'healthy'
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user_signup', user: 'John Doe', time: '2 minutes ago', details: 'New user registration' },
    { id: 2, type: 'project_created', user: 'Sarah Chen', time: '5 minutes ago', details: 'Created "Marketing Campaign 2024"' },
    { id: 3, type: 'project_shared', user: 'Mike Johnson', time: '12 minutes ago', details: 'Made "Product Roadmap" public' },
    { id: 4, type: 'user_login', user: 'Emma Davis', time: '18 minutes ago', details: 'User logged in' },
    { id: 5, type: 'project_deleted', user: 'Alex Rivera', time: '25 minutes ago', details: 'Deleted "Old Design Draft"' },
  ])

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className={`p-6 rounded-lg border transition-colors ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-sm ${
              theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          color === 'blue' ? 'bg-blue-100 text-blue-600' :
          color === 'green' ? 'bg-green-100 text-green-600' :
          color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
          color === 'purple' ? 'bg-purple-100 text-purple-600' :
          'bg-gray-100 text-gray-600'
        }`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_signup': return <Users className="w-4 h-4 text-green-500" />
      case 'project_created': return <FolderOpen className="w-4 h-4 text-blue-500" />
      case 'project_shared': return <TrendingUp className="w-4 h-4 text-purple-500" />
      case 'user_login': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'project_deleted': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle={`${stats.activeUsers} active`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Projects"
          value={stats.totalProjects.toLocaleString()}
          subtitle={`${stats.publicProjects} public, ${stats.privateProjects} private`}
          icon={FolderOpen}
          color="green"
        />
        <StatCard
          title="Folders"
          value={stats.totalFolders.toLocaleString()}
          subtitle="Organization units"
          icon={FolderOpen}
          color="purple"
        />
        <StatCard
          title="System Health"
          value="99.9%"
          subtitle="Uptime this month"
          icon={CheckCircle}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className={`p-6 rounded-lg border transition-colors ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Activity
            </h3>
            <button className={`text-sm text-blue-600 hover:text-blue-700 transition-colors`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span className="font-medium">{activity.user}</span> {activity.details}
                  </p>
                  <p className={`text-xs flex items-center mt-1 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Chart */}
        <div className={`p-6 rounded-lg border transition-colors ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Usage Trends
            </h3>
            <BarChart3 className={`w-5 h-5 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            }`} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  New Users This Week
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  127
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  Projects Created
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  89
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  Active Sessions
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  234
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className={`p-6 rounded-lg border transition-colors ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                API Server
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Operational
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Database
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Operational
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                File Storage
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Operational
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}