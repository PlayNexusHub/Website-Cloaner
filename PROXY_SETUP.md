# 🔄 Proxy Server Setup Guide

## Why Use the Proxy Server?

The Cyberpunk Site Cloner runs in your browser, which has security restrictions (CORS) that prevent accessing external websites. The proxy server acts as a middleman to bypass these restrictions.

## 🚀 Quick Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Proxy Server**
   ```bash
   node proxy-server.js
   ```

3. **Access the Cloner**
   - Open your browser to `http://localhost:3001`
   - The cloner will be available at `http://localhost:3001/index.html`

### Using Proxy Mode

1. **Enable Proxy Mode**
   - Click the ⚙️ settings icon
   - Check "Proxy Mode"
   - The system will now use the proxy for external sites

2. **Test External Sites**
   - Enter any website URL
   - Click "INITIATE CLONE"
   - The proxy will fetch the site and bypass CORS restrictions

## 🔧 Alternative Solutions

### Browser Extensions
If you don't want to run a server, try these browser extensions:

**Chrome/Edge:**
- "CORS Unblock" - https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino
- "Allow CORS" - https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

**Firefox:**
- "CORS Everywhere" - https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/

### How to Use Extensions
1. Install the extension
2. Enable it for your domain
3. Refresh the cloner page
4. Try cloning external sites

## 🛠️ Troubleshooting

### Proxy Server Issues

**"Port 3001 already in use"**
```bash
# Find what's using the port
lsof -i :3001
# Kill the process
kill -9 <PID>
# Or use a different port
PORT=3002 node proxy-server.js
```

**"Module not found"**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Browser Extension Issues

**Extension not working:**
- Make sure it's enabled for your domain
- Try disabling other extensions
- Check if the site has additional security measures

## 🔒 Security Notes

- The proxy server is for development/testing only
- Don't use it in production without proper security measures
- Be careful with sensitive websites
- The proxy logs all requests to the console

## 📡 API Endpoints

The proxy server provides these endpoints:

- `GET /proxy?url=<target-url>` - Fetch external websites
- `GET /health` - Check server status
- `GET /` - Serve static files

## 🎯 Example Usage

```bash
# Start the server
node proxy-server.js

# Test the proxy directly
curl "http://localhost:3001/proxy?url=https://example.com"

# Check server health
curl "http://localhost:3001/health"
```

## 🚀 Production Considerations

For production use, consider:

1. **Security**: Add authentication and rate limiting
2. **Performance**: Use caching and compression
3. **Monitoring**: Add logging and error tracking
4. **Scaling**: Use load balancers and multiple instances

---

**Happy Cloning! 🎮✨** 