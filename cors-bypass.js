// ===== CORS BYPASS SOLUTIONS =====
// Multiple methods to bypass CORS restrictions

class CORSBypass {
    constructor() {
        this.proxyUrls = [
            'https://api.allorigins.win/raw?url=',
            'https://cors-anywhere.herokuapp.com/',
            'https://thingproxy.freeboard.io/fetch/',
            'https://cors.bridged.cc/',
            'https://api.codetabs.com/v1/proxy?quest='
        ];
        this.currentProxyIndex = 0;
    }

    async fetchWithBypass(url, options = {}) {
        const methods = [
            () => this.tryDirectFetch(url, options),
            () => this.tryProxyFetch(url, options),
            () => this.tryImageProxy(url),
            () => this.tryIframeMethod(url),
            () => this.tryJSONP(url)
        ];

        for (let i = 0; i < methods.length; i++) {
            try {
                console.log(`🔄 Trying method ${i + 1} for: ${url}`);
                const result = await methods[i]();
                if (result) {
                    console.log(`✅ Method ${i + 1} succeeded for: ${url}`);
                    return result;
                }
            } catch (error) {
                console.log(`❌ Method ${i + 1} failed: ${error.message}`);
                continue;
            }
        }

        throw new Error('All CORS bypass methods failed');
    }

    async tryDirectFetch(url, options) {
        try {
            const response = await fetch(url, {
                ...options,
                mode: 'cors',
                credentials: 'omit',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    ...options.headers
                }
            });

            if (response.ok) {
                return response;
            }
        } catch (error) {
            // Continue to next method
        }
        return null;
    }

    async tryProxyFetch(url, options) {
        for (let i = 0; i < this.proxyUrls.length; i++) {
            try {
                const proxyUrl = this.proxyUrls[i] + encodeURIComponent(url);
                const response = await fetch(proxyUrl, {
                    ...options,
                    mode: 'cors',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        ...options.headers
                    }
                });

                if (response.ok) {
                    return response;
                }
            } catch (error) {
                console.log(`Proxy ${i + 1} failed: ${error.message}`);
                continue;
            }
        }
        return null;
    }

    async tryImageProxy(url) {
        // For image resources, try using a different approach
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
            try {
                const imgProxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
                const response = await fetch(imgProxyUrl);
                if (response.ok) {
                    return response;
                }
            } catch (error) {
                // Continue to next method
            }
        }
        return null;
    }

    async tryIframeMethod(url) {
        // Create a hidden iframe to bypass CORS
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            
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
        });
    }

    async tryJSONP(url) {
        // For JSON APIs, try JSONP approach
        if (url.includes('api') || url.includes('json')) {
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
        return null;
    }

    // Special method for scraping with multiple fallbacks
    async scrapeWebsite(url) {
        const methods = [
            () => this.scrapeWithProxy(url),
            () => this.scrapeWithIframe(url),
            () => this.scrapeWithService(url)
        ];

        for (const method of methods) {
            try {
                const result = await method();
                if (result) return result;
            } catch (error) {
                console.log(`Scraping method failed: ${error.message}`);
                continue;
            }
        }

        throw new Error('All scraping methods failed');
    }

    async scrapeWithProxy(url) {
        const proxyServices = [
            `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
            `https://cors-anywhere.herokuapp.com/${url}`,
            `https://thingproxy.freeboard.io/fetch/${url}`,
            `https://cors.bridged.cc/${url}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
        ];

        for (const proxyUrl of proxyServices) {
            try {
                const response = await fetch(proxyUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (response.ok) {
                    const html = await response.text();
                    return this.parseHTML(html, url);
                }
            } catch (error) {
                continue;
            }
        }

        return null;
    }

    async scrapeWithIframe(url) {
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.crossOrigin = 'anonymous';
            iframe.src = url;
            
            iframe.onload = () => {
                try {
                    const content = iframe.contentDocument || iframe.contentWindow.document;
                    const html = content.documentElement.outerHTML;
                    document.body.removeChild(iframe);
                    resolve(this.parseHTML(html, url));
                } catch (error) {
                    document.body.removeChild(iframe);
                    reject(error);
                }
            };
            
            iframe.onerror = () => {
                document.body.removeChild(iframe);
                reject(new Error('Iframe scraping failed'));
            };
            
            document.body.appendChild(iframe);
        });
    }

    async scrapeWithService(url) {
        // Use a web scraping service as last resort
        const services = [
            `https://api.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=${encodeURIComponent(url)}`,
            `https://app.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=${encodeURIComponent(url)}`
        ];

        for (const serviceUrl of services) {
            try {
                const response = await fetch(serviceUrl);
                if (response.ok) {
                    const html = await response.text();
                    return this.parseHTML(html, url);
                }
            } catch (error) {
                continue;
            }
        }

        return null;
    }

    parseHTML(html, baseUrl) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract all resources
        const resources = {
            html: html,
            css: [],
            js: [],
            images: [],
            fonts: [],
            other: []
        };

        // Extract CSS
        doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = this.resolveUrl(link.href, baseUrl);
            if (href) resources.css.push(href);
        });

        // Extract JS
        doc.querySelectorAll('script[src]').forEach(script => {
            const src = this.resolveUrl(script.src, baseUrl);
            if (src) resources.js.push(src);
        });

        // Extract images
        doc.querySelectorAll('img[src]').forEach(img => {
            const src = this.resolveUrl(img.src, baseUrl);
            if (src) resources.images.push(src);
        });

        // Extract fonts
        doc.querySelectorAll('link[rel="preload"][as="font"], link[rel="stylesheet"][href*="font"]').forEach(font => {
            const href = this.resolveUrl(font.href, baseUrl);
            if (href) resources.fonts.push(href);
        });

        return resources;
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
window.CORSBypass = CORSBypass; 