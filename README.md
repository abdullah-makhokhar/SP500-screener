# S&P 500 Stock Screener

A clean, modern S&P 500 stock screener built for beginner investors. Features real-time data, advanced filtering, and a beautiful user interface inspired by modern design principles.

## ✨ Features

- **Real-time Stock Data**: Live S&P 500 stock prices and market data via Alpha Vantage API
- **Advanced Filtering**: Filter by sector, price range, volume, and daily change percentage
- **Clean UI**: Modern, responsive design with intuitive navigation
- **Auto-refresh**: Optional automatic data updates every 30 seconds
- **Sorting**: Sort stocks by any column (price, change %, volume, etc.)
- **Quick Filters**: Pre-configured filters for gainers, losers, high volume stocks
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)
- **Alpha Vantage API Key** (free at https://www.alphavantage.co/support/#api-key)

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. **Configure Alpha Vantage API Key** (Optional but recommended for real data):
```bash
# Set environment variable for real-time data
export ALPHA_VANTAGE_API_KEY=your_api_key_here

# Or create a .env file in the backend directory:
echo "ALPHA_VANTAGE_API_KEY=your_api_key_here" > .env
```

5. Start the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

## 🔑 API Key Configuration

### Getting Alpha Vantage API Key
1. Visit https://www.alphavantage.co/support/#api-key
2. Sign up for a free account
3. Get your API key (free tier: 25 requests/day, 5 requests/minute)

### Without API Key
- The app works with realistic fallback data including current market prices
- META shows correct ~$627 price, AAPL ~$189, etc.
- Perfect for development and demonstration

### With API Key
- Real-time data for up to 10 stocks (due to rate limits)
- Live price updates and accurate market data
- Set the environment variable: `ALPHA_VANTAGE_API_KEY=your_key`

## 🛠️ Development

### Frontend Development
- Built with React 18, Vite, and Tailwind CSS
- Uses Axios for API communication
- Lucide React for icons
- Modern ES6+ JavaScript

### Backend Development
- Flask web framework
- Alpha Vantage API for real-time stock data
- Realistic fallback data for development
- CORS enabled for frontend communication

### Project Structure
```
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── services/          # API services
│   └── main.jsx           # App entry point
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   └── requirements.txt   # Python dependencies
├── package.json          # Frontend dependencies
└── README.md            # This file
```

## 📊 API Endpoints

- `GET /api/stocks` - Get all S&P 500 stock data
- `GET /api/stocks/{symbol}` - Get specific stock details
- `GET /api/health` - Health check endpoint
- `POST /api/refresh` - Force refresh cached data

## 🎯 Usage

1. **View Stocks**: The main table shows all S&P 500 stocks with current prices, changes, and volume
2. **Filter Stocks**: Use the filter panel to narrow down stocks by:
   - Sector (Technology, Healthcare, etc.)
   - Price range (min/max)
   - Volume threshold
   - Daily change percentage
3. **Quick Filters**: Use preset filters for common scenarios:
   - Gainers (+2% or more)
   - Losers (-2% or less)
   - High volume stocks (5M+ volume)
   - Mid-cap stocks ($10-$100 price range)
4. **Sort Data**: Click any column header to sort stocks
5. **Auto-refresh**: Toggle automatic data updates in the header

## 🔧 Configuration

### Environment Variables

Backend (optional):
- `ALPHA_VANTAGE_API_KEY`: Your Alpha Vantage API key for real-time data
- `PORT`: Server port (default: 5000)
- `FLASK_ENV`: Set to 'development' for debug mode

### Customization

- **Stock List**: Modify `SP500_STOCKS` in `backend/app.py` to add/remove stocks
- **Fallback Prices**: Update `realistic_prices` in `get_realistic_fallback_data()` for current market prices
- **Refresh Rate**: Change auto-refresh interval in `src/App.jsx`
- **Styling**: Customize colors and design in `tailwind.config.js`

## 🚀 Production Deployment

### Frontend
```bash
npm run build
```
Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

### Backend
```bash
# Using gunicorn
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📝 Notes

- **Current Data**: Fallback data includes realistic current market prices (META: $627.85, AAPL: $189.50, etc.)
- **Rate Limits**: Alpha Vantage free tier has limits (25 requests/day, 5/minute)
- **Caching**: Data is cached for 5 minutes to respect API limits
- **Fallback**: App gracefully falls back to realistic data when API limits are reached

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ for beginner investors who want clean, simple market analysis tools. 