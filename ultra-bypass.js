// ===== ULTRA AGGRESSIVE BYPASS SYSTEM =====
// Bypasses ALL restrictions to get EVERYTHING from any site

class UltraBypass {
    constructor() {
        this.proxyServices = [
            // Public CORS proxies
            'https://api.allorigins.win/raw?url=',
            'https://cors-anywhere.herokuapp.com/',
            'https://thingproxy.freeboard.io/fetch/',
            'https://cors.bridged.cc/',
            'https://api.codetabs.com/v1/proxy?quest=',
            'https://corsproxy.io/?',
            'https://api.codetabs.com/v1/proxy?quest=',
            'https://cors-anywhere.herokuapp.com/',
            'https://cors.bridged.cc/',
            'https://thingproxy.freeboard.io/fetch/',
            
            // Additional proxy services
            'https://corsproxy.io/?',
            'https://cors-anywhere.herokuapp.com/',
            'https://api.allorigins.win/raw?url=',
            'https://thingproxy.freeboard.io/fetch/',
            'https://cors.bridged.cc/',
            'https://api.codetabs.com/v1/proxy?quest=',
            
            // Web scraping services
            'https://api.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=',
            'https://app.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=',
            'https://api.scrapingant.com/v2/general?url=',
            'https://api.scrapingdog.com/scrape?url=',
            
            // Alternative methods
            'https://api.proxycrawl.com/?token=YOUR_TOKEN&url=',
            'https://api.scrapestack.com/scrape?access_key=YOUR_KEY&url=',
            'https://api.zenrows.com/v1/?apikey=YOUR_KEY&url='
        ];
        
        this.userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59'
        ];
        
