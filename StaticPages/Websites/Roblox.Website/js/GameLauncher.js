// GameLauncher.js
(Roblox = window.Roblox || {}),
	(Roblox.GameLauncher = (function () {
		function t(t, i, r) {
			n.gameLaunchInterface.editGameInStudio(t, i, r);
		}
		function r() {
			n.gameLaunchInterface.openStudio();
		}
		function u() {
			n.gameLaunchInterface.returnToStudio();
		}
		function f(t) {
			n.gameLaunchInterface.openPluginInStudio(t);
		}
		function i(t, i, r) {
			typeof i == 'undefined' && (i = !0), (r = r === !0);
			var u = { placeId: t, isPlayTogetherGame: r };
			return n.bcUpsellModalInterface
				.checkBcRequirement(u, i)
				.then(n.authenticationChecker.restrictGuests)
				.then(n.prerollPlayer.waitForPreroll)
				.then(n.gameLaunchInterface.joinMultiplayerGame);
		}
		function e(t) {
			var i = { userId: t };
			return n.authenticationChecker
				.restrictGuests(i)
				.then(n.prerollPlayer.waitForPreroll)
				.then(n.gameLaunchInterface.followPlayerIntoGame);
		}
		function o(t, i, r, u) {
			u = u === !0;
			var f = { placeId: t, gameId: i, isPlayTogetherGame: u };
			return n.authenticationChecker
				.restrictGuests(f)
				.then(n.prerollPlayer.waitForPreroll)
				.then(n.gameLaunchInterface.joinGameInstance);
		}
		function s(t, i, r) {
			var u = { placeId: t, accessCode: i, linkCode: r };
			return n.prerollPlayer.waitForPreroll(u).then(n.gameLaunchInterface.joinPrivateGame);
		}
		$(function () {
			n.gameLaunchLogger || typeof Roblox.GameLaunchLogger == 'undefined' || (n.gameLaunchLogger = Roblox.GameLaunchLogger),
				n.authenticationChecker ||
					typeof Roblox.AuthenticationChecker == 'undefined' ||
					(n.authenticationChecker = Roblox.AuthenticationChecker),
				n.prerollPlayer || typeof Roblox.PrerollPlayer == 'undefined' || (n.prerollPlayer = Roblox.PrerollPlayer),
				n.bcUpsellModalInterface ||
					typeof Roblox.BCUpsellModalInterface == 'undefined' ||
					(n.bcUpsellModalInterface = Roblox.BCUpsellModalInterface),
				$('body').bindGameLaunch();
		}),
			($.fn.bindGameLaunch = function () {
				return (
					this.find('.VisitButtonPlayGLI').click(function () {
						var n = $(this),
							t = n.attr('placeid'),
							r = n.data('is-membership-level-ok');
						i(t, r);
					}),
					this.find('.VisitButtonEditGLI').click(function () {
						var n = $(this),
							i = n.attr('placeid'),
							r = n.data('universeid'),
							u = n.data('allowupload') ? !0 : !1;
						t(i, r, u);
					}),
					this
				);
			});
		var n = {
			authenticationChecker: null,
			prerollPlayer: null,
			gameLaunchLogger: null,
			gameLaunchInterface: null,
			bcUpsellModalInterface: null,
			joinMultiplayerGame: i,
			openStudio: r,
			returnToStudio: u,
			openPluginInStudio: f,
			editGameInStudio: t,
			followPlayerIntoGame: e,
			joinGameInstance: o,
			joinPrivateGame: s,
			startClientAttemptedEvent: 'startClientAttempted',
			startClientFailedEvent: 'startClientFailed',
			startClientSucceededEvent: 'startClientSucceeded',
			beginInstallEvent: 'beginInstall',
			successfulInstallEvent: 'successfulInstall',
			manualDownloadEvent: 'manualDownload',
		};
		return n;
	})()),
	(Roblox.AuthenticationChecker = (function () {
		function r(t) {
			var r = 'gameDetails',
				i;
			Roblox.FormEvents && Roblox.FormEvents.SendInteractionClick(r, t),
				(i = n.signupUrl + encodeURIComponent(window.location.pathname + window.location.search)),
				(window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(i) : i);
		}
		function u(u) {
			var f = new $.Deferred();
			return $('#PlaceLauncherStatusPanel').data('is-user-logged-in') == 'True'
				? (f.resolve(u), f)
				: (Roblox.Dialog.open({
						titleText: t.f(i['Heading.Dialog.SignUpOrLogin']),
						bodyContent: t.f(i['Description.Dialog.SignUpOrLogin']),
						cssClass: n.modalClassName,
						acceptColor: Roblox.Dialog.green,
						acceptText: t.f(i['Action.Dialog.SignUp']),
						declineText: t.f(i['Action.Dialog.Login']),
						onDecline: function () {
							Roblox.FormEvents && Roblox.FormEvents.SendInteractionClick(n.eventContext, n.loginField);
							var t = n.loginUrl + encodeURIComponent(window.location.pathname + window.location.search);
							window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(t) : t;
						},
						onAccept: function () {
							r(n.signupField);
						},
				  }),
				  f);
		}
		var t = new Roblox.Intl(),
			i = Roblox.Lang && Roblox.Lang.GameLaunchGuestModeResources,
			n = {
				modalClassName: 'soli-modal',
				loginUrl: '/login?returnurl=',
				signupUrl: '/?returnurl=',
				eventContext: 'gameDetails',
				loginField: 'gameLaunch_login',
				signupField: 'gameLaunch_signup',
			};
		return { restrictGuests: u };
	})()),
	(Roblox.PrerollPlayer = {
		waitForPreroll: function (n) {
			var r = new $.Deferred(),
				t = Roblox.VideoPreRollDFP,
				i,
				u;
			return (
				(t.placeId = typeof n.placeId != 'undefined' ? n.placeId : 0),
				t && t.showVideoPreRoll
					? ((i = { escClose: !0, opacity: 80, overlayCss: { backgroundColor: '#000' }, zIndex: 1031 }),
					  (i.onShow = function (n) {
							t.correctIEModalPosition(n),
								t.start(),
								$('#prerollClose').hide(),
								$('#prerollClose')
									.delay(1e3 * t.adTime)
									.show(300);
					  }),
					  (i.onClose = function () {
							t.close();
					  }),
					  (i.closeHTML =
							'<a href="#" id="prerollClose" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>'),
					  $('#videoPrerollPanel').modal(i),
					  (u = setInterval(function () {
							t.isPlaying() || ($.modal.close(), clearInterval(u), t.videoCancelled ? r.reject(n) : r.resolve(n));
					  }, 200)))
					: (r.resolve(n), t.logVideoPreRoll()),
				r
			);
		},
	}),
	(Roblox.BCUpsellModalInterface = {
		checkBcRequirement: function (n, t) {
			var i = new $.Deferred();
			return (
				t
					? i.resolve(n)
					: typeof Roblox.BCUpsellModal != 'undefined'
					? (Roblox.BCUpsellModal.open(), i.reject(n))
					: typeof showBCOnlyModal != 'undefined'
					? (showBCOnlyModal(), i.reject(n))
					: i.resolve(n),
				i
			);
		},
	});
