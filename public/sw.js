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
    // IMPORTANT: Only cache full 200 responses, never partial 206 responses
    // (browsers send Range requests for videos which return 206 Partial Content,
    //  and the Cache API does NOT support storing 206 responses)
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request.url);
        if (cached) {
          console.log('[SW] Serving video from cache:', url.pathname);
          return cached;
        }

        // Not cached — fetch WITHOUT range headers to get a full 200 response
        const fullRequest = new Request(event.request.url, {
          method: 'GET',
          headers: {}, // No range headers
          mode: 'cors',
          credentials: 'same-origin',
        });

        console.log('[SW] Fetching full video from network:', url.pathname);
        try {
          const networkResponse = await fetch(fullRequest);
          // Only cache full 200 OK responses (never 206 Partial Content)
          if (networkResponse.ok && networkResponse.status === 200) {
            cache.put(event.request.url, networkResponse.clone());
            console.log('[SW] Video cached successfully:', url.pathname);
          }
          return networkResponse;
        } catch (err) {
          console.error('[SW] Network fetch failed for video:', url.pathname, err);
          throw err;
        }
      })
    );
  }
  // All other requests: use default browser behavior
});
