#!/usr/bin/env python3
"""
Simple HTTP server for the website.
Run with: python3 server.py
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers and cache control
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {args[0]}")

def main():
    # Change to the directory where the script is located
    os.chdir(Path(__file__).parent)
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"🚀 Server running at {url}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("=" * 60)
        print("\nPress Ctrl+C to stop the server\n")
        
        # Automatically open browser
        try:
            webbrowser.open(url)
            print(f"✅ Opened {url} in your default browser")
        except:
            print(f"⚠️  Could not open browser automatically. Please visit {url}")
        
        print("\n" + "=" * 60 + "\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    main()
