// Visual Download Window System
class VisualDownloadWindow {
    constructor() {
        this.isOpen = false;
        this.downloads = new Map();
        this.createWindow();
        this.setupEventListeners();
    }

    createWindow() {
        const windowHTML = `
            <div id="visual-download-window" class="visual-download-window">
                <div class="download-window-header">
                    <div class="download-window-title">
                        <span class="neon-text">🔍 LIVE DOWNLOAD MONITOR</span>
                        <div class="download-stats">
                            <span class="stat-item">
                                <span class="stat-label">Total:</span>
                                <span id="total-files" class="stat-value">0</span>
                            </span>
                            <span class="stat-item">
                                <span class="stat-label">Success:</span>
                                <span id="success-files" class="stat-value success">0</span>
                            </span>
                            <span class="stat-item">
                                <span class="stat-label">Failed:</span>
                                <span id="failed-files" class="stat-value failed">0</span>
                            </span>
                            <span class="stat-item">
                                <span class="stat-label">Size:</span>
                                <span id="total-size" class="stat-value">0 KB</span>
                            </span>
                        </div>
                    </div>
                    <div class="download-window-controls">
                        <button id="minimize-download-window" class="cyber-button small">
                            <span class="neon-text">−</span>
                        </button>
                        <button id="close-download-window" class="cyber-button small">
                            <span class="neon-text">×</span>
                        </button>
                    </div>
                </div>
                <div class="download-window-content">
                    <div class="download-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="html">HTML</button>
                        <button class="filter-btn" data-filter="css">CSS</button>
                        <button class="filter-btn" data-filter="js">JS</button>
                        <button class="filter-btn" data-filter="image">Images</button>
                        <button class="filter-btn" data-filter="font">Fonts</button>
                        <button class="filter-btn" data-filter="media">Media</button>
                        <button class="filter-btn" data-filter="other">Other</button>
                    </div>
                    <div class="download-list" id="download-list">
                        <div class="download-placeholder">
                            <div class="placeholder-icon">📁</div>
                            <div class="placeholder-text">Waiting for downloads...</div>
                        </div>
                    </div>
                </div>
                <div class="download-window-footer">
                    <div class="download-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="overall-progress"></div>
                        </div>
                        <span class="progress-text" id="progress-text">0%</span>
                    </div>
                    <div class="download-actions">
                        <button id="clear-downloads" class="cyber-button small">
                            <span class="neon-text">Clear</span>
                        </button>
                        <button id="export-download-log" class="cyber-button small">
                            <span class="neon-text">Export Log</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', windowHTML);
        this.window = document.getElementById('visual-download-window');
    }

    setupEventListeners() {
        // Window controls
        document.getElementById('minimize-download-window').addEventListener('click', () => {
            this.toggleMinimize();
        });

        document.getElementById('close-download-window').addEventListener('click', () => {
            this.close();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterDownloads(e.target.dataset.filter);
            });
        });

        // Action buttons
        document.getElementById('clear-downloads').addEventListener('click', () => {
            this.clearDownloads();
        });

        document.getElementById('export-download-log').addEventListener('click', () => {
            this.exportDownloadLog();
        });

        // Make window draggable
        this.makeDraggable();
    }

    makeDraggable() {
        const header = this.window.querySelector('.download-window-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        header.addEventListener('mousedown', (e) => {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                this.window.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    open() {
        this.window.classList.add('open');
        this.isOpen = true;
        this.updateStats();
    }

    close() {
        this.window.classList.remove('open');
        this.isOpen = false;
    }

    toggleMinimize() {
        this.window.classList.toggle('minimized');
    }

    addDownload(fileInfo) {
        // Validate fileInfo
        if (!fileInfo || typeof fileInfo !== 'object') {
            console.error('Invalid fileInfo provided to addDownload:', fileInfo);
            return null;
        }
        
        // Ensure url is a string
        if (!fileInfo.url || typeof fileInfo.url !== 'string') {
            console.error('Invalid URL provided to addDownload:', fileInfo.url);
            return null;
        }
        
        const downloadId = `download-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const downloadItem = this.createDownloadItem(downloadId, fileInfo);
        this.downloads.set(downloadId, { ...fileInfo, id: downloadId, element: downloadItem });
        
        const downloadList = document.getElementById('download-list');
        if (downloadList.querySelector('.download-placeholder')) {
            downloadList.innerHTML = '';
        }
        downloadList.appendChild(downloadItem);
        
        this.updateStats();
        this.animateDownloadItem(downloadItem);
        
        return downloadId;
    }

