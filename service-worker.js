var CACHE_NAME = 'search-wars-v1';
var urlsToCache = [
  '/',
  './images/logo-192.png',
  './images/logo-512.png',
  './styles/main.css',
  './styles/bootstrap.min.css',

  './js/bootstrap.min.js',
  './js/jquery.min.js',
  './js/search-service.js',
  './js/app.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
