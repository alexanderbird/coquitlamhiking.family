if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
  window.addEventListener('load', () => {
    caches.keys().then(cacheNames => {
      const knownCaches = [
        'google-maps',
        'images-v2',
        cacheNames.find(name => name.match(/workbox-precache-v2/))
      ];
      const notIn = haystack => needle => haystack.indexOf(needle) < 0;
      cacheNames.filter(notIn(knownCaches)).forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  });
}
