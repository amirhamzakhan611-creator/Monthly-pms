const CACHE_VERSION = 'pms-tracker-v2.0';
const OFFLINE_URL   = '/Monthly-pms/offline.html';
const BASE = '/Monthly-pms/';

const STATIC_ASSETS = [
  '/Monthly-pms/',
  '/Monthly-pms/index.html',
  '/Monthly-pms/offline.html',
  '/Monthly-pms/manifest.json',
  '/Monthly-pms/icon-192.png',
  '/Monthly-pms/icon-512.png',
  '/Monthly-pms/icon-384.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache =>
      Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url).catch(e => console.warn('[SW] skip:', url))))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        fetch(event.request).then(r => {
          if (r && r.status === 200) caches.open(CACHE_VERSION).then(c => c.put(event.request, r));
        }).catch(()=>{});
        return cached;
      }
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html'))
          return caches.match(OFFLINE_URL);
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
