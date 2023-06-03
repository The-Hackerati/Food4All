// var staticCacheName = "food4all";
 
// self.addEventListener("install", function (e) {
//   e.waitUntil(
//     caches.open(staticCacheName).then(function (cache) {
//       return cache.addAll(["/"]);
//     })
//   );
// });
 
// self.addEventListener("fetch", function (event) {
//   console.log(event.request.url);
 
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     })
//   );
// });
const staticCacheName = "food4all-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
