const CACHE_NAME = "lfp-recepcion-v2"; // subí la versión
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  // Imágenes principales
  "./lfp-logo.jpg",
  "./lfp-water.png",

  // Íconos PWA / favicon
  "./apple-touch-icon.png",
  "./favicon.ico",
  "./favicon-96x96.png",
  "./web-app-manifest-192x192.png",
  "./web-app-manifest-512x512.png",

  // Audio de gracias
  "./audio.mp3"
];

// Instalar y guardar en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Activar y limpiar caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Responder primero desde caché, luego desde la red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

