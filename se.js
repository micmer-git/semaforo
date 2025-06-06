const CACHE_NAME = 'semaforo-v1';
const urlsToCache = [
    './', // Caches the root (index.html)
    './index.html',
    './manifest.json',
    './sw.js',
    // Add your icon paths here:
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png'
    // You might also want to cache your fonts if you're hosting them locally
    // e.g., 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap'
    // But for simplicity, we'll assume external fonts are fine as they might not be critical for offline functionality.
];

// Install event: caches all specified assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Failed to cache assets:', err);
            })
    );
});

// Fetch event: serves assets from cache if available, otherwise fetches from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request);
            })
    );
});

// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete old caches
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
