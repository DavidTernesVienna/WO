const CACHE = 'lean-timer-cache-v1';
const BASE = '/WO/';
const URLS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(URLS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
