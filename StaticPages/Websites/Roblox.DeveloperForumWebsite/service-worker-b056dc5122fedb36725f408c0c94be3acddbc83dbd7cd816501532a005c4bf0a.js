'use strict';
importScripts('https://doy2mn9upadnk.cloudfront.net/javascripts/workbox/workbox-sw.js'),
	workbox.setConfig({ modulePathPrefix: 'https://doy2mn9upadnk.cloudfront.net/javascripts/workbox', debug: !1 });
var authUrl = '/auth/',
	cacheVersion = '1';
workbox.routing.registerRoute(
	function (t) {
		return !(t.url.origin === location.origin && t.url.pathname.startsWith(authUrl));
	},
	new workbox.strategies.NetworkFirst({
		cacheName: 'discourse-' + cacheVersion,
		plugins: [new workbox.expiration.Plugin({ maxAgeSeconds: 604800, maxEntries: 500, purgeOnQuotaError: !0 })],
	}),
);
var idleThresholdTime = 1e4,
	lastAction = -1;
function isIdle() {
	return lastAction + idleThresholdTime < Date.now();
}
function showNotification(t, i, n, o, e, a, r) {
	e = { body: i, icon: n, badge: o, data: { url: r, baseUrl: a }, tag: e };
	return self.registration.showNotification(t, e);
}
self.addEventListener('push', function (t) {
	var i = t.data.json();
	if (!isIdle() && i.hide_when_active) return !1;
	t.waitUntil(
		self.registration.getNotifications({ tag: i.tag }).then(function (t) {
			return (
				t &&
					0 < t.length &&
					t.forEach(function (t) {
						t.close();
					}),
				showNotification(i.title, i.body, i.icon, i.badge, i.tag, i.base_url, i.url)
			);
		}),
	);
}),
	self.addEventListener('notificationclick', function (t) {
		t.notification.close();
		var i = t.notification.data.url,
			n = t.notification.data.baseUrl;
		t.waitUntil(
			clients.matchAll({ type: 'window' }).then(function (t) {
				if (
					!t.some(function (t) {
						return t.url === n + i && 'focus' in t
							? (t.focus(), !0)
							: 'postMessage' in t && 'focus' in t && (t.focus(), t.postMessage({ url: i }), !0);
					}) &&
					clients.openWindow
				)
					return clients.openWindow(n + i);
			}),
		);
	}),
	self.addEventListener('message', function (t) {
		'lastAction' in t.data && (lastAction = t.data.lastAction);
	});
//# sourceMappingURL=https://doy2mn9upadnk.cloudfront.net/assets/service-worker-b056dc5122fedb36725f408c0c94be3acddbc83dbd7cd816501532a005c4bf0a.js.map
