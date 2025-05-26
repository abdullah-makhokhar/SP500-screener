import React, { useState } from 'react'
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react'

const StockTable = ({ stocks }) => {
  const [sortField, setSortField] = useState('changePercent')
  const [sortDirection, setSortDirection] = useState('desc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // Handle string values
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toLocaleString()
  }

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success-600'
    if (change < 0) return 'text-danger-600'
    return 'text-gray-600'
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-gray-900 transition-colors duration-200"
    >
      <span>{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="w-4 h-4" /> : 
          <ChevronDown className="w-4 h-4" />
      )}
    </button>
  )

  if (stocks.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No stocks found</div>
        <div className="text-gray-400 text-sm">
          Try adjusting your filters to see more results
        </div>
      </div>
    )
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">
                <SortButton field="symbol">Symbol</SortButton>
              </th>
              <th className="table-header">
                <SortButton field="name">Company</SortButton>
              </th>
              <th className="table-header">
                <SortButton field="sector">Sector</SortButton>
              </th>
              <th className="table-header text-right">
                <SortButton field="price">Price</SortButton>
              </th>
              <th className="table-header text-right">
                <SortButton field="changePercent">Change %</SortButton>
              </th>
              <th className="table-header text-right">
                <SortButton field="volume">Volume</SortButton>
              </th>
              <th className="table-header text-right">
                <SortButton field="marketCap">Market Cap</SortButton>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStocks.map((stock, index) => (
              <tr 
                key={stock.symbol} 
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <td className="table-cell">
                  <div className="font-semibold text-gray-900">
                    {stock.symbol}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="max-w-xs truncate" title={stock.name}>
                    {stock.name}
                  </div>
                </td>
                <td className="table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {stock.sector}
                  </span>
                </td>
                <td className="table-cell text-right font-medium">
                  {formatPrice(stock.price)}
                </td>
                <td className={`table-cell text-right font-medium ${getChangeColor(stock.changePercent)}`}>
                  <div className="flex items-center justify-end space-x-1">
                    {getChangeIcon(stock.changePercent)}
                    <span>{formatChange(stock.changePercent)}</span>
                  </div>
                </td>
                <td className="table-cell text-right">
                  {formatVolume(stock.volume)}
                </td>
                <td className="table-cell text-right">
                  {stock.marketCap ? formatPrice(stock.marketCap) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {stocks.length} stocks
        </div>
      </div>
    </div>
  )
}

export default StockTable 