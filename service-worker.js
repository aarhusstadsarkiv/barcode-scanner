const VERSION = 'v2.0.1';
const urlsToCache = [
	'/',
	'/index.html',
	'/html5-qrcode.min.js',
	`/data.json`,
	'/favicon_io/android-chrome-192x192.png',
	'/favicon_io/android-chrome-512x512.png',
	'/favicon_io/apple-touch-icon.png',
	'/favicon_io/favicon-32x32.png',
	'/favicon_io/favicon-16x16.png',
	'/manifest.json',
];

console.log('cache name', VERSION);

self.addEventListener('install', event => {
	console.log('Installing new service worker...');
	event.waitUntil(
		caches.open(VERSION)
			.then(cache => {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('activate', event => {
	console.log('Activating new service worker...');
	event.waitUntil(
		caches.keys().then(cacheNames => {
			console.log('Current caches:', cacheNames);
			return Promise.all(
				cacheNames.filter(cacheName => {
					const isOldCache = cacheName !== VERSION;
					console.log(`Checking cache: ${cacheName}, delete: ${isOldCache}`);
					return isOldCache;
				}).map(cacheName => {
					console.log(`Deleting cache: ${cacheName}`);
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request).then(
				response => {
					// Check if we received a valid response
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}
					var responseToCache = response.clone();
					caches.open(VERSION).then(cache => {
						cache.put(event.request, responseToCache);
					});
					return response;
				}
			);
		})
	);
});