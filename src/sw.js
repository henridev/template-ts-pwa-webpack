importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

if ("workbox" in self) {
  // workbox.core.skipWaiting();
  // workbox.core.clientsClaim();

  console.log("service working");

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
}

// const cacheName = "pwa-conf-v1";
// const staticAssets = ["./", "./index.html", "index.js", "styles.css"];
// const EVENTS = {
//   install: "install",
//   fetch: "fetch",
// };

// async function installHandler(e) {
//   console.log("install event");
//   await cacheStaticAssets();
// }

// async function fetchHandler(e) {
//   console.log("fetch event", e.request.url);
//   const req = e.request;

//   if (/.*(json)$/.test(req.url)) return e.respondWith(networkFirst(req));

//   return e.respondWith(cacheFirst(req));
// }

// /**
//  * strategies
//  * - cacheFirst
//  * - networkFirst
//  */
// async function cacheFirst(req) {
//   console.log("cache first");
//   const cache = await caches.open(cacheName);
//   const cachedResponse = await cache.match(req);
//   return cachedResponse || networkFirst(req) || fetch(req);
// }

// async function networkFirst(req) {
//   console.log("network first");
//   const cache = async () => await caches.open(cacheName);
//   try {
//     const res = await fetch(req);

//     if (res.status !== 200) throw Error;

//     (await cache()).put(req, res.clone()); // clone because request are only to be read once

//     return res;
//   } catch (error) {
//     console.log("retrieve from cache because offline");

//     return await (await cache()).match(req);
//   }
// }

// /**
//  * service workers are 100% event driven
//  * most notably:
//  * - install
//  * - fetch
//  */
// self.addEventListener(EVENTS.install, installHandler);
// self.addEventListener(EVENTS.fetch, fetchHandler);

// /**
//  * utils
//  */
// async function cacheStaticAssets() {
//   console.log("caching static assets");
//   const cache = await caches.open(cacheName);
//   return await cache.addAll(staticAssets);
// }

// console.log("here");
