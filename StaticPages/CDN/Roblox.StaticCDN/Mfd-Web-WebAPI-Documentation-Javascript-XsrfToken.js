if (typeof document.Mfd == 'undefined') {
	document.Mfd = {};
}
document.Mfd.XsrfToken = (function () {
	const xsrfRequestMethods = ['POST', 'PATCH', 'DELETE'];
	let currentToken = '';
	const csrfTokenHeader = 'x-csrf-token';
	const csrfInvalidResponseCode = 403;

	$(document).ajaxSend(function (event, jqxhr, settings) {
		// Send CSRF if in our own domain and is a method that requires it
		if (currentToken !== '' && xsrfRequestMethods.indexOf(settings.type.toUpperCase()) >= 0) {
			jqxhr.setRequestHeader('X-CSRF-TOKEN', currentToken);
		}
	});

	$.ajaxPrefilter(function (options) {
		if (options.dataType === 'jsonp' || options.dataType === 'script') {
			// these are most likely remote requests, don't set an error handler
			return;
		}
		const oldErrorHandler = options.error;
		options.error = function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.status === csrfInvalidResponseCode && jqXHR.getResponseHeader(csrfTokenHeader) != null) {
				// this was a token failure
				// reissue the XHR with the returned token
				const newToken = jqXHR.getResponseHeader(csrfTokenHeader);
				if (newToken == null) {
					if (typeof oldErrorHandler == 'function') {
						oldErrorHandler(jqXHR, textStatus, errorThrown);
					}
					throw new Error('Null token returned by Xsrf enabled handler');
				}
				currentToken = newToken;
				$.ajax(options).then((a, b, c) => {
					if (options.success) {
						options.success(a, b, c);
					}
				});
			} else if (typeof oldErrorHandler == 'function') {
				oldErrorHandler(jqXHR, textStatus, errorThrown);
			}
		};
	});

	function setToken(token) {
		currentToken = token;
	}

	function getToken() {
		return currentToken;
	}

	function registerToken() {
		$.ajax('https://api.sitetest4.robloxlabs.com/csrf/v1/get-csrf-token', {
			crossDomain: true,
			method: 'POST',
			success: (_b, _s, response) => {
				const t = response.getResponseHeader(csrfTokenHeader);
				if (t) currentToken = t;
			},
			xhrFields: { withCredentials: true },
		});
	}

	return {
		setToken: setToken,
		getToken: getToken,
		registerToken: registerToken,
	};
})();
