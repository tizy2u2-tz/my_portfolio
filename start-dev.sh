#!/bin/bash

# Kill any process on port 3000
echo "Cleaning up port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process found on port 3000"

# Wait a moment for cleanup
sleep 2

# Start the dev server on port 3000 (this project's assigned port)
echo "Starting Next.js dev server on port 3000..."
npm run dev