        this.currentProxyIndex = 0;
        this.currentUserAgentIndex = 0;
    }

    async ultraFetch(url, options = {}) {
        const methods = [
            () => this.directFetch(url, options),
            () => this.proxyFetch(url, options),
            () => this.iframeMethod(url, options),
            () => this.jsonpMethod(url, options),
            () => this.websocketMethod(url, options),
            () => this.serviceWorkerMethod(url, options),
            () => this.webRTCMethod(url, options),
            () => this.localStorageMethod(url, options),
            () => this.indexedDBMethod(url, options),
            () => this.cacheMethod(url, options)
        ];

        for (let i = 0; i < methods.length; i++) {
            try {
                console.log(`🔄 Ultra bypass method ${i + 1} for: ${url}`);
                const result = await methods[i]();
                if (result) {
                    console.log(`✅ Ultra bypass method ${i + 1} succeeded for: ${url}`);
                    return result;
                }
            } catch (error) {
                console.log(`❌ Ultra bypass method ${i + 1} failed: ${error.message}`);
                continue;
            }
        }

        throw new Error('All ultra bypass methods failed');
    }

    async directFetch(url, options) {
        // Try multiple user agents and headers
        for (const userAgent of this.userAgents) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'User-Agent': userAgent,
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5',
                        'Accept-Encoding': 'gzip, deflate',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        ...options.headers
                    }
                });

                if (response.ok) {
                    return response;
                }
            } catch (error) {
                continue;
            }
        }
        throw new Error('Direct fetch failed with all user agents');
    }

    async proxyFetch(url, options) {
        // Try all proxy services with rotation
        for (let i = 0; i < this.proxyServices.length; i++) {
            const proxyUrl = this.proxyServices[i] + encodeURIComponent(url);
            
            try {
                const response = await fetch(proxyUrl, {
                    ...options,
                    headers: {
                        'User-Agent': this.userAgents[this.currentUserAgentIndex],
                        ...options.headers
                    }
                });

                if (response.ok) {
                    // Rotate to next proxy and user agent
                    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxyServices.length;
                    this.currentUserAgentIndex = (this.currentUserAgentIndex + 1) % this.userAgents.length;
                    return response;
                }
            } catch (error) {
                continue;
            }
        }
        throw new Error('All proxy services failed');
    }

    async iframeMethod(url, options) {
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.crossOrigin = 'anonymous';
            iframe.sandbox = 'allow-same-origin allow-scripts';
            
            iframe.onload = () => {
                try {
                    const content = iframe.contentDocument || iframe.contentWindow.document;
                    resolve({
                        ok: true,
                        text: () => Promise.resolve(content.documentElement.outerHTML),
                        headers: new Headers(),
                        status: 200
                    });
                } catch (error) {
                    reject(error);
                } finally {
                    document.body.removeChild(iframe);
                }
            };
            
            iframe.onerror = () => {
                document.body.removeChild(iframe);
                reject(new Error('Iframe method failed'));
            };
            
            document.body.appendChild(iframe);
            iframe.src = url;
        });
    }

    async jsonpMethod(url, options) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            const callbackName = 'jsonp_' + Math.random().toString(36).substr(2, 9);
            
            window[callbackName] = (data) => {
                resolve({
                    ok: true,
                    json: () => Promise.resolve(data),
                    text: () => Promise.resolve(JSON.stringify(data)),
                    headers: new Headers(),
                    status: 200
                });
                delete window[callbackName];
                document.head.removeChild(script);
            };
            
            script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${callbackName}`;
            script.onerror = () => {
                delete window[callbackName];
                document.head.removeChild(script);
                reject(new Error('JSONP method failed'));
            };
            
            document.head.appendChild(script);
        });
    }

    async websocketMethod(url, options) {
        // Try WebSocket for real-time data
        return new Promise((resolve, reject) => {
            try {
                const wsUrl = url.replace(/^https?:\/\//, 'ws://');
                const ws = new WebSocket(wsUrl);
                
                ws.onopen = () => {
                    ws.send('GET / HTTP/1.1\r\n\r\n');
                };
                
                ws.onmessage = (event) => {
                    resolve({
                        ok: true,
                        text: () => Promise.resolve(event.data),
                        headers: new Headers(),
                        status: 200
                    });
                    ws.close();
                };
                
                ws.onerror = () => {
                    reject(new Error('WebSocket method failed'));
                };
                
                setTimeout(() => reject(new Error('WebSocket timeout')), 5000);
            } catch (error) {
                reject(error);
            }
        });
    }

    async serviceWorkerMethod(url, options) {
        // Try using Service Worker for caching
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                const response = await fetch(url, { cache: 'force-cache' });
                if (response.ok) {
                    return response;
                }
            } catch (error) {
                // Continue to next method
            }
        }
        throw new Error('Service Worker method not available');
    }

    async webRTCMethod(url, options) {
        // Try WebRTC for peer-to-peer data transfer
        try {
            const pc = new RTCPeerConnection();
            const channel = pc.createDataChannel('data');
            
            channel.onopen = () => {
                channel.send(`GET ${url} HTTP/1.1\r\n\r\n`);
            };
            
            channel.onmessage = (event) => {
                return {
                    ok: true,
                    text: () => Promise.resolve(event.data),
                    headers: new Headers(),
                    status: 200
                };
            };
            
            setTimeout(() => {
                pc.close();
            }, 5000);
        } catch (error) {
            throw new Error('WebRTC method failed');
        }
    }

    async localStorageMethod(url, options) {
        // Try to get from localStorage cache
        const cached = localStorage.getItem(`ultra_cache_${btoa(url)}`);
        if (cached) {
            return {
                ok: true,
                text: () => Promise.resolve(cached),
                headers: new Headers(),
                status: 200
            };
        }
        throw new Error('Not in localStorage cache');
    }

    async indexedDBMethod(url, options) {
        // Try to get from IndexedDB cache
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('UltraBypass', 1);
            
            request.onerror = () => reject(new Error('IndexedDB access failed'));
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['cache'], 'readonly');
                const store = transaction.objectStore('cache');
                const getRequest = store.get(btoa(url));
                
                getRequest.onsuccess = () => {
                    if (getRequest.result) {
                        resolve({
                            ok: true,
                            text: () => Promise.resolve(getRequest.result.content),
                            headers: new Headers(),
                            status: 200
                        });
                    } else {
                        reject(new Error('Not in IndexedDB cache'));
                    }
                };
                
                getRequest.onerror = () => reject(new Error('IndexedDB read failed'));
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('cache')) {
                    db.createObjectStore('cache', { keyPath: 'url' });
                }
            };
        });
    }

    async cacheMethod(url, options) {
        // Try to get from browser cache
        try {
            const response = await fetch(url, { 
                cache: 'force-cache',
                mode: 'no-cors'
            });
            if (response) {
                return response;
            }
        } catch (error) {
            // Continue to next method
        }
        throw new Error('Cache method failed');
    }

    // Ultra aggressive resource extraction
    async extractAllResources(html, baseUrl) {
        const resources = {
            html: html,
            css: [],
            js: [],
            images: [],
            fonts: [],
            videos: [],
            audios: [],
            documents: [],
            other: []
        };

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract ALL possible resources
        this.extractCSS(doc, baseUrl, resources);
        this.extractJS(doc, baseUrl, resources);
        this.extractImages(doc, baseUrl, resources);
        this.extractFonts(doc, baseUrl, resources);
        this.extractMedia(doc, baseUrl, resources);
        this.extractDocuments(doc, baseUrl, resources);
        this.extractLinks(doc, baseUrl, resources);
        this.extractMeta(doc, baseUrl, resources);
        this.extractInline(doc, baseUrl, resources);

        return resources;
    }

    extractCSS(doc, baseUrl, resources) {
        // External CSS
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = this.resolveUrl(link.href, baseUrl);
            if (href) resources.css.push(href);
        });

        // Inline CSS - skip these as they're handled separately in the main script
        // The main script will extract inline styles and add them directly to clonedFiles

        // CSS imports
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href && link.href.includes('@import')) {
                const imports = this.extractCSSImports(link.href);
                resources.css.push(...imports);
            }
        });
    }

    extractJS(doc, baseUrl, resources) {
        // External JS
        doc.querySelectorAll('script[src]').forEach(script => {
            const src = this.resolveUrl(script.src, baseUrl);
            if (src) resources.js.push(src);
        });

        // Inline JS - skip these as they're handled separately in the main script
        // The main script will extract inline scripts and add them directly to clonedFiles
    }

    extractImages(doc, baseUrl, resources) {
        // All image types
        const imageSelectors = [
            'img[src]',
            'img[data-src]',
            'img[data-original]',
            'img[data-lazy]',
            'picture source[srcset]',
            'video[poster]',
            'link[rel="icon"]',
            'link[rel="shortcut icon"]',
            'link[rel="apple-touch-icon"]'
        ];

        imageSelectors.forEach(selector => {
            doc.querySelectorAll(selector).forEach(element => {
                const src = element.src || element.href || element.getAttribute('data-src') || element.getAttribute('data-original');
                if (src) {
                    const resolvedSrc = this.resolveUrl(src, baseUrl);
                    if (resolvedSrc) resources.images.push(resolvedSrc);
                }
            });
        });
    }

    extractFonts(doc, baseUrl, resources) {
        // Font files
        doc.querySelectorAll('link[rel="preload"][as="font"], link[rel="stylesheet"][href*="font"]').forEach(font => {
            const href = this.resolveUrl(font.href, baseUrl);
            if (href) resources.fonts.push(href);
        });

        // Google Fonts
        doc.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach(font => {
            resources.fonts.push(font.href);
        });
    }

    extractMedia(doc, baseUrl, resources) {
        // Videos
        doc.querySelectorAll('video[src], video source[src]').forEach(video => {
            const src = video.src || video.getAttribute('data-src');
            if (src) {
                const resolvedSrc = this.resolveUrl(src, baseUrl);
                if (resolvedSrc) resources.videos.push(resolvedSrc);
            }
        });

        // Audio
        doc.querySelectorAll('audio[src], audio source[src]').forEach(audio => {
            const src = audio.src || audio.getAttribute('data-src');
            if (src) {
                const resolvedSrc = this.resolveUrl(src, baseUrl);
                if (resolvedSrc) resources.audios.push(resolvedSrc);
            }
        });
    }

    extractDocuments(doc, baseUrl, resources) {
        // PDFs, docs, etc.
        doc.querySelectorAll('a[href*=".pdf"], a[href*=".doc"], a[href*=".docx"], a[href*=".txt"]').forEach(link => {
            const href = this.resolveUrl(link.href, baseUrl);
            if (href) resources.documents.push(href);
        });
    }

    extractLinks(doc, baseUrl, resources) {
        // All external links
        doc.querySelectorAll('a[href]').forEach(link => {
            const href = this.resolveUrl(link.href, baseUrl);
            if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                resources.other.push(href);
            }
        });
    }

    extractMeta(doc, baseUrl, resources) {
        // Meta images, Open Graph, Twitter Cards
        doc.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"], meta[property="og:video"]').forEach(meta => {
            const content = meta.getAttribute('content');
            if (content) {
                const resolvedContent = this.resolveUrl(content, baseUrl);
                if (resolvedContent) resources.other.push(resolvedContent);
            }
        });
    }

    extractInline(doc, baseUrl, resources) {
        // Inline styles with background images
        doc.querySelectorAll('*[style*="background"]').forEach(element => {
            const style = element.getAttribute('style');
            const bgMatch = style.match(/background(?:-image)?\s*:\s*url\(['"]?([^'"]+)['"]?\)/i);
            if (bgMatch) {
                const resolvedBg = this.resolveUrl(bgMatch[1], baseUrl);
                if (resolvedBg) resources.images.push(resolvedBg);
            }
        });
    }

    extractCSSImports(cssText) {
        const imports = [];
        const importRegex = /@import\s+(?:url\()?['"]?([^'"]+)['"]?\)?/g;
        let match;
        while ((match = importRegex.exec(cssText)) !== null) {
            imports.push(match[1]);
        }
        return imports;
    }

    resolveUrl(href, baseUrl) {
        try {
            if (!href) return null;
            if (href.startsWith('data:') || href.startsWith('blob:')) return null;
            return new URL(href, baseUrl).href;
        } catch (error) {
            return null;
        }
    }
}

// Export for use in main script
window.UltraBypass = UltraBypass; 