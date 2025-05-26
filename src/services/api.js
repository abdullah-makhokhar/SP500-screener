import axios from 'axios'

const API_BASE_URL = '/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again')
    }
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred'
      throw new Error(message)
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server')
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred')
    }
  }
)

export const fetchStockData = async () => {
  try {
    const response = await api.get('/stocks')
    // Return just the stocks array for compatibility with existing frontend code
    return response.data.stocks || response.data
  } catch (error) {
    console.error('Failed to fetch stock data:', error)
    throw error
  }
}

export const fetchMarketData = async () => {
  try {
    const response = await api.get('/stocks')
    return {
      stocks: response.data.stocks || response.data,
      index: response.data.index || null,
      totalCount: response.data.total_count || (response.data.stocks ? response.data.stocks.length : 0)
    }
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    throw error
  }
}

export const fetchStockDetails = async (symbol) => {
  try {
    const response = await api.get(`/stocks/${symbol}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch details for ${symbol}:`, error)
    throw error
  }
}

export default api 