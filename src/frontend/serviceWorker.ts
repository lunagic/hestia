/// <reference lib="webworker" />
declare var self: ServiceWorkerGlobalScope

const cacheName = "hestia-cache-v1"

self.addEventListener("install", () => {
	// console.log("[Service Worker] Install")
})

self.addEventListener("fetch", (e: FetchEvent) => {
	e.respondWith(
		(async () => {
			let response: Response | null = null
			let responseError: unknown

			try {
				response = await fetch(e.request)
			} catch (error) {
				responseError = error
			}

			const requestIsCacheable = isCacheable(e.request)
			const responseIsDown = isDown(response)

			// Serve the cache
			if (responseIsDown && requestIsCacheable) {
				const cache = await caches.open(cacheName)
				const cachedResponse = await cache.match(e.request)
				if (cachedResponse) {
					return cachedResponse
				}
			}

			if (!response) {
				console.error(responseError)
				return new Response("Offline and no cached version available", {
					status: 503,
					statusText: "Service Unavailable",
				})
			}

			if (isCacheable(e.request)) {
				const cache = await caches.open(cacheName)
				cache.put(e.request, response.clone())
			}

			return response
		})(),
	)
})

function isDown(response: Response | null): boolean {
	if (!response) {
		return true
	}

	if (response.status === 502) {
		return true
	}

	return false
}

function isCacheable(request: Request): boolean {
	if (!request.referrer) {
		return true
	}

	const resource = new URL(request.url)
	const referrer = new URL(request.referrer)

	if (referrer.host !== resource.host) {
		return false
	}

	// Ensure assets
	if (resource.pathname.startsWith("/assets/")) {
		return true
	}

	if (resource.pathname.startsWith("/.vite/")) {
		return false
	}

	if (resource.pathname.endsWith("/")) {
		return true
	}

	return false
}
