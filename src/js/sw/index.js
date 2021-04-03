import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';


precacheAndRoute(self.__WB_MANIFEST);

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
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  }),
);

