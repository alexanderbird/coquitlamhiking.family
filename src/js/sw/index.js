import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

self.__WB_DISABLE_DEV_LOGS = true;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({url}) => url.origin === 'https://images.hiker.family',
  new CacheFirst({
    cacheName: 'images-v3',
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
             url.origin === 'https://maps.gstatic.com' ||
             url.origin === 'https://fonts.googleapis.com' ||
             url.origin === 'https://fonts.gstatic.com',
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

self.addEventListener('install', function (event) {
  // Docs: https://bitsofco.de/what-self-skipwaiting-does-to-the-service-worker-lifecycle/
  self.skipWaiting();
});
