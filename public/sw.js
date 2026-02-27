// Service Worker for PWA installability
// Uses a network-first strategy — the site is dynamic, so we don't want stale caches

const CACHE_NAME = 'adoptme-v1';
const STATIC_ASSETS = [
    '/icon-192.png',
    '/icon-512.png',
    '/logo.webp',
];

// Install: pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch: network-first for navigation/API, cache-first for static assets
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip cross-origin requests (analytics, ads, etc.)
    if (!request.url.startsWith(self.location.origin)) return;

    // For static assets, try cache first
    if (STATIC_ASSETS.some((asset) => request.url.endsWith(asset))) {
        event.respondWith(
            caches.match(request).then((cached) => cached || fetch(request))
        );
        return;
    }

    // For everything else, network-first
    event.respondWith(
        fetch(request).catch(() => caches.match(request))
    );
});
