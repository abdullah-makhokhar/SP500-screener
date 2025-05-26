import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterPanel from './components/FilterPanel'
import StockTable from './components/StockTable'
import LoadingSpinner from './components/LoadingSpinner'
import { fetchStockData } from './services/api'

function App() {
  const [stocks, setStocks] = useState([])
  const [filteredStocks, setFilteredStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    sector: '',
    minPrice: '',
    maxPrice: '',
    minVolume: '',
    minChange: '',
    maxChange: ''
  })
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Fetch initial data
  useEffect(() => {
    loadStockData()
  }, [])

  // Auto refresh functionality
  useEffect(() => {
    let interval
    if (autoRefresh) {
      interval = setInterval(() => {
        loadStockData()
      }, 30000) // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  // Filter stocks when filters change
  useEffect(() => {
    applyFilters()
  }, [stocks, filters])

  const loadStockData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchStockData()
      setStocks(data)
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.')
      console.error('Error fetching stock data:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...stocks]

    if (filters.sector) {
      filtered = filtered.filter(stock => 
        stock.sector?.toLowerCase().includes(filters.sector.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(stock => stock.price >= parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(stock => stock.price <= parseFloat(filters.maxPrice))
    }

    if (filters.minVolume) {
      filtered = filtered.filter(stock => stock.volume >= parseInt(filters.minVolume))
    }

    if (filters.minChange) {
      filtered = filtered.filter(stock => stock.changePercent >= parseFloat(filters.minChange))
    }

    if (filters.maxChange) {
      filtered = filtered.filter(stock => stock.changePercent <= parseFloat(filters.maxChange))
    }

    setFilteredStocks(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleRefresh = () => {
    loadStockData()
  }

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <button 
            onClick={loadStockData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onRefresh={handleRefresh}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={toggleAutoRefresh}
        loading={loading}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            stockCount={filteredStocks.length}
            totalCount={stocks.length}
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <StockTable stocks={filteredStocks} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App 