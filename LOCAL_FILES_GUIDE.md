# 📁 Local Files Guide - Cyberpunk Site Cloner

## Why Local Files?

When cloning websites, you might encounter local file system paths like:
- `file:///C:/assets/css/bootstrap.css`
- `file:///C:/assets/js/main.js`
- `file:///C:/images/logo.png`

These are files on your local computer that can't be accessed via HTTP requests due to browser security restrictions.

## 🚀 Solutions for Local Files

### Option 1: File Upload (Recommended)
Use the built-in file upload feature:

1. **Open the cloner** in your browser
2. **Scroll down** to the "📁 Local Files" section
3. **Click "Choose Files"** and select your local CSS/JS files
4. **Files will be automatically included** in the final ZIP package

### Option 2: Local Web Server
Convert file:// URLs to http:// URLs:

1. **Start a local server** in your project directory:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

2. **Access your site** via `http://localhost:8000` instead of `file://`
3. **Clone the localhost URL** - all resources will be accessible

### Option 3: Manual File Addition
For specific files you want to include:

1. **Upload individual files** using the file input
2. **Files will be included** in the cloned package
3. **Update HTML references** manually if needed

## 📋 Supported File Types

The file upload accepts:
- **CSS files** (`.css`)
- **JavaScript files** (`.js`)
- **HTML files** (`.html`)
- **Text files** (`.txt`)
- **Image files** (`.png`, `.jpg`, `.gif`, `.svg`)

## 🔧 How It Works

### File Upload Process
1. **Select files** using the file input
2. **Files are read** using FileReader API
3. **Content is stored** in memory
4. **Files are added** to the ZIP package
5. **Original filenames** are preserved

### Local File Detection
- **Automatic detection** of `file:///` URLs
- **Helpful error messages** with solutions
- **Placeholder content** with instructions
- **File type identification** for better handling

## 🎯 Best Practices

### For Development
1. **Use a local server** for testing
2. **Keep files organized** in project folders
3. **Use relative paths** in HTML
4. **Upload missing files** manually

### For Production
1. **Host files** on a web server
2. **Use CDN links** for common libraries
3. **Optimize file sizes** before uploading
4. **Test the cloned package** thoroughly

## 🛠️ Troubleshooting

### "Cannot access local file" Error
**Problem**: Browser can't read local file system
**Solution**: 
- Use the file upload feature
- Start a local web server
- Copy file content manually

### Missing Files in ZIP
**Problem**: Some files not included
**Solution**:
- Check file upload section
- Verify file types are supported
- Try uploading files individually

### Broken References
**Problem**: HTML references don't work
**Solution**:
- Update file paths in HTML
- Use relative paths
- Include all referenced files

## 📁 File Structure Example

```
cloned-site/
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   ├── bootstrap.css    # Uploaded local file
│   │   └── style.css        # Downloaded external file
│   ├── js/
│   │   ├── main.js          # Uploaded local file
│   │   └── jquery.js        # Downloaded external file
│   └── images/
│       ├── logo.png         # Uploaded local file
│       └── banner.jpg       # Downloaded external file
└── README.txt              # Generated info file
```

## 🔄 Workflow Example

1. **Clone a website** with local file references
2. **See warnings** about local files in logs
3. **Upload missing files** using file input
4. **Download ZIP package** with all files included
5. **Extract and test** the cloned site

## 💡 Tips

- **Batch upload** multiple files at once
- **Remove files** using the × button if needed
- **Check file sizes** before uploading large files
- **Use descriptive names** for uploaded files
- **Test the final package** in a web server

---

**Happy Cloning! 🎮✨** 