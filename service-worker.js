const CACHE_NAME = 'qr-scanner-v1.0.1';
const urlsToCache = [
  '/barcode-scanner/',
  '/barcode-scanner/index.html',
  '/barcode-scanner/html5-qrcode.min.js',
  '/barcode-scanner/data.json',
  '/barcode-scanner/favicon_io/android-chrome-192x192.png',
  '/barcode-scanner/favicon_io/android-chrome-512x512.png',
  '/barcode-scanner/favicon_io/apple-touch-icon.png',
  '/barcode-scanner/favicon_io/favicon-32x32.png',
  '/barcode-scanner/favicon_io/favicon-16x16.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching URLs:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});
