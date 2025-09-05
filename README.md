# 🔮 CYBERPUNK SITE CLONER v2.085

*A futuristic website cloning tool that looks like it came straight from Blade Runner*

![Cyberpunk Site Cloner](https://img.shields.io/badge/Version-2.085-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Online-brightgreen)

## 🌟 Features

### 🎨 **Cyberpunk UI/UX**
- **Neon-accented dark mode** with pulsing effects
- **4 Theme variations**: Neon Terminal, Synthwave, Frostbyte, Biohack Red
- **Real-time animations** with GSAP-powered effects
- **Glassmorphism panels** with backdrop blur
- **Scan line effects** and glitch animations
- **Responsive design** for desktop and mobile

### ⚡ **Core Functionality**
- **URL validation** with real-time feedback
- **Website cloning** with HTML, CSS, JS, and image extraction
- **Progress tracking** with animated circular progress ring
- **Real-time system logs** with color-coded entries
- **File preview** and download management
- **ZIP package creation** for easy distribution

### 🎧 **Audio & Visual Effects**
- **Sound effects** for all interactions (toggleable)
- **Visual feedback** for success/error states
- **Particle effects** and glitch overlays
- **AI assistant** with contextual messages

### 🔧 **Advanced Features**
- **Settings panel** with theme and effect toggles
- **Error handling** with retry functionality
- **File size estimation** and download tracking
- **CORS-aware** resource handling
- **Local storage** for user preferences

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/cyberpunk-site-cloner.git
   cd cyberpunk-site-cloner
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server for better experience
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start Cloning**
   - Enter a target URL in the input field
   - Click "INITIATE CLONE" to start the process
   - Watch the real-time progress and logs
   - Download your cloned site as a ZIP package

## 🎮 Usage Guide

### Basic Cloning
1. **Enter URL**: Type or paste the website URL you want to clone
2. **Validate**: The system automatically validates the URL format
3. **Clone**: Click the "INITIATE CLONE" button to start
4. **Monitor**: Watch the progress ring and system logs
5. **Download**: Get your cloned site as a ZIP file

### Advanced Features

#### Theme Switching
- Click the ⚙️ settings icon in the top-right
- Choose from 4 cyberpunk themes:
  - 🔮 **Neon Terminal** (Default) - Classic green on black
  - 🌊 **Synthwave** - Pink/purple/cyan gradients
  - ❄️ **Frostbyte** - Ice blue and white
  - 🧬 **Biohack Red** - Crimson on carbon fiber

#### System Logs
- Real-time logging of all operations
- Color-coded entries:
  - 🟢 **Green**: Success messages
  - 🔴 **Red**: Error messages
  - 🟡 **Yellow**: Warning messages
  - ⚪ **White**: System messages

#### AI Assistant
- Contextual help and status updates
- Located in the bottom-left corner
- Provides mission status and guidance

## 🛠 Technical Details

### Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: GSAP (GreenSock Animation Platform)
- **File Handling**: JSZip, FileSaver.js
- **Fonts**: Orbitron, Share Tech Mono
- **Icons**: Emoji-based for cross-platform compatibility

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### File Structure
```
cyberpunk-site-cloner/
├── index.html          # Main application
├── styles.css          # Cyberpunk styling
├── script.js           # Core functionality
└── README.md           # This file
```

## 🔒 Security & Limitations

### CORS Restrictions
Due to browser security policies, the tool can only clone:
- **Same-origin resources** (same domain)
- **Publicly accessible content**
- **Static files** (HTML, CSS, JS, images)

### What Gets Cloned
- ✅ HTML structure and content
- ✅ CSS stylesheets (same-origin)
- ✅ JavaScript files (same-origin)
- ✅ Images (same-origin)
- ⚠️ External resources (logged but not downloaded)
- ❌ Dynamic content (requires server-side processing)

### Security Features
- URL validation and sanitization
- CORS-aware resource handling
- Error trapping and graceful degradation
- No data collection or external tracking

## 🎨 Customization

### Adding New Themes
1. Add theme variables to `styles.css`:
```css
[data-theme="your-theme"] {
    --primary-glow: #your-color;
    --bg-primary: #your-bg;
    /* ... other variables */
}
```

2. Add theme option to HTML:
```html
<option value="your-theme">🎨 Your Theme</option>
```

### Custom Sound Effects
Modify the `playSound()` method in `script.js`:
```javascript
case 'custom':
    this.playTone(frequency, duration, waveType);
    break;
```

## 🐛 Troubleshooting

### Common Issues

**"Invalid URL" Error**
- Ensure the URL includes `http://` or `https://`
- Check for typos in the domain name
- Verify the website is accessible

**"Clone Failed" Error**
- Target site may have CORS restrictions
- Site might be using dynamic content
- Network connectivity issues

**No Files Downloaded**
- Most resources are likely external (different domain)
- Check the system logs for detailed information
- Try a simpler, static website

### Performance Tips
- Use a modern browser for best performance
- Disable VFX if experiencing lag on older devices
- Clear browser cache if issues persist

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Test across multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Blade Runner** for cyberpunk aesthetic inspiration
- **GSAP** for smooth animations
- **JSZip** for file packaging
- **Google Fonts** for the futuristic typography

## 🔮 Future Enhancements

- [ ] **Electron App** for full filesystem access
- [ ] **Proxy server** for bypassing CORS
- [ ] **Advanced parsing** for dynamic content
- [ ] **Theme editor** for custom color schemes
- [ ] **Batch cloning** for multiple sites
- [ ] **Preview server** for testing cloned sites

---

**Built with ❤️ and neon lights**

*"The future is already here – it's just not evenly distributed."* - William Gibson 