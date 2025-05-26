#!/bin/bash

# S&P 500 Screener Development Startup Script

echo "🚀 Starting S&P 500 Screener Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory (where package.json is located)"
    exit 1
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Setup backend virtual environment if it doesn't exist
if [ ! -d "backend/venv" ]; then
    echo "🐍 Setting up Python virtual environment..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
fi

# Kill any existing processes on our ports
echo "🧹 Cleaning up any existing processes..."
pkill -f "python app.py" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

echo "🎯 Starting development servers..."

# Start backend in background
echo "🔧 Starting Flask backend on port 5000..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Test backend
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend is running successfully"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend
echo "⚡ Starting React frontend on port 3000..."
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Test frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running successfully"
else
    echo "❌ Frontend failed to start"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Development environment is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo "📊 API Test: http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -f "python app.py" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    echo "✅ Cleanup complete"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait 