// ─── PMS TRACKER SERVICE WORKER ───
// Version: bump this string to force cache refresh
const CACHE_VERSION = 'pms-tracker-v1.0';
const OFFLINE_URL   = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Noto+Sans:wght@300;400;600&display=swap'
];

// ─── INSTALL: cache all static assets ───
self.addEventListener('install', event => {
  console.log('[SW] Installing PMS Tracker SW...');
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      console.log('[SW] Caching static assets');
      // Cache what we can, don't fail on font errors
      return Promise.allSettled(
        STATIC_ASSETS.map(url => cache.add(url).catch(e => console.warn('[SW] Could not cache:', url, e)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE: clean old caches ───
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH: cache-first for static, network-first for dynamic ───
self.addEventListener('fetch', event => {
  // Skip non-GET and Chrome extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve from cache, update in background
        fetchAndUpdate(event.request);
        return cached;
      }

      // Not in cache → try network
      return fetch(event.request)
        .then(response => {
          // Cache a copy for next time
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Network failed → serve offline page for HTML requests
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match(OFFLINE_URL);
          }
          return new Response('', { status: 408, statusText: 'Offline' });
        });
    })
  );
});

// ─── Background update (stale-while-revalidate) ───
function fetchAndUpdate(request) {
  return fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
      }
    })
    .catch(() => {});
}

// ─── MESSAGE: force update ───
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
