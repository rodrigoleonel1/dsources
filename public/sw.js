const STATIC_CACHE = "dsources-static-v2";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/** Best-effort save into the cache without ever breaking the request. */
function cachePutSilently(cacheName, request, response) {
  try {
    if (!response || response.bodyUsed) return;
    if (!response.ok || response.status < 200 || response.status > 399) return;
    const clone = response.clone();
    caches
      .open(cacheName)
      .then((cache) => cache.put(request, clone))
      .catch(() => {
        // Cache failures (opaque/streamed bodies) are never fatal.
      });
  } catch {
    // response.clone() may throw if the body was already read.
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never intercept API calls or cross-origin requests — always hit the network.
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  // Immutable Next.js build assets: cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        cachePutSilently(STATIC_CACHE, request, response);
        return response;
      })
    );
    return;
  }

  // Everything else (pages, data): network-first, falling back to cache when offline.
  // Document/navigation responses stream their body, so we never try to cache them.
  const isNavigation = request.mode === "navigate";
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (!isNavigation) cachePutSilently(STATIC_CACHE, request, response);
        return response;
      } catch {
        const cached = await caches.match(request);
        return cached || Response.error();
      }
    })()
  );
});