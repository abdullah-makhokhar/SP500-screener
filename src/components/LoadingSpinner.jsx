import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="card">
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <div className="text-gray-600 font-medium">Loading stock data...</div>
          <div className="text-gray-400 text-sm">Fetching the latest market information</div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner 