const CACHE_NAME = 'qr-scanner-v1.2.8';
const urlsToCache = [
  '/barcode-scanner/',
  '/barcode-scanner/index.html',
  '/barcode-scanner/html5-qrcode.min.js',
  `/barcode-scanner/data.json`,
  '/barcode-scanner/favicon_io/android-chrome-192x192.png',
  '/barcode-scanner/favicon_io/android-chrome-512x512.png',
  '/barcode-scanner/favicon_io/apple-touch-icon.png',
  '/barcode-scanner/favicon_io/favicon-32x32.png',
  '/barcode-scanner/favicon_io/favicon-16x16.png',
];

console.log('cache name', CACHE_NAME);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching URLs:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Try to get the resource from the network
// before falling back to the cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(networkResponse => {
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, networkResponse.clone());
      });
      // And return the network response
      return networkResponse;
    }).catch(() => {
      // If the network request fails, try to serve the resource from the cache
      return caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        // Optionally, provide a fallback
      });
    })
  );
});
