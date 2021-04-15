import { PrecacheController } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

precacheAndRouteNetworkFirst(self.__WB_MANIFEST);

registerRoute(
  ({url}) => url.origin === 'https://images.hiker.family',
  new CacheFirst({
    cacheName: 'images-v2',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({ maxEntries: 50 }),
    ]
  }),
);


registerRoute(
  ({url}) => url.origin === 'https://maps.googleapis.com' ||
             url.origin === 'https://maps.gstatic.com',
  new NetworkFirst({
    cacheName: 'google-maps',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: ONE_DAY_IN_SECONDS * 2,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  }),
);


function precacheAndRouteNetworkFirst(precacheManifest) {
  console.info({ precacheManifest });
  // Docs: https://developers.google.com/web/tools/workbox/modules/workbox-precaching#using_precachecontroller_directly
  const precacheController = new PrecacheController();
  precacheController.addToCacheList(precacheManifest);

  self.addEventListener('install', (event) => {
    event.waitUntil(precacheController.install(event));
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(precacheController.activate(event));
  });

  self.addEventListener('fetch', async (event) => {
    const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
    const cache = await caches.open(cacheKey)
    try {
      const networkResponse = await fetch(event.request);
      cache.put(event.request, networkResponse.clone());
      event.respondWith(networkResponse);
    } catch(e) {
      event.respondWith(cache.match(event.request));
    }
  });
}
