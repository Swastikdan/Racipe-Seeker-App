/* This code is a service worker script written in JavaScript. It is responsible for caching files and
handling fetch requests in a web application. */
const CACHE_NAME = 'Recipe-Seeker-App';
const CACHE_FILES = ['offline.html','index.html','recipe-details.html','/src/js/main.js', '/src/css/style.css', '/src/js/darkmode.js', 'offline.js', 'apple-touch-icon.svg', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png', 'favicon.ico', 'service-worker.js','/src/js/preline.js','/src/fonts/Maven__3__nC0f8V_YU.woff2','400.html','500.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }).catch(() => {
      return caches.match('offline.html');
    })
  );
  refreshCache();
});
const refreshCache = () => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.keys().then((keys) => {
      keys.forEach((request) => {
        if (request.url && request.url.startsWith(self.location.origin)) {
          cache.match(request).then((response) => {
            if (response && response.headers && response.headers.get('date')) {
              const now = Date.now();
              const threeSecondsAgo = now - 2 * 24 * 60 * 60 * 1000; 
              const lastModifiedDate = new Date(response.headers.get('date')).getTime();
              if (lastModifiedDate < threeSecondsAgo) {
                cache.delete(request).then(() => {
                  fetch(request);
                });
              }
            }
          });
        }
      });
    });
  });
};

