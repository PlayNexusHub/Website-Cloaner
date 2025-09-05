// ===== CYBERPUNK SITE CLONER PROXY SERVER =====
// Simple Node.js proxy to bypass CORS restrictions

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Proxy endpoint for fetching external websites
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }
    
    try {
        console.log(`🔄 Proxying request to: ${targetUrl}`);
        
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 10000,
            maxRedirects: 5
        });
        
        // Set appropriate headers
        res.set('Content-Type', response.headers['content-type'] || 'text/html');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        
        console.log(`✅ Successfully proxied: ${targetUrl}`);
        res.send(response.data);
        
    } catch (error) {
        console.error(`❌ Proxy error for ${targetUrl}:`, error.message);
        res.status(500).json({ 
            error: 'Failed to fetch target website',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'online', 
        service: 'Cyberpunk Site Cloner Proxy',
        version: '2.085.0'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Cyberpunk Proxy Server running on http://localhost:${PORT}`);
    console.log(`📡 Proxy endpoint: http://localhost:${PORT}/proxy?url=<target-url>`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Main app: http://localhost:${PORT}/index.html`);
});

module.exports = app; 