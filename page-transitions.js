// page-transitions.js - Handles smooth transitions between pages

class PageTransitions {
    constructor(options = {}) {
        this.options = Object.assign({
            exitDuration: 500,
            enterDuration: 500,
            defaultTransition: 'fade', // fade, slide-left, slide-right, slide-up, slide-down, zoom
            linkSelector: 'a:not([target="_blank"]):not([href^="#"])',
            ignoreSelector: '.no-transition',
            cachePages: true,
            prefetchLinks: true
        }, options);
        
        this.pageCache = {};
        this.currentUrl = window.location.href;
        this.isTransitioning = false;
        this.bodyClass = document.body.className;
        
        this.init();
    }
    
    init() {
        // Create transition container if it doesn't exist
        if (!document.getElementById('page-transition-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'page-transition-overlay';
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
        }
        
        this.overlay = document.getElementById('page-transition-overlay');
        
        // Add entry animation when page loads
        window.addEventListener('load', () => {
            this.animateEntry();
        });
        
        // Save initial page in cache
        if (this.options.cachePages) {
            this.pageCache[window.location.href] = {
                title: document.title,
                content: document.body.innerHTML
            };
        }
        
        // Handle link clicks for transition
        this.attachLinkHandlers();
        
        // Handle back/forward browser navigation
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.url) {
                this.loadPage(e.state.url, true, e.state.transition || 'slide-right');
            }
        });
        
        // Prefetch links in viewport
        if (this.options.prefetchLinks) {
            this.setupPrefetching();
        }
    }
    
    attachLinkHandlers() {
        document.addEventListener('click', (e) => {
            // Find closest link element
            let link = e.target.closest(this.options.linkSelector);
            
            if (link && !link.closest(this.options.ignoreSelector)) {
                // Check if link is within the same domain
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    
                    const url = link.href;
                    const transition = link.getAttribute('data-transition') || this.options.defaultTransition;
                    const direction = link.getAttribute('data-direction') || 'forward';
                    
                    if (url !== this.currentUrl && !this.isTransitioning) {
                        this.isTransitioning = true;
                        this.loadPage(url, false, transition, direction);
                    }
                }
            }
        });
    }
    
    loadPage(url, isPopState = false, transition = 'fade', direction = 'forward') {
        if (this.isTransitioning) return;
        
        // Animate exit
        this.animateExit(transition, direction, () => {
            // Update history if not triggered by popstate
            if (!isPopState) {
                window.history.pushState(
                    { 
                        url: url, 
                        transition: this.getOppositeTransition(transition),
                        direction: this.getOppositeDirection(direction)
                    }, 
                    '', 
                    url
                );
            }
            
            // Check if page is in cache
            if (this.options.cachePages && this.pageCache[url]) {
                this.updatePage(this.pageCache[url].content, this.pageCache[url].title);
                this.animateEntry(transition, direction);
            } else {
                // Fetch new page
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const title = doc.title;
                        const content = doc.body.innerHTML;
                        
                        // Cache page
                        if (this.options.cachePages) {
                            this.pageCache[url] = { title, content };
                        }
                        
                        this.updatePage(content, title);
                        this.animateEntry(transition, direction);
                    })
                    .catch(error => {
                        console.error('Page transition error:', error);
                        window.location = url; // Fallback to normal navigation
                    });
            }
        });
    }
    
    updatePage(content, title) {
        document.title = title;
        document.body.innerHTML = content;
        
        // Re-attach link handlers and other event listeners
        this.init();
        
        // Reinitialize any scripts from the original page
        this.reinitializeScripts();
    }
    
    animateExit(transition = 'fade', direction = 'forward', callback) {
        // Apply transition class to overlay
        this.overlay.className = `page-transition-overlay ${transition}-exit ${direction}`;
        this.overlay.style.display = 'block';
        
        // Wait for animation to complete
        setTimeout(() => {
            if (callback) callback();
        }, this.options.exitDuration);
    }
    
    animateEntry(transition = 'fade', direction = 'forward') {
        // Apply entry animation class
        this.overlay.className = `page-transition-overlay ${transition}-enter ${direction}`;
        
        // Wait for animation to complete
        setTimeout(() => {
            this.overlay.style.display = 'none';
            this.isTransitioning = false;
            
            // Trigger page change event
            window.dispatchEvent(new CustomEvent('pageChangeComplete'));
        }, this.options.enterDuration);
    }
    
    reinitializeScripts() {
        // Find and re-execute all scripts in the new page
        const scripts = document.querySelectorAll('script:not([src])');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.appendChild(document.createTextNode(script.innerHTML));
            script.parentNode.replaceChild(newScript, script);
        });
        
        // Reinitialize any external scripts
        const externalScripts = document.querySelectorAll('script[src]');
        externalScripts.forEach(script => {
            const src = script.getAttribute('src');
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.onload = script.onload;
            script.parentNode.replaceChild(newScript, script);
        });
    }
    
    getOppositeTransition(transition) {
        const opposites = {
            'slide-left': 'slide-right',
            'slide-right': 'slide-left',
            'slide-up': 'slide-down',
            'slide-down': 'slide-up',
            'fade': 'fade',
            'zoom-in': 'zoom-out',
            'zoom-out': 'zoom-in'
        };
        
        return opposites[transition] || transition;
    }
    
    getOppositeDirection(direction) {
        return direction === 'forward' ? 'backward' : 'forward';
    }
    
    setupPrefetching() {
        // Create Intersection Observer to detect links in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target;
                    const url = link.href;
                    
                    // Prefetch link if not already in cache
                    if (this.options.cachePages && !this.pageCache[url]) {
                        fetch(url)
                            .then(response => response.text())
                            .then(html => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(html, 'text/html');
                                const title = doc.title;
                                const content = doc.body.innerHTML;
                                
                                this.pageCache[url] = { title, content };
                                console.log(`Prefetched: ${url}`);
                            })
                            .catch(error => {
                                console.warn(`Failed to prefetch: ${url}`, error);
                            });
                    }
                    
                    // Stop observing once prefetched
                    observer.unobserve(link);
                }
            });
        }, { threshold: 0.1 });
        
        // Start observing all links
        document.querySelectorAll(this.options.linkSelector).forEach(link => {
            if (link.hostname === window.location.hostname && !link.closest(this.options.ignoreSelector)) {
                observer.observe(link);
            }
        });
    }
}

// Initialize page transitions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.pageTransitions = new PageTransitions({
        exitDuration: 500,
        enterDuration: 800,
        defaultTransition: 'fade',
        cachePages: true,
        prefetchLinks: true
    });
});