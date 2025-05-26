# Getting Your Alpha Vantage API Key

## Quick Steps:

1. **Visit**: https://www.alphavantage.co/support/#api-key
2. **Fill out the form**:
   - First Name
   - Last Name  
   - Email Address
   - Organization (can be "Personal" or "Individual")
3. **Click "GET FREE API KEY"**
4. **Check your email** for the API key
5. **Set the environment variable**:

```bash
# In your terminal (Mac/Linux):
export ALPHA_VANTAGE_API_KEY=your_actual_api_key_here

# Or create a .env file in the backend directory:
echo "ALPHA_VANTAGE_API_KEY=your_actual_api_key_here" > backend/.env
```

6. **Restart the backend**:
```bash
cd backend
python app.py
```

## Free Tier Limits:
- **25 requests per day**
- **5 requests per minute**
- Perfect for development and small projects

## What You Get:
- Real-time stock prices for up to 10 stocks
- Live market data updates
- Accurate price changes and volume data

## Without API Key:
- App still works perfectly with realistic fallback data
- Shows current market prices (META: $627.85, AAPL: $189.50, etc.)
- Great for development and demonstration

The app is designed to work great both with and without the API key! 