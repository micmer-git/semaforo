const CACHE = "semafori-v1";
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(c =>
            c.addAll([
                "/",               // index.html
                "/manifest.json",
                "/icons/icon-192.png",
                "/icons/icon-512.png"
                // 📌  add other static assets here
            ])
        )
    );
});
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(resp => resp || fetch(e.request))
    );
});