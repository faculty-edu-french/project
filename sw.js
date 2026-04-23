// =========================================================
// Service Worker — Cache videos after first load
// Strategy: Cache-First for videos, Network-First for everything else
// =========================================================

const CACHE_NAME = 'livret-videos-v1';
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

// Install event — skip waiting so SW activates immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event — claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event — intercept requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isVideo = VIDEO_EXTENSIONS.some(ext => url.pathname.endsWith(ext));

  if (isVideo) {
    // Cache-First strategy for videos
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          console.log('[SW] Serving video from cache:', url.pathname);
          return cached;
        }
        // Not in cache — fetch from network and cache it
        console.log('[SW] Fetching video from network:', url.pathname);
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          console.error('[SW] Network fetch failed for video:', url.pathname);
          throw err;
        }
      })
    );
  }
  // All other requests: use default browser behavior (no interception)
});
