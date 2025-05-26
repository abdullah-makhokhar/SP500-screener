import React from 'react'
import { Filter, X } from 'lucide-react'

const FilterPanel = ({ filters, onFilterChange, stockCount, totalCount }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    })
  }

  const clearFilters = () => {
    onFilterChange({
      sector: '',
      minPrice: '',
      maxPrice: '',
      minVolume: '',
      minChange: '',
      maxChange: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  const sectors = [
    'Technology',
    'Healthcare',
    'Financials',
    'Consumer Discretionary',
    'Communication Services',
    'Industrials',
    'Consumer Staples',
    'Energy',
    'Utilities',
    'Real Estate',
    'Materials'
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <span className="text-sm text-gray-500">
            ({stockCount} of {totalCount} stocks)
          </span>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Sector Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sector
          </label>
          <select
            value={filters.sector}
            onChange={(e) => handleInputChange('sector', e.target.value)}
            className="input-field"
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Price ($)
          </label>
          <input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Price ($)
          </label>
          <input
            type="number"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="input-field"
            min="0"
            step="0.01"
          />
        </div>

        {/* Volume Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Volume
          </label>
          <input
            type="number"
            placeholder="1000000"
            value={filters.minVolume}
            onChange={(e) => handleInputChange('minVolume', e.target.value)}
            className="input-field"
            min="0"
          />
        </div>

        {/* Change Percentage Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Min Change (%)
          </label>
          <input
            type="number"
            placeholder="-10"
            value={filters.minChange}
            onChange={(e) => handleInputChange('minChange', e.target.value)}
            className="input-field"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Change (%)
          </label>
          <input
            type="number"
            placeholder="10"
            value={filters.maxChange}
            onChange={(e) => handleInputChange('maxChange', e.target.value)}
            className="input-field"
            step="0.01"
          />
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleInputChange('minChange', '2')}
            className="px-3 py-1 text-xs bg-success-100 text-success-700 rounded-full hover:bg-success-200 transition-colors duration-200"
          >
            Gainers (+2%)
          </button>
          <button
            onClick={() => handleInputChange('maxChange', '-2')}
            className="px-3 py-1 text-xs bg-danger-100 text-danger-700 rounded-full hover:bg-danger-200 transition-colors duration-200"
          >
            Losers (-2%)
          </button>
          <button
            onClick={() => handleInputChange('minVolume', '5000000')}
            className="px-3 py-1 text-xs bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors duration-200"
          >
            High Volume (5M+)
          </button>
          <button
            onClick={() => {
              handleInputChange('minPrice', '10')
              handleInputChange('maxPrice', '100')
            }}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            Mid-cap ($10-$100)
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel 