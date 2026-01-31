#!/usr/bin/env node
/**
 * Simple HTTP server for the website.
 * Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    // Remove query string and decode URL
    let filePath = '.' + req.url.split('?')[0];
    
    // Default to index.html for root
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, try index.html
                if (filePath !== './index.html') {
                    fs.readFile('./index.html', (error, content) => {
                        if (error) {
                            res.writeHead(404);
                            res.end('File not found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                } else {
                    res.writeHead(404);
                    res.end('File not found');
                }
            } else {
                res.writeHead(500);
                res.end(`Server error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-store, no-cache, must-revalidate'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log('='.repeat(60));
    console.log(`🚀 Server running at ${url}`);
    console.log(`📁 Serving files from: ${process.cwd()}`);
    console.log('='.repeat(60));
    console.log('\nPress Ctrl+C to stop the server\n');
    
    // Automatically open browser (works on macOS, Linux, Windows)
    const platform = process.platform;
    let command;
    
    if (platform === 'darwin') {
        command = `open ${url}`;
    } else if (platform === 'win32') {
        command = `start ${url}`;
    } else {
        command = `xdg-open ${url}`;
    }
    
    exec(command, (error) => {
        if (error) {
            console.log(`⚠️  Could not open browser automatically. Please visit ${url}`);
        } else {
            console.log(`✅ Opened ${url} in your default browser`);
        }
    });
    
    console.log('\n' + '='.repeat(60) + '\n');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
    console.log('\n\n🛑 Server stopped by user');
    process.exit(0);
});
