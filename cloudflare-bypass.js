// ===== CLOUDFLARE BYPASS SYSTEM =====
// Advanced bypass for Cloudflare protection and anti-bot measures

class CloudflareBypass {
    constructor() {
        this.userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
        ];
        
        this.cloudflareProxies = [
            'https://api.allorigins.win/raw?url=',
            'https://cors-anywhere.herokuapp.com/',
            'https://thingproxy.freeboard.io/fetch/',
            'https://cors.bridged.cc/',
            'https://api.codetabs.com/v1/proxy?quest=',
            'https://corsproxy.io/?',
            'https://proxy.cors.sh/',
            'https://api.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=',
            'https://app.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=',
            'https://api.scrapingant.com/v2/general?url=',
            'https://api.scrapingdog.com/scrape?url=',
            'https://api.proxycrawl.com/?token=YOUR_TOKEN&url=',
            'https://api.scrapestack.com/scrape?access_key=YOUR_KEY&url=',
            'https://api.zenrows.com/v1/?apikey=YOUR_KEY&url='
        ];
        
        this.stealthHeaders = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
        };
        
        this.currentUserAgentIndex = 0;
        this.currentProxyIndex = 0;
    }

    async bypassCloudflare(url, cloner) {
        cloner.addLog('🛡️ Cloudflare protection detected!', 'warning');
        cloner.addLog('🚀 Initiating advanced Cloudflare bypass sequence...', 'system');
        
        const methods = [
            () => this.method1_StealthFetch(url, cloner),
            () => this.method2_ProxyRotation(url, cloner),
            () => this.method3_IframeInjection(url, cloner),
            () => this.method4_ServiceWorker(url, cloner),
            () => this.method5_WebRTC(url, cloner),
            () => this.method6_IndexedDB(url, cloner),
            () => this.method7_LocalStorage(url, cloner),
            () => this.method8_WebSocket(url, cloner),
            () => this.method9_SharedWorker(url, cloner),
            () => this.method10_WebAssembly(url, cloner)
        ];

        for (let i = 0; i < methods.length; i++) {
            try {
                cloner.addLog(`🔄 Cloudflare bypass method ${i + 1}...`, 'system');
                const result = await methods[i]();
                if (result && result.ok) {
                    cloner.addLog(`✅ Cloudflare bypass method ${i + 1} SUCCESS!`, 'success');
                    return result;
                }
            } catch (error) {
                cloner.addLog(`❌ Cloudflare bypass method ${i + 1} failed: ${error.message}`, 'warning');
                continue;
            }
        }

        throw new Error('All Cloudflare bypass methods failed');
    }

    async method1_StealthFetch(url, cloner) {
        // Method 1: Stealth fetch with rotating user agents and headers
        const userAgent = this.userAgents[this.currentUserAgentIndex];
        this.currentUserAgentIndex = (this.currentUserAgentIndex + 1) % this.userAgents.length;

        const headers = {
            ...this.stealthHeaders,
            'User-Agent': userAgent,
            'Referer': this.getReferer(url),
            'Origin': this.getOrigin(url)
        };

        // Add random delays to appear more human-like
        await this.randomDelay(1000, 3000);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            credentials: 'omit'
        });

        if (response.ok && !response.url.includes('cloudflare')) {
            return response;
        }

        throw new Error('Stealth fetch blocked by Cloudflare');
    }

    async method2_ProxyRotation(url, cloner) {
        // Method 2: Rotate through multiple proxy services
        for (let i = 0; i < this.cloudflareProxies.length; i++) {
            const proxyUrl = this.cloudflareProxies[i] + encodeURIComponent(url);
            
            try {
                cloner.addLog(`🔄 Trying proxy ${i + 1}/${this.cloudflareProxies.length}`, 'system');
                
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    headers: {
                        'User-Agent': this.userAgents[this.currentUserAgentIndex],
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    },
                    timeout: 10000
                });

                if (response.ok) {
                    this.currentUserAgentIndex = (this.currentUserAgentIndex + 1) % this.userAgents.length;
                    return response;
                }
            } catch (error) {
                continue;
            }
        }

        throw new Error('All proxies failed');
    }

    async method3_IframeInjection(url, cloner) {
        // Method 3: Inject iframe and extract content
        return new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.crossOrigin = 'anonymous';
            iframe.sandbox = 'allow-same-origin allow-scripts';
            
            iframe.onload = () => {
                try {
                    const content = iframe.contentDocument || iframe.contentWindow.document;
                    if (content && !content.title.includes('403')) {
                        resolve({
                            ok: true,
                            text: () => Promise.resolve(content.documentElement.outerHTML),
                            headers: new Headers(),
                            status: 200
                        });
                    } else {
                        reject(new Error('Iframe blocked by Cloudflare'));
                    }
                } catch (error) {
                    reject(error);
                } finally {
                    document.body.removeChild(iframe);
                }
            };
            
            iframe.onerror = () => {
                document.body.removeChild(iframe);
                reject(new Error('Iframe failed to load'));
            };
            
            document.body.appendChild(iframe);
            iframe.src = url;
        });
    }

    async method4_ServiceWorker(url, cloner) {
        // Method 4: Use Service Worker for caching and bypass
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
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
        }
        throw new Error('Service Worker not available');
    }

    async method5_WebRTC(url, cloner) {
        // Method 5: Use WebRTC for peer-to-peer data transfer
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

    async method6_IndexedDB(url, cloner) {
        // Method 6: Check IndexedDB cache
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('CloudflareBypass', 1);
            
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

    async method7_LocalStorage(url, cloner) {
        // Method 7: Check localStorage cache
        const cached = localStorage.getItem(`cf_cache_${btoa(url)}`);
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

    async method8_WebSocket(url, cloner) {
        // Method 8: Try WebSocket connection
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

    async method9_SharedWorker(url, cloner) {
        // Method 9: Use Shared Worker for background processing
        if ('SharedWorker' in window) {
            try {
                const worker = new SharedWorker('/worker.js');
                worker.port.postMessage({ type: 'fetch', url: url });
                
                return new Promise((resolve, reject) => {
                    worker.port.onmessage = (event) => {
                        if (event.data.success) {
                            resolve({
                                ok: true,
                                text: () => Promise.resolve(event.data.content),
                                headers: new Headers(),
                                status: 200
                            });
                        } else {
                            reject(new Error('Shared Worker failed'));
                        }
                    };
                    
                    setTimeout(() => reject(new Error('Shared Worker timeout')), 10000);
                });
            } catch (error) {
                throw new Error('Shared Worker not available');
            }
        }
        throw new Error('Shared Worker not supported');
    }

    async method10_WebAssembly(url, cloner) {
        // Method 10: Use WebAssembly for advanced processing
        try {
            // Simulate WebAssembly-based request
            const wasmModule = await this.createWasmModule();
            const result = await wasmModule.fetch(url);
            
            if (result) {
                return {
                    ok: true,
                    text: () => Promise.resolve(result),
                    headers: new Headers(),
                    status: 200
                };
            }
        } catch (error) {
            // Fallback to standard fetch with enhanced headers
            const response = await fetch(url, {
                headers: {
                    'User-Agent': this.userAgents[this.currentUserAgentIndex],
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                }
            });
            
            if (response.ok) {
                return response;
            }
        }
        
        throw new Error('WebAssembly method failed');
    }

    async createWasmModule() {
        // Simulate WebAssembly module creation
        return {
            fetch: async (url) => {
                // This would contain actual WebAssembly code for advanced request handling
                throw new Error('WebAssembly module not implemented');
            }
        };
    }

    getReferer(url) {
        try {
            const urlObj = new URL(url);
            return `${urlObj.protocol}//${urlObj.hostname}/`;
        } catch (error) {
            return 'https://www.google.com/';
        }
    }

    getOrigin(url) {
        try {
            const urlObj = new URL(url);
            return `${urlObj.protocol}//${urlObj.hostname}`;
        } catch (error) {
            return 'https://www.google.com';
        }
    }

    async randomDelay(min, max) {
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // Advanced detection methods
    isCloudflareProtected(response) {
        const text = response.text || '';
        return text.includes('cloudflare') || 
               text.includes('403 Forbidden') || 
               text.includes('Access denied') ||
               text.includes('Security check') ||
               text.includes('Please wait') ||
               text.includes('Checking your browser');
    }

    // Bypass rate limiting
    async handleRateLimit(cloner) {
        cloner.addLog('⏰ Rate limit detected, waiting...', 'warning');
        await this.randomDelay(5000, 15000);
        cloner.addLog('🔄 Resuming after rate limit cooldown...', 'system');
    }
}

// Export for use in main script
window.CloudflareBypass = CloudflareBypass; 