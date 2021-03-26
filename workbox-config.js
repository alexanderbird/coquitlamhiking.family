module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{html,js,png,woff,woff2,css}"
  ],
  "swDest": "build/sw.js",
  "ignoreURLParametersMatching": [],
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images',
      // Only cache a certain number of images.
      expiration: {
        maxEntries: 50,
      },
    },
  }],

};
