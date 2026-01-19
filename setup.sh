#!/bin/bash

# Portfolio Setup & Run Script
# ============================

echo "🎨 Tonya Zenin Portfolio - Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Installing Node.js via Homebrew..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    brew install node
    echo ""
fi

echo "✓ Node.js $(node --version) installed"
echo "✓ npm $(npm --version) installed"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✓ Dependencies installed"
echo ""

# Start the development server
echo "🚀 Starting development server..."
echo "   Open http://localhost:3000 in your browser"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

npm run dev