    createDownloadItem(id, fileInfo) {
        const fileType = this.getFileType(fileInfo.url);
        const fileIcon = this.getFileIcon(fileType);
        const fileName = this.getFileName(fileInfo.url);
        
        const item = document.createElement('div');
        item.className = `download-item ${fileType}`;
        item.id = id;
        item.dataset.type = fileType;
        
        item.innerHTML = `
            <div class="download-item-icon">
                <span class="file-icon">${fileIcon}</span>
                <div class="download-status-indicator">
                    <div class="status-dot"></div>
                </div>
            </div>
            <div class="download-item-content">
                <div class="download-item-header">
                    <span class="download-filename">${fileName}</span>
                    <span class="download-filesize">${fileInfo.size || 'Unknown'}</span>
                </div>
                <div class="download-item-path">${fileInfo.url}</div>
                <div class="download-progress-bar">
                    <div class="download-progress-fill" style="width: 0%"></div>
                </div>
                <div class="download-item-status">Initializing...</div>
            </div>
            <div class="download-item-actions">
                <button class="download-action-btn" title="Copy URL">
                    <span class="neon-text">📋</span>
                </button>
                <button class="download-action-btn" title="Open in new tab">
                    <span class="neon-text">🔗</span>
                </button>
            </div>
        `;

        // Add action button listeners
        const actionBtns = item.querySelectorAll('.download-action-btn');
        actionBtns[0].addEventListener('click', () => this.copyToClipboard(fileInfo.url));
        actionBtns[1].addEventListener('click', () => window.open(fileInfo.url, '_blank'));

        return item;
    }

    updateDownload(id, updates) {
        // Validate parameters
        if (!id || typeof id !== 'string') {
            console.error('Invalid download ID provided to updateDownload:', id);
            return;
        }
        
        if (!updates || typeof updates !== 'object') {
            console.error('Invalid updates provided to updateDownload:', updates);
            return;
        }
        
        const download = this.downloads.get(id);
        if (!download) {
            console.error('Download not found for ID:', id);
            return;
        }

        Object.assign(download, updates);
        const element = download.element;

        if (updates.status) {
            const statusEl = element.querySelector('.download-item-status');
            if (statusEl) {
                statusEl.textContent = updates.status;
            }
            
            const statusDot = element.querySelector('.status-dot');
            if (statusDot) {
                statusDot.className = `status-dot ${updates.status.toLowerCase().replace(/\s+/g, '-')}`;
            }
        }

        if (updates.progress !== undefined) {
            const progressFill = element.querySelector('.download-progress-fill');
            if (progressFill) {
                progressFill.style.width = `${updates.progress}%`;
            }
        }

        if (updates.size) {
            const sizeEl = element.querySelector('.download-filesize');
            if (sizeEl) {
                sizeEl.textContent = this.formatFileSize(updates.size);
            }
        }

        this.updateStats();
    }

    removeDownload(id) {
        const download = this.downloads.get(id);
        if (download) {
            download.element.remove();
            this.downloads.delete(id);
            this.updateStats();
        }
    }

    getFileType(url) {
        // Ensure url is a string
        if (!url || typeof url !== 'string') {
            return 'other';
        }
        
        const extension = url.split('.').pop().toLowerCase();
        const typeMap = {
            'html': 'html',
            'htm': 'html',
            'css': 'css',
            'js': 'js',
            'jpg': 'image',
            'jpeg': 'image',
            'png': 'image',
            'gif': 'image',
            'svg': 'image',
            'webp': 'image',
            'ico': 'image',
            'woff': 'font',
            'woff2': 'font',
            'ttf': 'font',
            'otf': 'font',
            'eot': 'font',
            'mp4': 'media',
            'webm': 'media',
            'mp3': 'media',
            'wav': 'media',
            'ogg': 'media',
            'pdf': 'other',
            'xml': 'other',
            'json': 'other'
        };
        return typeMap[extension] || 'other';
    }

    getFileIcon(fileType) {
        const icons = {
            'html': '🌐',
            'css': '🎨',
            'js': '⚡',
            'image': '🖼️',
            'font': '🔤',
            'media': '🎵',
            'other': '📄'
        };
        return icons[fileType] || '📄';
    }

    getFileName(url) {
        // Ensure url is a string
        if (!url || typeof url !== 'string') {
            return 'unknown.html';
        }
        
        return url.split('/').pop().split('?')[0] || 'index.html';
    }

    formatFileSize(bytes) {
        if (!bytes || typeof bytes !== 'number' || isNaN(bytes)) return 'Unknown';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    updateStats() {
        const total = this.downloads.size;
        const success = Array.from(this.downloads.values()).filter(d => d.status === 'Completed').length;
        const failed = Array.from(this.downloads.values()).filter(d => d.status === 'Failed').length;
        const totalSize = Array.from(this.downloads.values()).reduce((sum, d) => sum + (d.size || 0), 0);

        document.getElementById('total-files').textContent = total;
        document.getElementById('success-files').textContent = success;
        document.getElementById('failed-files').textContent = failed;
        document.getElementById('total-size').textContent = this.formatFileSize(totalSize);

        // Update overall progress
        const progress = total > 0 ? (success / total) * 100 : 0;
        document.getElementById('overall-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    }

    filterDownloads(filter) {
        const items = document.querySelectorAll('.download-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    clearDownloads() {
        this.downloads.clear();
        document.getElementById('download-list').innerHTML = `
            <div class="download-placeholder">
                <div class="placeholder-icon">📁</div>
                <div class="placeholder-text">Waiting for downloads...</div>
            </div>
        `;
        this.updateStats();
    }

    exportDownloadLog() {
        const log = Array.from(this.downloads.values()).map(d => ({
            filename: this.getFileName(d.url),
            url: d.url,
            type: this.getFileType(d.url),
            size: d.size,
            status: d.status,
            timestamp: new Date().toISOString()
        }));

        const blob = new Blob([JSON.stringify(log, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `download-log-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    animateDownloadItem(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 10);
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy URL', 'error');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `download-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global instance
window.visualDownloadWindow = new VisualDownloadWindow(); 