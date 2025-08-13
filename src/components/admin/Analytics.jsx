import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FolderOpen, 
  Activity,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

export default function Analytics({ theme }) {
  const [timeRange, setTimeRange] = useState('7d')

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 127,
    totalProjects: 3456,
    newProjects: 89,
    publicProjects: 1234,
    privateProjects: 2222,
    totalSessions: 5678,
    avgSessionTime: '12m 34s'
  }

  const chartData = {
    userGrowth: [
      { date: '2024-01-01', users: 1000 },
      { date: '2024-01-02', users: 1050 },
      { date: '2024-01-03', users: 1100 },
      { date: '2024-01-04', users: 1150 },
      { date: '2024-01-05', users: 1200 },
      { date: '2024-01-06', users: 1230 },
      { date: '2024-01-07', users: 1247 }
    ],
    projectCreation: [
      { date: '2024-01-01', projects: 3200 },
      { date: '2024-01-02', projects: 3250 },
      { date: '2024-01-03', projects: 3300 },
      { date: '2024-01-04', projects: 3350 },
      { date: '2024-01-05', projects: 3400 },
      { date: '2024-01-06', projects: 3430 },
      { date: '2024-01-07', projects: 3456 }
    ]
  }

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }) => (
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
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{trend > 0 ? '+' : ''}{trend}% from last week</span>
            </div>
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

  const SimpleChart = ({ data, color = '#3b82f6', title }) => (
    <div className={`p-6 rounded-lg border ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => {
          const maxValue = Math.max(...data.map(d => Object.values(d)[1]))
          const height = (Object.values(item)[1] / maxValue) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t"
                style={{ 
                  height: `${height}%`, 
                  backgroundColor: color,
                  minHeight: '4px'
                }}
              />
              <span className={`text-xs mt-2 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {new Date(Object.values(item)[0]).getDate()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Analytics Dashboard
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Track usage patterns and system performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle={`${stats.activeUsers} active`}
          icon={Users}
          color="blue"
          trend={12.5}
        />
        <StatCard
          title="New Users"
          value={stats.newUsers.toLocaleString()}
          subtitle="This week"
          icon={Users}
          color="green"
          trend={8.2}
        />
        <StatCard
          title="Total Projects"
          value={stats.totalProjects.toLocaleString()}
          subtitle={`${stats.newProjects} new this week`}
          icon={FolderOpen}
          color="purple"
          trend={15.3}
        />
        <StatCard
          title="Active Sessions"
          value={stats.totalSessions.toLocaleString()}
          subtitle={`Avg: ${stats.avgSessionTime}`}
          icon={Activity}
          color="yellow"
          trend={-2.1}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          data={chartData.userGrowth}
          color="#3b82f6"
          title="User Growth"
        />
        <SimpleChart
          data={chartData.projectCreation}
          color="#10b981"
          title="Project Creation"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        <div className={`p-6 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Most Popular Projects
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Marketing Campaign Design', views: 1234, collaborators: 8 },
              { name: 'Product Roadmap 2024', views: 987, collaborators: 12 },
              { name: 'User Flow Diagrams', views: 756, collaborators: 5 },
              { name: 'Brand Guidelines', views: 543, collaborators: 3 },
              { name: 'API Documentation', views: 432, collaborators: 7 }
            ].map((project, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.name}
                  </p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    {project.collaborators} collaborators
                  </p>
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}>
                  {project.views} views
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className={`p-6 rounded-lg border ${
          theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            User Activity Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  Project Creation
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  45%
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  Collaboration
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  30%
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}>
                  Viewing/Browsing
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  25%
                </span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 ${
                theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'
              }`}>
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Performance */}
      <div className={`p-6 rounded-lg border ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          System Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}>
              99.9%
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              245ms
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Avg Response Time
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}>
              2.1GB
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Storage Used
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}