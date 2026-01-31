#!/bin/bash
# Website Launcher Script

cd "$(dirname "$0")"

echo "Starting website server..."
python3 -m http.server 8000 &
SERVER_PID=$!

sleep 2

echo ""
echo "=========================================="
echo "🚀 Website is running!"
echo "📍 Open in browser: http://localhost:8000"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to open browser
if command -v open >/dev/null 2>&1; then
    open http://localhost:8000 2>/dev/null || echo "Please manually open http://localhost:8000"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://localhost:8000
elif command -v start >/dev/null 2>&1; then
    start http://localhost:8000
else
    echo "Please open http://localhost:8000 in your browser"
fi

# Wait for user interrupt
wait $SERVER_PID
