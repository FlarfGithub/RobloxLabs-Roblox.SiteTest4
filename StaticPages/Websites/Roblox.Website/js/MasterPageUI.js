// enable tipsy
$(function () {
	try {
		$('.tooltip').tipsy();
		$('.tooltip-top').tipsy({ gravity: 's' });
		$('.tooltip-right').tipsy({ gravity: 'w' });
		$('.tooltip-left').tipsy({ gravity: 'e' });
		$('.tooltip-bottom').tipsy({ gravity: 'n' });
	} catch (err) {}

	// <a disabled> anchor tags don't support disabled attributes in HTML5
	// Since this is in our master styleguide we just need to add the disabled property when we detect a disabled button
	$('a.btn-disabled-primary[disabled]').prop('disabled', true);
});

if (typeof Roblox === 'undefined') {
	Roblox = {};
}

/* Roblox.FixedUI handles hiding iframe ads when conflicting with the fixed header, 
and unfixing the header when the window is resized or we are on mobile devices */
Roblox.FixedUI = (function () {
	var unfixHeaderThreshold = 700;
	var ua = navigator.userAgent.toLowerCase(); /* unfix headers for iphone, mobile, android, blackberry or playbook devices */
	var isMobile =
		/mobile/i.test(ua) ||
		/ipad/i.test(ua) ||
		/iphone/i.test(ua) ||
		/android/i.test(ua) ||
		/playbook/i.test(ua) ||
		/blackberry/i.test(ua);
	/* Run on load */
	$(function () {
		if (gutterAdsEnabled()) {
			var adFrame = $('#LeftGutterAdContainer iframe');
			if (adFrame.length > 0) {
				var adAnnotation = $('.ad-annotations', adFrame.contents());
				adAnnotation.addClass('left-gutter-ad');
			}
		}
	});

	function getWindowWidth() {
		var winW = 1024;
		if (document.body && document.body.offsetWidth) winW = document.body.offsetWidth; /* ie */
		if (window.innerWidth && window.innerHeight) winW = window.innerWidth; /* other browsers */
		return winW;
	}

	function gutterAdsEnabled() {
		return !$('.nav-container').hasClass('no-gutter-ads');
	}

	function isHeaderFixed() {
		return getWindowWidth() > unfixHeaderThreshold;
	}

	/* Public interface */
	var my = {
		isMobile: isMobile,
		gutterAdsEnabled: gutterAdsEnabled,
		isHeaderFixed: isHeaderFixed,
		getWindowWidth: getWindowWidth,
	};
	return my;
})();
