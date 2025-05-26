import React from 'react'
import { RefreshCw, BarChart3, Play, Pause } from 'lucide-react'

const Header = ({ onRefresh, autoRefresh, onToggleAutoRefresh, loading }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                S&P 500 Screener
              </h1>
              <p className="text-sm text-gray-500">
                Smart stock analysis for beginners
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Auto Refresh Toggle */}
            <button
              onClick={onToggleAutoRefresh}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                autoRefresh
                  ? 'bg-success-100 text-success-700 hover:bg-success-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {autoRefresh ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 