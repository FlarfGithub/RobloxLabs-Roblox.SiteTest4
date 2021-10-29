// GameLaunchLogger.js
(Roblox = window.Roblox || {}),
	(Roblox.GameLaunchLogger = (function () {
		function u(n) {
			r.logToConsoleEnabled && console && console.log && console.log(n);
		}
		function f(n, t) {
			if (r.logToEphemeralCountersEnabled) {
				var i = h();
				i == 'Windows' && (i = 'Win32'),
					(n = n.replace('<os>', i)),
					(n = n.replace('<launchmethod>', t)),
					typeof EventTracker != 'undefined' && EventTracker && EventTracker.fireEvent && EventTracker.fireEvent(n);
			}
		}
		function e(n, t, i, u) {
			typeof GoogleAnalyticsEvents != 'undefined' &&
				r.logToGAEnabled &&
				GoogleAnalyticsEvents &&
				GoogleAnalyticsEvents.FireEvent &&
				GoogleAnalyticsEvents.FireEvent([n, t, i, u]);
		}
		function o(r, o) {
			u(r.type + ': ' + JSON.stringify(o)),
				i[r.type] &&
					$.each(i[r.type], function (n, t) {
						f(t, o.launchMethod);
					}),
				n[r.type] && e(o.launchMethod, n[r.type], s(o), 0),
				$('#PlaceLauncherStatusPanel').data('event-stream-for-protocol-enabled') == 'True' &&
					t[r.type] &&
					t[r.type](null, o.params.placeId);
		}
		function s(n) {
			return n.params.launchMode;
		}
		function h() {
			return $('#PlaceLauncherStatusPanel').data('os-name');
		}
		var i, n, t, r;
		return (
			$(function () {
				var n = [
					Roblox.GameLauncher.startClientAttemptedEvent,
					Roblox.GameLauncher.startClientFailedEvent,
					Roblox.GameLauncher.startClientSucceededEvent,
					Roblox.GameLauncher.beginInstallEvent,
					Roblox.GameLauncher.successfulInstallEvent,
					Roblox.GameLauncher.manualDownloadEvent,
				];
				$(Roblox.GameLauncher).on(n.join(' '), o);
			}),
			(i = {}),
			(i[Roblox.GameLauncher.startClientAttemptedEvent] = ['GameLaunchAttempt_<os>', 'GameLaunchAttempt_<os>_<launchmethod>']),
			(i[Roblox.GameLauncher.startClientSucceededEvent] = ['GameLaunchSuccessWeb_<os>', 'GameLaunchSuccessWeb_<os>_<launchmethod>']),
			(n = {}),
			Roblox.GaEventSettings.gaLaunchAttemptAndLaunchSuccessEnabled &&
				((n[Roblox.GameLauncher.startClientAttemptedEvent] = 'Launch Attempt'),
				(n[Roblox.GameLauncher.startClientSucceededEvent] = 'Launch Success')),
			(n[Roblox.GameLauncher.beginInstallEvent] = 'Install Begin'),
			(n[Roblox.GameLauncher.successfulInstallEvent] = 'Install Success'),
			(n[Roblox.GameLauncher.manualDownloadEvent] = 'Manual Download'),
			(t = {}),
			typeof Roblox.GamePlayEvents != 'undefined' &&
				((t[Roblox.GameLauncher.startClientAttemptedEvent] = Roblox.GamePlayEvents.SendClientStartAttempt),
				(t[Roblox.GameLauncher.startClientSucceededEvent] = Roblox.GamePlayEvents.SendClientStartSuccessWeb),
				(t[Roblox.GameLauncher.beginInstallEvent] = Roblox.GamePlayEvents.SendInstallBegin),
				(t[Roblox.GameLauncher.successfulInstallEvent] = Roblox.GamePlayEvents.SendInstallSuccess),
				(t[Roblox.GameLauncher.manualDownloadEvent] = Roblox.GamePlayEvents.SendManualDownloadClick)),
			(r = {
				logToConsoleEnabled: !1,
				logToGAEnabled: !0,
				logToEphemeralCountersEnabled: !0,
				logToConsole: u,
				logToEphemeralCounters: f,
				logToGA: e,
			})
		);
	})());
